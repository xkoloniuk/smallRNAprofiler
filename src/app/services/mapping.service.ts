import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {MappedSequenceObject} from "../../interfaces/MappedSequenceObject";

@Injectable({
  providedIn: 'root'
})
export class MappingService {

  private mappingsSubject: BehaviorSubject<MappedSequenceObject[]> = new BehaviorSubject<MappedSequenceObject[]>([]);
  mappings$: Observable<MappedSequenceObject[]> = this.mappingsSubject.asObservable();

  addMappings(mappings: MappedSequenceObject[]): void {
    const currentMappings: MappedSequenceObject[] = this.mappingsSubject.getValue();
    const updatedMappings: MappedSequenceObject[] = [...currentMappings, ...mappings];
    this.mappingsSubject.next(updatedMappings);
  }

}
