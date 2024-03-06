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

  user:any;

  constructor(
    private meetsService: MeetsService,
    private patientsService:PatientsService,
    private userService:UserService,
    private planningService:PlanningService,
    private tokenService:TokenService,
    private functionsService:FunctionsService
  ) {}


  ngOnInit(): void {

    this.userService.getUserById(this.tokenService.getUserIdFromToken()).subscribe(
      (user:any)=>{
          if(user){
              this.user = user.data;
              //alert(JSON.stringify(this.user))
          }
      },
      (err:any)=> console.log(err.message)
    );

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

    // this.getDoctorPlanning(this.meetingForm.userId);
    // this.getMeetingByDoctor(this.meetingForm.userId);

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
        
        //console.log(meets);

        const modal = document.getElementById("eventModal");
        if(modal){
          this.getAllMeetingByHospital();
          modal.style.display ="none";
          //alert("modifié");
        }
      },
      (err:any)=>console.log(err.message())
    );
  }


  onUpdate():void{

    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() - 1);

    const currentDateMeet = new Date();

    const dateToCompare = new Date(this.meetingForm.date);

    if (isNaN(dateToCompare.getTime())) {
      this.isDialogOpen = true;
      this.messageTitle = 'La date saisie est invalide.';
      this.messageContent = '';
    } else if (currentDate > dateToCompare) {
        this.isDialogOpen = true;
        this.messageTitle = 'Choisissez une date supérieure ou égale à la date actuelle!';
        this.messageContent = '';
    } else if (this.meetingForm.hourEnd <= this.meetingForm.hourStart) {
        this.isDialogOpen = true;
        this.messageTitle = 'L\'heure de fin doit être postérieure à l\'heure de début.';
        this.messageContent = '';
    } else {

      this.meetsService.getMeetsByDoctorId(this.meetingForm.userId).subscribe(
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

            this.busyDays = events.filter((meet: any) => {
                                                      return new Date(meet.date) >= currentDateMeet;
                                                    }).map((busy:any)=>(
                                                      {
                                                      date:busy.date,
                                                      hourStart:busy.hourStart,
                                                      hourEnd:busy.hourEnd
                                                    }));
          
          this.planningService.getPlanningByDoctorId(this.meetingForm.userId).subscribe(
            (plannings: any) => {
              this.planningList = plannings
              .filter((plan: any) => {
                return new Date(plan.date) >= currentDateMeet;
              })
              .map((planning: any) => ({
                date: planning.date,
                hourStart: planning.hourStart,
                hourEnd: planning.hourEnd
              }));
      
       
              let available = this.functionsService.isAvailable(this.planningList,this.meetingForm, this.busyDays);

              if(available){
                this.updateMeet(this.meetingId,this.meetingForm);
              }
              else
              {
                this.isDialogOpen = true;
                this.messageTitle = 'Indisponible';
                this.messageContent = 'Ce médecin est déjà pris pour ces dates:';
              }
            },
            (err: any) => console.log(err.message)
          );

          this.isLoading = false;
          
        },
        (err: any) => console.log(err.message())
      ); 
 
      
    }

  }
  
  
  onSubmit():void{

    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() - 1);

    const currentDateMeet = new Date();

    const dateToCompare = new Date(this.meetingForm.date);

    if (isNaN(dateToCompare.getTime())) {
        this.isDialogOpen = true;
        this.messageTitle = 'La date saisie est invalide.';
        this.messageContent = '';
    } else if (currentDate > dateToCompare) {
        this.isDialogOpen = true;
        this.messageTitle = 'Choisissez une date supérieure ou égale à la date actuelle!';
        this.messageContent = '';
    } else if (this.meetingForm.hourEnd <= this.meetingForm.hourStart) {
        this.isDialogOpen = true;
        this.messageTitle = 'L\'heure de fin doit être postérieure à l\'heure de début.';
        this.messageContent = '';
    } else {
    
      this.meetsService.getMeetsByDoctorId(this.meetingForm.userId).subscribe(
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

          this.busyDays = events.filter((meet: any) => {
                                                    return new Date(meet.date) >= currentDateMeet;
                                                  }).map((busy:any)=>(
                                                    {
                                                    date:busy.date,
                                                    hourStart:busy.hourStart,
                                                    hourEnd:busy.hourEnd
                                                  }));
          
          this.planningService.getPlanningByDoctorId(this.meetingForm.userId).subscribe(
            (plannings: any) => {

              this.planningList = plannings
              .filter((plan: any) => {
                return new Date(plan.date) >= currentDateMeet;
              })
              .map((planning: any) => ({
                date: planning.date,
                hourStart: planning.hourStart,
                hourEnd: planning.hourEnd
              }));            
      
              let available = this.functionsService.isAvailable(this.planningList,this.meetingForm, this.busyDays);
        
              if(available){
                //console.log("Id hopital",this.hospitalId);
                this.meetingForm.hospitalId = this.hospitalId;
                //console.log(this.meetingForm)
                this.addMeeting(this.meetingForm);
              }
              else
              {
                //alert("Non dispo!"+JSON.stringify(this.planningList))
                this.isDialogOpen = true;
                this.messageTitle = 'Indisponible';
                this.messageContent = 'Ce médecin est déjà pris pour ces dates:';
              }
            },
            (err: any) => console.log(err.message)
          );

          this.isLoading = false;
          
        },
        (err: any) => console.log(err.message())
      ); 
      
    }

  }


  isDialogOpen: boolean = false;
  messageTitle: string = '';
  messageContent: string = '';


  closeMessageDialog(): void {
    this.isDialogOpen = false;
  }

}
