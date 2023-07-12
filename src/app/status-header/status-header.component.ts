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
  public mappingsCount: number = 0;
  public mappingsCountText?: string;

  constructor(private linksService: LinksService, private router: Router, private mappingService: MappingService) {
  }

  ngOnInit() {
    this.linksService.showPlotsLinks$.subscribe(data => {
      this.showPlotsLink = data
    });

    this.mappingService.mappings$.subscribe((mappings) => {
      const mappingCount = mappings.length
      const mappingsCountText = 'Reset ' + mappingCount +  ' mapping'

      this.mappingsCount = mappingCount
      this.mappingsCountText = mappingCount === 1 ? mappingsCountText : mappingsCountText + 's'
    })
  }

  resetStore() {
    this.mappingService.resetMappings()
    this.router.navigate(['home'])
  }
}
