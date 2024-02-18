import { Component } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';

import esLocale from '@fullcalendar/core/locales/es';
import frLocale from '@fullcalendar/core/locales/fr';
import { PlanningService } from 'src/app/_services/planning.service';
import { Planning } from 'src/app/_interfaces/planning';
import { TokenService } from 'src/app/_services/token.service';
import { FunctionsService } from 'src/app/_services/functions.service';
import { event } from 'jquery';
import { MeetsService } from 'src/app/_services/meets.service';

@Component({
  selector: 'app-planning',
  templateUrl: './planning.component.html',
  styleUrls: ['./planning.component.css']
})
export class PlanningComponent {
  
  calendarOptions:CalendarOptions = {};
  Events: any[] = [];
  isLoading:boolean = true;

  meetingList:any[]=[];
  planningList:any[]=[];
  
  selectedEvent: any;
  title:string = '';
  start:string = ';'
  end:string = '';
  meetingId:string = ''; 
  date:string = '';
  subject:string = '';

  
  hospitalId = this.tokenService.getHospitalIdFromToken()?.toString();
  doctorId = this.tokenService.getUserIdFromToken();

  planningForm: Planning={
    userId: '',
    date: '',
    hourStart: '',
    hourEnd: ''
  }


  constructor(
    private planningService:PlanningService,
    private tokenService:TokenService,
    private functionsService:FunctionsService,
    private meetsService:MeetsService
    ){}

  getAllPlanning():void{
    this.planningService.getPlanningByDoctorId(this.tokenService.getUserIdFromToken()).subscribe(
      (events: any) => {
        this.planningList = events;
        this.Events = events.map((event: any) => ({ 
                                                    title: "Pas disponible", 
                                                    start: new Date(event.date + "T" + event.hourStart),
                                                    end: new Date(event.date + "T" + event.hourEnd),
                                                    color: "#FF0000",
                                                    extendedProps: {
                                                      doctorId: event.userId,
                                                      meetingId: event._id
                                                    }
                                                  }));
        this.calendarOptions.events = this.Events;
        this.isLoading = false;
      },
      (err: any) => console.log(err.message())
    );
  }

  handleEventClick(arg: any) {
    const doctorId = arg.event.extendedProps.doctorId;
    this.meetingId = arg.event.extendedProps.meetingId;

    this.start = this.functionsService.formatTime(arg.event.start);
    this.end = this.functionsService.formatTime(arg.event.end);
    this.date = this.functionsService.formatDate(arg.event.start);
    this.subject = arg.event.title;

    this.planningForm = {
      userId: doctorId,
      date: this.date,
      hourStart: this.start,
      hourEnd: this.end
    }

    this.selectedEvent = arg.event;
    const modal = document.getElementById('eventModal');
    if (modal) {
      modal.classList.add('show');
      modal.style.display = 'block';
    }
  }

  handleCloseModal() {
    const modal = document.getElementById('eventModal');
    if (modal) {
      modal.classList.remove('show');
      modal.style.display = 'none';
    }
  }

  ngOnInit():void{

    this.getAllPlanning();

    this.getAllMeetingByDoctor();

    this.calendarOptions = {
      eventClick: this.handleEventClick.bind(this),
      plugins: [dayGridPlugin],
      initialView: 'dayGridMonth',
      locale: frLocale,
      headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,dayGridWeek,dayGridDay'
      },
      weekends: true,
      editable: true,
      droppable: true,
      events: this.Events
    };
  }

  getAllMeetingByDoctor():void{
    this.meetsService.getMeetsByDoctorId(this.doctorId).subscribe(
      (events: any) => {
        this.meetingList = events;
        this.isLoading = false;
      },
      (err: any) => console.log(err.message())
    );
  }

  onSubmit():void{
    
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() - 1);
    
    const dateToCompare = new Date(this.planningForm.date.toString());

    this.planningForm.userId = this.tokenService.getUserIdFromToken();

    if (isNaN(dateToCompare.getTime())) {
        alert("La date saisie est invalide.");
    } else if (currentDate > dateToCompare) {
        alert("Choisissez une date supérieure ou égale à la date actuelle!");
    } else if (this.planningForm.hourEnd <= this.planningForm.hourStart) {
        alert("L'heure de fin doit être postérieure à l'heure de début.");
    } else {

      let available = this.functionsService.isAvailable(this.planningList,this.planningForm, this.meetingList);
      
      if(available){
        this.planningService.addPlanning(this.planningForm).subscribe(
          (planning:any)=>{
            this.getAllPlanning();
          },
          (err:any)=>console.log(err.message)
        );
      }
      else
      {
        alert("Non disponible!");
      }

    }

  }

  onUpdate():void{

    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() - 1);
    
    const dateToCompare = new Date(this.planningForm.date.toString());

    this.planningForm.userId = this.tokenService.getUserIdFromToken();

    if (isNaN(dateToCompare.getTime())) {
        alert("La date saisie est invalide.");
    } else if (currentDate > dateToCompare) {
        alert("Choisissez une date supérieure ou égale à la date actuelle!");
    } else if (this.planningForm.hourEnd <= this.planningForm.hourStart) {
        alert("L'heure de fin doit être postérieure à l'heure de début.");
    } else {

      let available = this.functionsService.isAvailable(this.planningList,this.planningForm, this.meetingList);
      
      if(available){
        this.planningService.updatePlanning(this.meetingId,this.planningForm).subscribe(
          (planning:any)=>{
            const modal = document.getElementById("eventModal");
            if(modal){
              this.getAllPlanning();
              modal.style.display ="none";
              //alert("modifié");
            }
          },
          (err:any)=>console.log(err.message())
        );
      }
      else
      {
        alert("Déjà occupé!");
      }

    }

  }

  delete(e:Event):void{
    e.preventDefault();
    //console.log(this.planningForm);
    this.planningService.deletePlanning(this.meetingId).subscribe(
      (planning:any)=>{
        const modal = document.getElementById("eventModal");
        if(modal){
          this.getAllPlanning();
          modal.style.display ="none";
          //alert("supprimé");
        }
      },
      (err:any)=>console.log(err.message())
    );
  }


}
