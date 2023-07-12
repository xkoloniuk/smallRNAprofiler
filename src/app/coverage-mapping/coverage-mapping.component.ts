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
  basicOptionsforSizeDistribution: any;

  constructor(private mappingService: MappingService) {
  }

  ngOnInit(): void {
    this.mappingService.mappings$.subscribe((mappings) => {
      this.mappings = mappings

      mappings.forEach(mapping => {

        const objectForPlot = {
          name: mapping.name,
          fileName: mapping.fileName,
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

        if (this.datasets.some(dataset => dataset.name === objectForPlot.name && dataset.fileName === objectForPlot.fileName)) {
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
            color: textColor,
            font: {
              size: 18,
              lineHeight: 1.8,
            },
          }
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            color: textColorSecondary,
            font: {
              size: 18,
              lineHeight: 1.8,
            },
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false
          }
        },
        x: {
          ticks: {
            // color: textColorSecondary
            callback: (val: number) => {
              return (val % 500 === 0) ? val : null
            },
            font: {
              size: 16,
              lineHeight: 1.2,
            },
          },
          grid: {
            color: surfaceBorder,
            // drawBorder: false,
            drawOnChartArea: true,
            drawTicks: true
          }
        }
      }
    };

    this.basicOptionsforSizeDistribution = {
      plugins: {
        legend: {
          color: textColor,
          font: {
            size: 18,
            lineHeight: 1.8,
          },
          // display: false
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            color: textColorSecondary,
            font: {
              size: 16,
              lineHeight: 1.2,
            },
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false
          }
        },
        x: {
          ticks: {
            color: textColorSecondary,
            font: {
              size: 16,
              lineHeight: 1.2,
            },
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
