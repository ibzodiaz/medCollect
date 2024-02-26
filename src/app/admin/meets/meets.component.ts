import { Component, EventEmitter, Output } from '@angular/core';

import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';

import esLocale from '@fullcalendar/core/locales/es';
import frLocale from '@fullcalendar/core/locales/fr';
import { MeetsService } from 'src/app/_services/meets.service';
import { PatientsService } from 'src/app/_services/patients.service';
import { UserService } from 'src/app/_services/user.service';
import { Meets } from 'src/app/_interfaces/meets';
import { PlanningService } from 'src/app/_services/planning.service';
import { TokenService } from 'src/app/_services/token.service';
import { FunctionsService } from 'src/app/_services/functions.service';


@Component({
  selector: 'app-meets',
  templateUrl: './meets.component.html',
  styleUrls: ['./meets.component.css']
})
export class MeetsComponent {

  locales = [esLocale, frLocale];
  calendarOptions: CalendarOptions = {};

  Events: any[] = [];
  patientsList:any=[];
  usersList: any=[];

  planningList: any[] = []
  busyDays: any[] = [];

  isLoading: boolean = true;

  selectedEvent: any;

  patientId:string='';
  prenomPatient:string='';
  nomPatient:string='';
  
  date:string = '';
  start:string = '';
  end:string = '';
  subject:string = '';

  userId:string='';
  prenomDoctor:string='';
  nomDoctor:string='';

  meetingId:string = ''; 

  hospitalId = this.tokenService.getHospitalIdFromToken()?.toString();

  dateInput:any;

  meetingForm:Meets={
    userId:'',
    patientId:'',
    hospitalId: '',
    date:'',
    hourStart: '',
    hourEnd: '',
    subject:''
  }

  constructor(
    private meetsService: MeetsService,
    private patientsService:PatientsService,
    private userService:UserService,
    private planningService:PlanningService,
    private tokenService:TokenService,
    private functionsService:FunctionsService
  ) {}


  ngOnInit(): void {

    this.dateInput = document.getElementById('meeting') as HTMLInputElement;
    const dateToMark = new Date('2024-02-17');

    this.dateInput.addEventListener('change', (event:any) => {
      if (event && event.target) { 
        const selectedDate = new Date(event.target.value); 
        const currentDate = new Date();
        currentDate.setDate(currentDate.getDate() - 1);

        if (selectedDate <= currentDate) {
          this.dateInput.style.color = 'red';
        } else if (selectedDate.getTime() === dateToMark.getTime()) {
          this.dateInput.style.color = 'red';
        } else {
          this.dateInput.style.color = 'green';
        }
      }
    });


    this.getAllPatient();
    this.getAllDoctorsFromEachHospital();

    this.getAllMeetingByHospital();

    // Initialisation des options du calendrier
    this.calendarOptions = {
      themeSystem: 'bootstrap',
      eventClick: this.handleEventClick.bind(this),
      plugins: [dayGridPlugin],
      initialView: 'dayGridMonth',
      locale: frLocale,
      headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,dayGridWeek,dayGridDay'
      },
      editable: true,
      selectable: true,
      weekends: true,
      events: this.Events
    };

  }

  getDoctorPlanning(doctorId:string):void{
    this.planningService.getPlanningByDoctorId(doctorId).subscribe(
      (plannings: any) => {
        this.planningList = plannings.map((planning:any)=>(
                                                            {
                                                            date:planning.date,
                                                            hourStart:planning.hourStart,
                                                            hourEnd:planning.hourEnd
                                                          }));
        
      },
      (err: any) => console.log(err.message())
  );
  }

  getAllPatient():void{
    this.patientsService.getPatients().subscribe(
      (patients:any)=>{
        this.patientsList = patients;
      },
      (err:any)=> console.log(err.message())
    );
  }


  getAllDoctorsFromEachHospital():void{
    this.userService.getUserByHospital(this.hospitalId).subscribe(
      (users: any) => {
   
          this.usersList = users.data.filter((user:any)=>user.status !== 'A')
          //console.log(this.usersList)
        
      },
      err => console.error(err)
    );
  }

  getAllMeetingByHospital():void{
    this.meetsService.getMeetsByHospitalId(this.hospitalId).subscribe(
      (events: any) => {
        this.Events = events.map((event: any) => ({ 
                                                    title: event.subject, 
                                                    start: new Date(event.date + "T" + event.hourStart),
                                                    end: new Date(event.date + "T" + event.hourEnd),
                                                    color: this.functionsService.getRandomColor(), 
                                                    extendedProps: {
                                                      patientId: event.patientId,
                                                      userId: event.userId,
                                                      meetingId: event._id
                                                    }
                                                  }));
        this.calendarOptions.events = this.Events;
        this.isLoading = false;
      },
      (err: any) => console.log(err.message())
    );
  }


  getCurrentAccountMeeting():void{
    
    let activeId = this.tokenService.getUserIdFromToken();

    this.meetsService.getMeetsByDoctorId(activeId).subscribe(
      (events: any) => {
        this.Events = events.map((event: any) => ({ 
                                                    title: event.subject, 
                                                    start: new Date(event.date + "T" + event.hourStart),
                                                    end: new Date(event.date + "T" + event.hourEnd),
                                                    color: this.functionsService.getRandomColor(), 
                                                    extendedProps: {
                                                      patientId: event.patientId,
                                                      userId: event.userId,
                                                      meetingId: event._id
                                                    }
                                                  }));
        this.busyDays = events.map((busy:any)=>(
                                                  {
                                                  date:busy.date,
                                                  hourStart:busy.hourStart,
                                                  hourEnd:busy.hourEnd
                                                }));

        this.calendarOptions.events = this.Events;
        this.isLoading = false;
      },
      (err: any) => console.log(err.message())
    );
  }

  getMeetingByDoctor(doctorId:any):void{
    this.meetsService.getMeetsByDoctorId(doctorId).subscribe(
      (events: any) => {
        this.Events = events.map((event: any) => ({ 
                                                    title: event.subject, 
                                                    start: new Date(event.date + "T" + event.hourStart),
                                                    end: new Date(event.date + "T" + event.hourEnd),
                                                    color: this.functionsService.getRandomColor(), 
                                                    extendedProps: {
                                                      patientId: event.patientId,
                                                      userId: event.userId,
                                                      meetingId: event._id
                                                    }
                                                  }));
        this.busyDays = events.map((busy:any)=>(
                                                  {
                                                  date:busy.date,
                                                  hourStart:busy.hourStart,
                                                  hourEnd:busy.hourEnd
                                                }));

        this.userService.getUserById(doctorId).subscribe(
          (doctor:any)=>{
            this.prenomDoctor = doctor.data.prenom;
            this.nomDoctor = doctor.data.nom;
            this.userId = doctor.data._id;
          },
          (err:any)=>console.log(err.message)
        );

        this.calendarOptions.events = this.Events;
        this.isLoading = false;
        
      },
      (err: any) => console.log(err.message())
    );
  }

  handleCloseModal() {
    const modal = document.getElementById('eventModal');
    if (modal) {
      modal.classList.remove('show');
      modal.style.display = 'none';
    }
  }


  handleEventClick(arg: any) {
    const patientId = arg.event.extendedProps.patientId;
    const doctorId = arg.event.extendedProps.userId;
    this.meetingId = arg.event.extendedProps.meetingId;

    this.start = this.functionsService.formatTime(arg.event.start);
    this.end = this.functionsService.formatTime(arg.event.end);
    this.date = this.functionsService.formatDate(arg.event.start);
    this.subject = arg.event.title;

    this.selectedEvent = arg.event;
    const modal = document.getElementById('eventModal');
    if (modal) {
      modal.classList.add('show');
      modal.style.display = 'block';
    }

    
    this.patientsService.getPatientById(patientId).subscribe(
      (patient:any)=>{
        this.prenomPatient = patient.prenom;
        this.nomPatient = patient.nom;
        this.patientId = patient._id;
      },
      (err:any)=>console.log(err.message)
    ); 
    
    this.userService.getUserById(doctorId).subscribe(
      (doctor:any)=>{
        this.prenomDoctor = doctor.data.prenom;
        this.nomDoctor = doctor.data.nom;
        this.userId = doctor.data._id;
      },
      (err:any)=>console.log(err.message)
    );

    if (typeof doctorId === 'object' && doctorId !== null) {
      this.meetingForm={
        patientId:patientId,
        userId:doctorId._id,
        hospitalId: this.hospitalId,
        date:this.date,
        hourStart: this.start,
        hourEnd: this.end,
        subject: this.subject
      }
  
    }else{
      this.meetingForm={
        patientId:patientId,
        userId:doctorId,
        hospitalId: this.hospitalId,
        date:this.date,
        hourStart: this.start,
        hourEnd: this.end,
        subject: this.subject
      }
  
    }

    this.getDoctorPlanning(this.meetingForm.userId);
    this.getMeetingByDoctor(this.meetingForm.userId);

 
    //alert(JSON.stringify(this.meetingForm))

  }

  addMeeting(form:Meets):void {
    this.meetsService.addMeet(form).subscribe(
      (meeting: any) => {
          this.isLoading = true;
          this.getAllMeetingByHospital();
      },
      (err: any) => console.log(err.message)
    );
  }


  deleteMeet(e:Event){
    e.preventDefault();
    this.meetsService.deleteMeetById(this.meetingId).subscribe(
      (meets:any)=>{
      
        const modal = document.getElementById("eventModal");
        if(modal){
          this.getAllMeetingByHospital();
          modal.style.display ="none";
          //alert("supprimé");
        }
       
      },
      (err:any)=>console.log(err.message)
    );
  }

  updateMeet(meetingId:string,meetingForm:Meets):void{
       
    this.meetsService.updateMeetById(meetingId,meetingForm).subscribe(
      (meets:any)=>{
        
        console.log(meets);

        const modal = document.getElementById("eventModal");
        if(modal){
          this.getAllMeetingByHospital();
          modal.style.display ="none";
          alert("modifié");
        }
      },
      (err:any)=>console.log(err.message())
    );
  }


  onUpdate():void{

    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() - 1);

    const dateToCompare = new Date(this.meetingForm.date);

    if (isNaN(dateToCompare.getTime())) {
        alert("La date saisie est invalide.");
    } else if (currentDate > dateToCompare) {
        alert("Choisissez une date supérieure ou égale à la date actuelle!");
    } else if (this.meetingForm.hourEnd <= this.meetingForm.hourStart) {
        alert("L'heure de fin doit être postérieure à l'heure de début.");
    } else {

      let available = this.functionsService.isAvailable(this.planningList,this.meetingForm, this.busyDays);

      // console.log(this.planningList);
      // console.log(this.busyDays);
      // console.log(this.meetingForm);
      // console.log(available);

      if(available){
        this.updateMeet(this.meetingId,this.meetingForm);
      }
      else
      {
        alert("Non dispo!"+JSON.stringify(this.planningList))
      }
 
      
    }

  }
  
  
  onSubmit():void{

    this.getDoctorPlanning(this.meetingForm.userId);
    this.getMeetingByDoctor(this.meetingForm.userId);


    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() - 1);

    const dateToCompare = new Date(this.meetingForm.date);

    if (isNaN(dateToCompare.getTime())) {
        alert("La date saisie est invalide.");
    } else if (currentDate > dateToCompare) {
        alert("Choisissez une date supérieure ou égale à la date actuelle!");
    } else if (this.meetingForm.hourEnd <= this.meetingForm.hourStart) {
        alert("L'heure de fin doit être postérieure à l'heure de début.");
    } else {

      let available = this.functionsService.isAvailable(this.planningList,this.meetingForm, this.busyDays);

      if(available){
        //console.log("Id hopital",this.hospitalId);
        this.meetingForm.hospitalId = this.hospitalId;
        //console.log(this.meetingForm)
        this.addMeeting(this.meetingForm);
      }
      else
      {
        alert("Non dispo!"+JSON.stringify(this.planningList))
      }
 
      
    }

  }


}
