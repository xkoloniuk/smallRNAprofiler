import {Component, OnInit} from '@angular/core';
import {LinksService} from "../services/links.service";
import {Router} from "@angular/router";
import {MappingService} from "../services/mapping.service";

@Component({
  selector: 'app-status-header',
  templateUrl: './status-header.component.html',
  styleUrls: ['./status-header.component.scss']
})
export class StatusHeaderComponent implements OnInit {
  public showPlotsLink?: boolean;
  public currentPath = this.router.url

  constructor(private linksService: LinksService, private router: Router, private mappingService: MappingService) {
  }

  ngOnInit() {
    this.linksService.showPlotsLinks$.subscribe(data => {
      this.showPlotsLink = data
    });
    console.log(this.currentPath)
  }

  routeToHome() {
    this.router.navigate(['home'])
  }

  resetStore() {
    this.mappingService.resetMappings()
    this.router.navigate(['home'])
  }
}
