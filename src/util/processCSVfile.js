const processFastaMappingFile = function (file, name) {
    const arrayOfFastaEntries = splitMultiFasta(file, name);
    return arrayOfFastaEntries
};
export function getGenomeCoverage(genomeLength, detailCoverageData) {
    let zeroCount = 0;
    console.log(detailCoverageData.plus)
    detailCoverageData.minus.forEach(i => {
        if (detailCoverageData.minus[i] === 0 && detailCoverageData.plus[i] === 0) {
            zeroCount++
        }
    })
    return zeroCount === 0 ? 0 : (1 - (zeroCount / genomeLength)) * 100
}

export function calcCoverage(unit, target) {
    const readArrayedPosition = Array.from({length: unit.seqLength}).fill(0).map((_, i) => 1 + i + unit.start)


    if (unit.reverse) {
        if (unit.unique) {
            readArrayedPosition.map(pos => {
                target.redundant.plus[pos]++
                target.nonredundant.plus[pos]++
            })
        } else {
            readArrayedPosition.map(pos => target.redundant.plus[pos]++)
        }
    } else {
        if (unit.unique) {
            readArrayedPosition.map(pos => {
                target.redundant.minus[pos]--
                target.nonredundant.minus[pos]--
            })
        } else {
            readArrayedPosition.map(pos => target.redundant.minus[pos]--)
        }
    }
}

function splitMultiFasta(target, name) {
    const fastaArray = target.split(">");
    const reads = []
    let ref = {}
    const regexGaps = /^-*/
    const dnaSeq = /[ATCG]{18,32}/
    const dtsetPattern = /\d[A-Z]_\d|S\d{1,3}_L\d{3}/
    const virusPattern = /SMoV|StrV1|SCV/
    const variantPattern = /(RNA\d)?[ABC](?=.fasta)/
    const dataset = name.match(dtsetPattern)[0]
    const virus = name.match(virusPattern)[0]
    const variant = name.match(variantPattern)[0]
    const uniqueSet = new Set

    fastaArray.forEach((fasta, i) => {
            if (!fasta) return


            const tmpSplit = fasta.split('\n')
            const tmpFirstLine = tmpSplit[0];
            const tmpSecondLine = tmpSplit[1];
            const tmpSeq = i === 1 ? tmpSecondLine : tmpSecondLine.match(dnaSeq)[0];
            const gapsBeforeSeq = tmpSecondLine.match(regexGaps)[0];
// [0] value is empty due to split function
            if (i === 1) {
                const zeroesArray = Array.from({length: tmpSeq.length}).fill(0)

                const positions = zeroesArray.map((_, i) => 1 + i)


                ref = {
                    seqName: tmpFirstLine,
                    seq: tmpSeq,
                    seqLength: tmpSeq.length,
                    coverage: {
                        countRev: 0,
                        countFrw: 0,
                        position: positions.slice(),
                        genome:
                            {
                                strainSpecific: '',
                                strainNonSpecific: ''
                            },
                        strainSpecific: {
                            genomeCov:'',
                            redundant: {
                                minus: zeroesArray.slice(),
                                plus: zeroesArray.slice(),
                                position: positions.slice()
                            },
                            nonredundant: {
                                minus: zeroesArray.slice(),
                                plus: zeroesArray.slice(),
                                position: positions.slice()
                            },
                            genome: {
                                overall: '',
                            }
                        },
                        strainNonSpecific: {
                            genomeCov:'',
                            redundant: {
                                minus: zeroesArray.slice(),
                                plus: zeroesArray.slice(),
                                position: positions.slice()
                            },
                            nonredundant: {
                                minus: zeroesArray.slice(),
                                plus: zeroesArray.slice(),
                                position: positions.slice()
                            },
                            genome: {
                                overall: '',
                            }
                        },


                    },
                }
                return
            }

            const unit = {
                seqName: tmpFirstLine,
                unique: uniqueSet.has(tmpSeq) ? false : !!uniqueSet.add(tmpSeq),
                seq: tmpSeq,
                seqLength: tmpSeq.length,
                start: gapsBeforeSeq?.length || 0,
                end: gapsBeforeSeq?.length || 0 ? tmpSeq.length : tmpSeq.length + gapsBeforeSeq?.length,
                reverse: tmpFirstLine.endsWith('reversed)'),
            }




            calcCoverage(unit, ref.coverage.strainNonSpecific)

            reads.push(unit)

        }
    )


    const countReverseReads = reads.filter(read => read.reverse).length
    // const frRvRatio = countReverseReads
    const frRvRatio = ((reads.length - countReverseReads) / countReverseReads).toFixed(1)

    const uniques = new Set(reads.flatMap(({seq}) => seq))
    const uniqueReads = [...uniques]
    const uniquesCount = uniques.size
    const totalCount = reads.length
    const nonRedundantPerc = (100 * uniquesCount / totalCount).toFixed(1);




// calculate unique reads as it is irrelevant if we use redundant or nonredundant data, coverage remains the same
    ref.coverage.strainNonSpecific.genomeCov = getGenomeCoverage(ref.seqLength, ref.coverage.strainNonSpecific.nonredundant)


// file name is attached to the dataset in IndexView in function 'showFiles'
    return {dataset, virus, variant, ref, reads, uniqueReads, frRvRatio, totalCount, nonRedundantPerc}

}

export default processFastaMappingFile;
