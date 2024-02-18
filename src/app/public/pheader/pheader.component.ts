import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-pheader',
  templateUrl: './pheader.component.html',
  styleUrls: ['./pheader.component.css']
})
export class PheaderComponent implements OnInit {
  currentTimeFRLocale!: string;

  ngOnInit(): void {
    moment.locale('fr');
    this.currentTimeFRLocale = moment().format('LLL');
  }

}
