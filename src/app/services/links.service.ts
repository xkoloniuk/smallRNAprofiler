import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LinksService {

  private showPlotsLinksSubject = new BehaviorSubject<boolean>(false);
  showPlotsLinks$ = this.showPlotsLinksSubject.asObservable();

  constructor() {
  }

  updateData(newData: boolean): void {
    this.showPlotsLinksSubject.next(newData);
  }

}
