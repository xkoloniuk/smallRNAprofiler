const processFastaReads = function (file, name) {
  const arrayOfFastaEntries = splitMultiFasta(file, name);
  return arrayOfFastaEntries
};

function splitMultiFasta(target, name) {
  const fastaArray = target.split(">");
  const reads = []
  // let ref = {}
  // const regex = /^-*/
  // const dnaSeq = /[ATCG]{18,32}/

  const dataset = name


  fastaArray.forEach((fasta) => {
      if (!fasta) return
      const tmpSplit = fasta.split('\n')
      const tmpFirstLine = tmpSplit[0];
      const tmpSecondLine = tmpSplit[1];


      const unit = {
        seqName: tmpFirstLine,
        seq: tmpSecondLine,
        seqLength: tmpSecondLine.length,
      }
      reads.push(unit)
    }
  )


  const uniques = new Set(reads.flatMap(({seq}) => seq))
  const uniquesCount = uniques.size
  const totalCount = reads.length
  const nonRedundantPerc = (100 * uniquesCount / totalCount).toFixed(1);
  // file name is attached to the dataset in ReadsDatasetView in function 'showFiles'
  return {dataset, reads, totalCount, nonRedundantPerc}

}

export default processFastaReads;
