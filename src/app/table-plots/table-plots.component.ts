import {Component, OnInit} from '@angular/core';
import {MappedSequenceObject} from "../../interfaces/MappedSequenceObject";
import {MappingService} from "../services/mapping.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-table-plots',
  templateUrl: './table-plots.component.html',
  styleUrls: ['./table-plots.component.scss']
})
export class TablePlotsComponent implements OnInit {

  mappings: MappedSequenceObject[] = [];
  basicData: any;

  basicOptions: any;

  constructor(private mappingService: MappingService, private router: Router) {
  }

  ngOnInit(): void {
    this.mappingService.mappings$.subscribe((mappings) => {
      this.mappings = mappings

      if(!mappings.length) {
        this.router.navigate(['home'])
      }

      this.basicData = {
        labels: mappings.map(mapping => mapping.name + ': ' +  mapping.fileName),
        datasets: [
          {
            label: 'Reads per mapping',
            data: mappings.map(mapping => mapping.mappedReads.length),
            borderWidth: 1
          }
        ]
      };


    })

    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');


    this.basicOptions = {
      indexAxis: 'y',
      plugins: {
        legend: {
          display: false
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            color: textColorSecondary
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false
          }
        },
        x: {
          ticks: {
            color: textColorSecondary
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false
          }
        }
      }
    };
  }


}
