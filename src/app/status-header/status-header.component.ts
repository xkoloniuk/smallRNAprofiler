import {Component, OnInit} from '@angular/core';
import {LinksService} from "../services/links.service";

@Component({
  selector: 'app-status-header',
  templateUrl: './status-header.component.html',
  styleUrls: ['./status-header.component.scss']
})
export class StatusHeaderComponent implements OnInit {
  public showPlotsLink?: boolean;

  constructor(private linksService: LinksService) {
  }

  ngOnInit() {
    this.linksService.showPlotsLinks$.subscribe(data => {
      this.showPlotsLink = data
    });
  }


}
