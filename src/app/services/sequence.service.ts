import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SequenceService {

  public reverseSeq(seq: string): string {
    return seq.split('').reverse().join('')
  }

  public complementSeq(seq: string): string {
    let c: string[] = [];
    seq.toUpperCase()

    seq.split('').forEach((b, i) => {
      switch (b) {
        case 'A':
          c[i] = 'T';
          break;
        case 'T':
          c[i] = 'A';
          break;
        case 'G':
          c[i] = 'C';
          break;
        case 'C':
          c[i] = 'G';
          break;
        case 'U':
          c[i] = 'A';
          break;
        default:
          c[i] = '*'

      }
    })
    return c.join('')
  }

  public reverseComplement (seq: string):string {
    return this.complementSeq(this.reverseSeq(seq))
  }

}
