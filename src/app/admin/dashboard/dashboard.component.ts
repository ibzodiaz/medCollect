import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
    
  constructor(){}

  ngOnInit(){
    new Chart("lineChart", {
        type: 'line',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            datasets: [{
                label: 'Patients',
                data: [2050, 1900, 2100, 2800, 1800, 2000, 2500, 2600, 2450, 1950, 2300, 2900],
                borderColor: 'rgb(0, 123, 255)', //(41, 155, 99)

                borderWidth: 1
            }]
        },
        options: {
            responsive: true
        }
    });


    new Chart("bar", {
        type: 'horizontalBar',
        data: {
            labels: ['ATCD positif', 'ATCD négatif', 'HTA-Gravidique positif', 'HTA-Gravidique négatif'],
            datasets: [{
                label: 'Signes cliniques et paracliniques des patients',
                data: [42, 12, 8, 6],
                backgroundColor: [
                    'rgba(173, 216, 230, 1)',  // Light Blue
                    'rgba(240, 128, 128, 1)',  // Light Coral
                    'rgba(144, 238, 144, 1)',  // Light Green
                    'rgba(255, 182, 193, 1)'   // Light Pink
                ],
                borderColor: [
                    'rgba(173, 216, 230, 1)',
                    'rgba(240, 128, 128, 1)',
                    'rgba(144, 238, 144, 1)',
                    'rgba(255, 182, 193, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                xAxes: [{
                    stacked: true
                }],
                yAxes: [{
                    stacked: true
                }]
            }
        }
    });
    
    
    
  }

  

}
