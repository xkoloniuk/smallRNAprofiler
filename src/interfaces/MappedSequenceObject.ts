import {Sequence} from "./Sequence";

export interface MappedSequenceObject extends Sequence {
  fileName: string;
  coverage: {
    redundant: Coverage,
    nonredundant: Coverage
  },
  gaps: boolean,
  countReadsAll: number,
  countReadsUnique: number;
  countReadsForward: number,
  countReadsReverse: number,
  mappedReads: Sequence[],
  ratioFrwRev: number,
  percentageNonredundant: number,
  coverageNonZero: number
}

export interface Coverage {
  position: number[],
  minus: number[],
  plus: number[]
}
