import {Injectable} from "@angular/core";
import {Direction, Sequence, SequenceType} from "../../interfaces/Sequence";
import {Coverage, MappedSequenceObject} from "../../interfaces/MappedSequenceObject";
import {SequenceService} from "./sequence.service";

@Injectable({
  providedIn: 'root'
})


export class FastaMappingToCoverageDetailService {

  constructor(private sequence: SequenceService) {
  }

// it obtains refSeqLenth and coverage object {positions[], minus[], plus[]}
// in forEach loops through all three of them and
// calculates zero coverage if for current position:
// if both plus and minus coverage are zero then it counts as zero for the position
//   all zeroes are summed

  // splits obtain text stream into array strings like ['RefSeqName\nAGCTCGTCTGTGCT----\n', 'ReadName\n-----------AGTCTCGTCTCGGCTTCGCT------..--',..]
  public splitMultiFasta(input: string[], fileName: string) {
    // const nameSequenceConcatenation = split(">");
    const reads: Sequence[] = [];
    const dnaSeq = /[ATCG][ATCG-]{17,31}[ATCG]/
    const regexFivePrimeGaps = /^-*/
    const uniqueSet = new Set

    //  here the reference object is instantiated
    const mappedSequenceObject: MappedSequenceObject = {
      containsGaps: false,
      name: '',
      fileName: '',
      sequence: '',
      type: SequenceType.REFERENCE,
      length: 0,
      countReadsAll: 0,
      countReadsUnique: 0,
      countReadsForward: 0,
      countReadsReverse: 0,
      ratioFrwRev: 0,
      percentageNonredundant: 0,
      coverageNonZero: 0,
      mappedReads: [],
      coverage: {
        redundant: {
          minus: [],
          plus: [],
          position: []
        },
        nonredundant: {
          minus: [],
          plus: [],
          position: []
        },
      }
    }


    input.forEach((nameSeqString: string, i: number) => {
        //   [0] value is empty due to split function
        if (i === 0) return


        const tmpSplit = nameSeqString.split('\n')

        //windows retain \r, so it should be removed
        const fastaName = tmpSplit[0].replace('\r', '');
        const fastaSeqLine = tmpSplit[1];


        // this should be the reference
        if (i === 1) {
          const referenceSequence = fastaSeqLine

          if (!referenceSequence.length) return
          // @ts-ignore
          const zeroesArray: number[] = Array.from({length: referenceSequence.length}).fill(0)
          const positions = zeroesArray.map((_, i) => 1 + i)

          mappedSequenceObject.fileName = fileName;
          mappedSequenceObject.name = fastaName;
          mappedSequenceObject.sequence = referenceSequence;
          mappedSequenceObject.length = referenceSequence.length;
          mappedSequenceObject.coverage.redundant = {
            minus: zeroesArray.slice(),
            plus: zeroesArray.slice(),
            position: positions.slice()
          };
          mappedSequenceObject.coverage.nonredundant = {
            minus: zeroesArray.slice(),
            plus: zeroesArray.slice(),
            position: positions.slice()
          }
          return
        }

        const fastaTrimmedReadSequenceWithPotentialGaps = fastaSeqLine.match(dnaSeq)?.[0].toUpperCase() ?? '';
        const gapsInRead = fastaTrimmedReadSequenceWithPotentialGaps.includes('-');
        const fastaTrimmedReadSequenceWithoutGaps = fastaTrimmedReadSequenceWithPotentialGaps.replace(/-/g, '')
        const gapsBeforeSeq = fastaSeqLine.match(regexFivePrimeGaps)?.[0] ?? '';


        const read: Sequence = {
          name: fastaName,
          type: SequenceType.READ,
          sequence: fastaName.endsWith('reversed)') ? this.sequence.reverseComplement(fastaTrimmedReadSequenceWithoutGaps) : fastaTrimmedReadSequenceWithoutGaps,
          redundant: uniqueSet.has(fastaTrimmedReadSequenceWithoutGaps) ? !!uniqueSet.add(fastaTrimmedReadSequenceWithoutGaps) : false,
          containsGaps: gapsInRead,
          length: fastaTrimmedReadSequenceWithoutGaps.length,
          mapStart: gapsBeforeSeq?.length || 0,
          orientation: fastaName.endsWith('reversed)') ? Direction.REVERSE : Direction.FORWARD,
        }

        this.calcCoverage(read, mappedSequenceObject.coverage)
        mappedSequenceObject.mappedReads.push(read)

      }
    )
    const uniques = new Set(mappedSequenceObject.mappedReads.flatMap(({sequence}) => sequence))
    mappedSequenceObject.countReadsReverse = mappedSequenceObject.mappedReads.filter(read => read.orientation === Direction.REVERSE).length;
    mappedSequenceObject.countReadsForward = mappedSequenceObject.mappedReads.filter(read => read.orientation === Direction.FORWARD).length;
    mappedSequenceObject.ratioFrwRev = Number((mappedSequenceObject.countReadsForward / mappedSequenceObject.countReadsReverse).toFixed(1));
    mappedSequenceObject.countReadsAll = mappedSequenceObject.mappedReads.length;
    mappedSequenceObject.countReadsUnique = uniques.size;
    mappedSequenceObject.percentageNonredundant = Number((100 * mappedSequenceObject.countReadsUnique / mappedSequenceObject.countReadsAll).toFixed(1));

// calculate unique reads as it is irrelevant if we use redundant or nonredundant data, coverage remains the same
    mappedSequenceObject.coverageNonZero = this.getGenomeCoverage(mappedSequenceObject.length, mappedSequenceObject.coverage.nonredundant)

// file name is attached to the dataset in function 'showFiles'
    return mappedSequenceObject
  }


// as target-- object file with calculated genome coverage, prepared nonredundant and redundant coverage arrays (like:
// redundant: {position array [1....Ref length], positive array [zeroes], negative array[zeroes]})
// as unit-- a read with name, which contains reverse if applicable, seq, uniqueness, seqLength, mapping start

// for each read, array is created that takes the unit mapping start position as the first value and add 1 to each next position

// returns number
  private getGenomeCoverage(genomeLength: number, detailCoverageData: any): number {
    let zeroCount = 0;
    detailCoverageData.minus.forEach((_: number, i: number) => {
      if (detailCoverageData.minus[i] === 0 && detailCoverageData.plus[i] === 0) {
        zeroCount++
      }
    })
    return zeroCount === 0 ? 0 : Number(((1 - (zeroCount / genomeLength)) * 100).toFixed(2))
  }

//in this way there is array of read positions on reference, i.e. [100, 101, 102, ..., 121]
  private calcCoverage(read: Sequence, coverage: { redundant: Coverage; nonredundant: Coverage }) {
    if (read.type === SequenceType.REFERENCE || !read.mapStart) return

    const firstMappedPositionOnReference = read.mapStart || 0;
    const arrayOfReadMappedPositions = Array.from({length: read.length}).fill(0).map((_, i) => 1 + i + firstMappedPositionOnReference)

    if (read.orientation === Direction.REVERSE) {

      if (!read.redundant) {
        arrayOfReadMappedPositions.map(pos => {
          coverage.redundant.plus[pos]++
          coverage.nonredundant.plus[pos]++
        })
      } else {
        arrayOfReadMappedPositions.map(pos => coverage.redundant.plus[pos]++)
      }
    } else {
      if (!read.redundant) {
        arrayOfReadMappedPositions.map(pos => {
          coverage.redundant.minus[pos]--
          coverage.nonredundant.minus[pos]--
        })
      } else {
        arrayOfReadMappedPositions.map(pos => coverage.redundant.minus[pos]--)
      }
    }
  }
}
