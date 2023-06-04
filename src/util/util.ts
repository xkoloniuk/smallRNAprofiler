class MappedRead {
  seqName: string;
  seq: string;
  start: number;
  end: number;
  length: number;
  orientation: string;

  constructor(seqName: string, seq: string, start: number, end: number) {
    this.seqName = seqName;
    this.seq = seq;
    this.start = start;
    this.end = end;
    this.length = seq.length;
    this.orientation = seqName.endsWith('reversed') ? 'reverse' : 'forward';
  }
}

interface RefSequence {
  refName: string,
  refSeq: string,
  refLength: number
}

interface DestructuredMapping {
  reference: RefSequence,
  reads: MappedRead[],
  totalCount: number,
  nonRedundantReads: Set<string>,
  nonRedundantCount: number,
  nonRedundantPerc: number


}

function processNameSeqData(input: any) {
  const reads: MappedRead[] = [];
  let ref: any = {};
  let output: DestructuredMapping;
  const regex = /^-*/;
  const smallRNAread = /[ATCGU]{18,32}/;
  const DNARNAsequenceWithGaps = /[ATCGU-]+/;


  input.forEach((fasta: any, i: number) => {
      if (!fasta || !i) return
      const nameSeqLine = fasta.split('\n')
      // if (i < 10) {
      //   // console.log(i + ' : ' + nameSeqLine)
      //   // console.dir(nameSeqLine)
      //
      // }

      if (i === 1) {
        console.log(nameSeqLine)
        const refName: string = nameSeqLine[0]
        const refSeq: string = nameSeqLine[1].match(DNARNAsequenceWithGaps)[0]
        const refLength: number = refSeq.length

        Object.assign(ref, {refName, refSeq, refLength})
        return
      }


      const seqName: string = nameSeqLine[0]
      const seq: string = nameSeqLine[1].match(smallRNAread)[0]
      const start: number = nameSeqLine[1].match(regex)[0]?.length || 0
      const end: number = nameSeqLine[1].match(regex)[0]?.length || 0 ? nameSeqLine[1].match(smallRNAread)[0].length : nameSeqLine[1].match(smallRNAread)[0].length + nameSeqLine[1].match(regex)[0]?.length

      reads.push(new MappedRead(seqName, seq, start, end))
    }
  )
  const uniqueReads = new Set(reads.flatMap(({seq}) => seq));
  const uniquesCount = uniqueReads.size;
  const totalCount = reads.length;
  const nonRedundantPerc = +(100 * uniquesCount / totalCount).toFixed(1);


  output = {
    reference: ref,
    reads: reads,
    nonRedundantReads: uniqueReads,
    nonRedundantCount: uniquesCount,
    totalCount: totalCount,
    nonRedundantPerc: nonRedundantPerc
  }

  console.dir(output)
  return output

}

export default processNameSeqData;
