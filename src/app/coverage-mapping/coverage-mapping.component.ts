import {Component, OnInit} from '@angular/core';
import {MappedSequenceObject} from "../../interfaces/MappedSequenceObject";
import {MappingService} from "../services/mapping.service";

@Component({
  selector: 'app-coverage-mapping',
  templateUrl: './coverage-mapping.component.html',
  styleUrls: ['./coverage-mapping.component.scss']
})
export class CoverageMappingComponent implements OnInit {
  mappings: MappedSequenceObject[] = [];
  basicData: any;
  datasets: any[] = [];
  sizeDistributionDatasets: any[] = [];

  basicOptions: any;
  basicOptionsWoLabel: any;

  constructor(private mappingService: MappingService) {
  }

  ngOnInit(): void {
    this.mappingService.mappings$.subscribe((mappings) => {
      this.mappings = mappings

      mappings.forEach(mapping => {

        const objectForPlot = {
          name: mapping.name,
          dataCoverage: {
            labels: mapping.coverage.redundant.position,
            datasets: [
              {
                label: 'Negative strand',
                data: mapping.coverage.redundant.minus,
                backgroundColor: [
                  'rgb(0,0,0)',
                ],
              },
              {
                label: 'Positive strand',
                data: mapping.coverage.redundant.plus,
                backgroundColor: [
                  'rgb(255,0,0)',
                ],
              },
            ]
          },
          dataSize: {
            labels: [18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30],
            datasets: [
              {
                label: `Size distribution for ${mapping.countReadsAll} reads`,
                data: Object.values(this.binByLength(mapping.mappedReads.map(read => read.sequence))),
                backgroundColor: [
                  'rgb(64,64,64)',
                ],
              },
            ]
          }
        };

        if (this.datasets.some(dataset => dataset.name === objectForPlot.name)) {
          return
        }
        this.datasets.push(objectForPlot)

      })

      this.basicData = {
        labels: mappings.map(mapping => mapping.name),
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
      plugins: {
        legend: {
          labels: {
            color: textColor
          }
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

    this.basicOptionsWoLabel = {
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

  private binByLength(data: string[]) {
    const lengthCounts = data.reduce((acc, cur) => {
      // @ts-ignore
      return acc[cur.length] ? ++acc[cur.length] : acc[cur.length] = 1, acc
    }, {})
    return lengthCounts
  }

}
