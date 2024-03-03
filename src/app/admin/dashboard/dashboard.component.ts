import { Component, OnInit } from '@angular/core';
import { PatientsService } from 'src/app/_services/patients.service';
import { UserService } from 'src/app/_services/user.service';

import { Chart } from 'chart.js';
import { MeetsService } from 'src/app/_services/meets.service';
import { TokenService } from 'src/app/_services/token.service';
import { PlanningService } from 'src/app/_services/planning.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
    

    nombrePatients:any;
    nombreAssistant:any;
    nombreRv:any;
    nombreIndisponible:any;

    rvList:any;
    indisponibiliteList:any;

    constructor(
        private patientsService:PatientsService,
        private userService:UserService,
        private meetsService:MeetsService,
        private tokenService:TokenService,
        private planningService:PlanningService
    ){}


    ngOnInit(): void {
        this.countAssistants();
        this.countPatients();
        this.countRv();
        this.countPlanning();
        this.meetList();
        this.planningList();
        this.chart1();
        this.chart2();

    }

    countAssistants(): void {

        this.userService.getUsers().subscribe(
            (user: any) => {
                let userTemp = user.data.filter((user:any)=>user.status =='A');
                this.nombreAssistant = userTemp.length;
               // this.sharedService.setterAssistant(user);
            }
        );
    }

    countPatients(): void {
        this.patientsService.getPatients().subscribe(
            (patient: any) => {
                this.nombrePatients = patient.length;
                //console.log(this.nombrePatients)
            }
        );
    }

    countRv(): void {
        const doctorId = this.tokenService.getUserIdFromToken();
        this.meetsService.getMeetsByDoctorId(doctorId).subscribe(
            (meetings: any) => {
                const currentDate = new Date();
                const currentDateString = currentDate.toISOString().slice(0, 10);

                let meets = meetings.filter((meeting:any)=>meeting.date >= currentDateString)
                this.nombreRv = meets.length;
                //console.log(this.nombreRv)
            }
        );
    }

    meetList(): void {
        const doctorId = this.tokenService.getUserIdFromToken();
        this.meetsService.getMeetsByDoctorId(doctorId).subscribe(
            (meetings: any) => {
                const currentDate = new Date();
                const currentDateString = currentDate.toISOString().slice(0, 10);

                let meets = meetings.filter((meeting:any)=>meeting.date >= currentDateString)
                this.rvList = meets;
                //console.log(this.rvList)
            }
        );
    }

    countPlanning():void{
        const doctorId = this.tokenService.getUserIdFromToken();
        this.planningService.getPlanningByDoctorId(doctorId).subscribe(
            (plannings: any) => {
                const currentDate = new Date();
                const currentDateString = currentDate.toISOString().slice(0, 10);

                let planning = plannings.filter((planning:any)=>planning.date >= currentDateString)
                this.nombreIndisponible = planning.length;
                //console.log(this.nombreRv)
            }
        );
    }

    planningList():void{
        const doctorId = this.tokenService.getUserIdFromToken();
        this.planningService.getPlanningByDoctorId(doctorId).subscribe(
            (plannings: any) => {
                const currentDate = new Date();
                const currentDateString = currentDate.toISOString().slice(0, 10);

                let planning = plannings.filter((planning:any)=>planning.date >= currentDateString)
                this.indisponibiliteList = planning;
                console.log(this.indisponibiliteList)
            }
        );
    }

    getDateActuelleFormatted(): string {
        const dateActuelle: Date = new Date();
        return this.formatDate(dateActuelle);
    }

        
    // Fonction pour formater la date
    private formatDate(date: Date): string {
        const day: string = this.addZero(date.getDate());
        const month: string = this.addZero(date.getMonth() + 1);
        const year: number = date.getFullYear();
        return `${year}-${month}-${day}`;
    }

    // Fonction pour ajouter un zéro devant si nécessaire
    private addZero(num: number): string {
        return num < 10 ? '0' + num : '' + num;
    }


    chart1(){
        this.patientsService.getPatients().subscribe(
            (patients: any) => {
                const months: any = {}; 
                const monthNames = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];
            
                patients.forEach((patient: any) => {
                    const createdAt = new Date(patient.createdAt);
                    const month = monthNames[createdAt.getMonth()];
    
                    if (months[month]) {
                        months[month]++;
                    } else {
                        months[month] = 1;
                    }
                });
    
                const occurrencesByMonth = monthNames.map(month => months[month] || 0);
    
                const lineChart:any = new Chart("lineChart", {
                    type: 'line',
                    data: {
                        labels: monthNames,
                        datasets: [{
                            label: 'Nombre de patients par mois',
                            data: occurrencesByMonth,
                            borderColor: 'rgb(0, 123, 255)',
                            borderWidth: 1
                        }]
                    },
                    options: {
                        responsive: true
                    }
                });
    
            }
        );
    }
    
    
    
    chart2(){

        const doctorId = this.tokenService.getUserIdFromToken();
        this.meetsService.getMeetsByDoctorId(doctorId).subscribe(
            (meetings: any) => {
                const months: any = {}; 
                const monthNames = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];
            
                meetings.forEach((meeting: any) => {
                    const createdAt = new Date(meeting.date);
                    const month = monthNames[createdAt.getMonth()];
    
                    if (months[month]) {
                        months[month]++;
                    } else {
                        months[month] = 1;
                    }
                });
                //console.log(months)
                const occurrencesByMonth = monthNames.map(month => months[month] || 0);

                new Chart("bar", {
                    type: 'bar',
                    data: {
                        labels: monthNames,
                        datasets: [{
                            label: 'Nombre de rendez-vous par mois',
                            data: occurrencesByMonth,
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
        );
        

    }

    

}
