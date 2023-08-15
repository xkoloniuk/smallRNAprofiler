export interface Sequence {
  name: string,
  sequence: string,
  orientation?: Direction,
  length: number,
  redundant?: boolean,
  containsGaps: boolean,
  mapStart?: number,
  type: SequenceType
}

export enum Direction {
  FORWARD,
  REVERSE
}

export enum SequenceType {
  REFERENCE,
  READ
}
