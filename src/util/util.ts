const processCsvFile = function (file) {
    const arrayOrRows = splitCsvFileByLines(file);
    return arrayOrRows
  };
  
  
  class MappedRead {
        seqName: string;
        seq: string;
        start: number;
        end: number;
        length: number;
        orientation: string;
  
        constructor (seqName: string, seq: string, start: number, end: number) {
          this.seqName = seqName;
          this.seq = seq;
          this.start = start;
          this.end = end;
          this.length = seq.length;
          this.orientation = seqName.endsWith('reversed') ? 'reverse' : 'forward';
        }
  }
  
  function splitCsvFileByLines(target) {
    const fastaArray = target.split(">");
    const reads = []
    const ref = []
    const regex = /^-*/
    const dnaSeq = /[ATCG]{18,32}/
    fastaArray.forEach((fasta, i) => {
      if (!fasta) return
      const tmpSplit = fasta.split('\n')
  
  
      const unit = new MappedRead(
        tmpSplit[0],
        tmpSplit[1].match(dnaSeq)[0],
        tmpSplit[1].match(regex)[0]?.length || 0,
        tmpSplit[1].match(regex)[0]?.length || 0 ? tmpSplit[1].match(dnaSeq)[0].length : tmpSplit[1].match(dnaSeq)[0].length + tmpSplit[1].match(regex)[0]?.length
      )
      if(i === 1) {
        ref.push(unit)
      } else { reads.push(unit) }
    }
    )
    return {ref, reads}
  
  }
  
  export default processCsvFile;
  