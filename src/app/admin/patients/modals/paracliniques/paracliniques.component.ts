import { Component, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Paracliniques } from 'src/app/_interfaces/paracliniques';
import { ParacliniquesService } from 'src/app/_services/paracliniques.service';
import { SharedService } from 'src/app/_services/shared.service';

@Component({
  selector: 'app-paracliniques',
  templateUrl: './paracliniques.component.html',
  styleUrls: ['./paracliniques.component.css']
})
export class ParacliniquesComponent {
  constructor(
    private route:ActivatedRoute,
    private sharedService:SharedService,
    private paracliniquesService:ParacliniquesService
  ) {}


  paracliniquesForm: Paracliniques = this.initializeCliniquesForm();
  patientId:string='';

  PatientAntecedantId:any;
  consultationId:any;

  patientExists:boolean = false;
  
  private initializeCliniquesForm():Paracliniques {
    return {
      patientId: this.route.snapshot.paramMap.get('patientId'),
      consultationId: this.route.snapshot.paramMap.get('consultationId'),
      biologie: {
        hemoglobinemie: 0,
        gb: 0,
        plaquettes: 0,
        vgm: 0,
        ccmh: 0,
        tcmh: 0,
        crp: 0,
        uree: 0,
        creatininemie: 0,
        ntProBNP: 0,
        prolactine: 0
      },
      telecoeur: {
        presente: false,
        indexCardiothoracique: 0,
        autresSignes: '',
      },
      ecg: {
        presente: false,
        rythmeCardiaque: [],
        autres: ''
      },
      ett: {
        presente: false,
        dtdvg: 0,
        dtsvg: 0,
        fevg: 0,
        epanchementPericardique: {
          presente: false
        },
        fuiteValvulaire: {
          typeFuite: []
        },
        stenoseValvulaire: {
          typeStenose: []
        }
      },
      traitement: {
        diuretique: false,
        iec: false,
        tonicardiaque: false,
        bromocriptine: false,
        anticoagulants: false,
        betabloquants: false,
        contraception: false,
        autres: ''
      },
      modaliteEvolutiveHospitalisation: {
        presente: false,
        aspectsDefavorables: {
          complications: false,
          deces: false
        },
        typeComplications: [],
        autres:'',
        delaiDeces: 0
      }
    }
  }

  @Output() emittedEvent =  new EventEmitter<boolean>();
  inserted:boolean = false;

  getPatientParaClinicSigns(): void {
    this.route.paramMap.subscribe((params: any) => {

      if(params.has('patientId') && params.has('consultationId')){
        const patientId = params.get('patientId');
        const consultationId = params.get('consultationId');

        if (patientId && consultationId) {
            this.PatientAntecedantId = patientId;
            this.consultationId = consultationId;

            this.paracliniquesService.getParaClinicSignsByPatientId(this.PatientAntecedantId,this.consultationId).subscribe(
              (paraclinicSigns: any) => {
                if(paraclinicSigns){
                  this.paracliniquesForm = paraclinicSigns;
                  //console.log(this.paracliniquesForm);
                  this.patientExists = true;
                }
              },
              (err: any) => {
                if (err.status === undefined) {
                  this.paracliniquesForm = this.initializeCliniquesForm();
                  this.patientExists = false;
                } else {
                  console.error(err);
                }
              }
            );
        }
      }

    });
  }
  

  updateData(){
    
    if(this.paracliniquesForm.telecoeur.presente){
      this.paracliniquesForm.telecoeur.indexCardiothoracique = this.sharedService.getterTelecoeur().indexCardiothoracique;
      this.paracliniquesForm.telecoeur.autresSignes = this.sharedService.getterTelecoeur().autresSignes;
    }
    else
    {
      this.paracliniquesForm.telecoeur.indexCardiothoracique = 0;
      this.paracliniquesForm.telecoeur.autresSignes = '';
    }

    if(this.paracliniquesForm.ecg.presente){
      this.paracliniquesForm.ecg.rythmeCardiaque = this.sharedService.getterEcg().rythmeCardiaque;
      this.paracliniquesForm.ecg.autres = this.sharedService.getterEcg().autres;
    }
    else
    {
      this.paracliniquesForm.ecg.rythmeCardiaque = [];
      this.paracliniquesForm.ecg.autres = '';
    }

    if(this.paracliniquesForm.ett.presente){
      this.paracliniquesForm.ett.dtdvg = this.sharedService.getterEtt().dtdvg;
      this.paracliniquesForm.ett.dtsvg = this.sharedService.getterEtt().dtsvg;
      this.paracliniquesForm.ett.fevg = this.sharedService.getterEtt().fevg;
      this.paracliniquesForm.ett.epanchementPericardique.presente = this.sharedService.getterEtt().epanchementPericardique.presente;
      this.paracliniquesForm.ett.fuiteValvulaire.typeFuite = this.sharedService.getterEtt().fuiteValvulaire.typeFuite;
      this.paracliniquesForm.ett.stenoseValvulaire.typeStenose = this.sharedService.getterEtt().stenoseValvulaire.typeStenose;
    }
    else
    {
      this.paracliniquesForm.ett.dtdvg = 0;
      this.paracliniquesForm.ett.dtsvg = 0;
      this.paracliniquesForm.ett.fevg = 0;
      this.paracliniquesForm.ett.epanchementPericardique.presente = false;
      this.paracliniquesForm.ett.fuiteValvulaire.typeFuite = [];
      this.paracliniquesForm.ett.stenoseValvulaire.typeStenose = [];
    }

    if(this.paracliniquesForm.modaliteEvolutiveHospitalisation.presente){
      this.paracliniquesForm.modaliteEvolutiveHospitalisation.aspectsDefavorables.complications = this.sharedService.getterEvolution().aspectsDefavorables.complications;
      this.paracliniquesForm.modaliteEvolutiveHospitalisation.aspectsDefavorables.deces = this.sharedService.getterEvolution().aspectsDefavorables.deces;
      this.paracliniquesForm.modaliteEvolutiveHospitalisation.typeComplications = this.sharedService.getterEvolution().typeComplications;
      this.paracliniquesForm.modaliteEvolutiveHospitalisation.autres = this.sharedService.getterEvolution().autres;
      this.paracliniquesForm.modaliteEvolutiveHospitalisation.delaiDeces = this.sharedService.getterEvolution().delaiDeces;
    }
    else
    {
      this.paracliniquesForm.modaliteEvolutiveHospitalisation.aspectsDefavorables.complications = false;
      this.paracliniquesForm.modaliteEvolutiveHospitalisation.aspectsDefavorables.deces = false;
      this.paracliniquesForm.modaliteEvolutiveHospitalisation.typeComplications = [];
      this.paracliniquesForm.modaliteEvolutiveHospitalisation.autres = '';
      this.paracliniquesForm.modaliteEvolutiveHospitalisation.delaiDeces = 0;
    }
  }

  ngOnInit(): void {
    this.paracliniquesForm = this.initializeCliniquesForm();
    this.getPatientParaClinicSigns();
  }

  onSubmit(modalId: string,e:Event){

    this.updateData();

    if(this.patientExists){
      this.paracliniquesService.updateParaClinicSigns(this.PatientAntecedantId,this.consultationId,this.paracliniquesForm).subscribe(
        (success:any)=>{
          //alert("Modification réussie!");
        },
        (err:any)=>console.log(err.message)
      );
    }
    else
    {
      this.paracliniquesService.addParaClinicSigns(this.paracliniquesForm).subscribe(
        (success:any)=>{
          //alert("Insertion réussie!");
        },
        (err:any)=>console.log(err.message)
      );
    }
    this.closeModal(modalId,e);
    this.inserted = true;
    this.emittedEvent.emit(this.inserted);
    //console.log(JSON.stringify(this.paracliniquesForm));
  }

  openModal(modalId: string,e:Event): void {
    e.preventDefault();
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.style.display = "block";
    }
  }

  closeModal(modalId: string,e:Event): void {
    e.preventDefault();
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.style.display = "none";
    }
  }

  dataSubscription: Subscription | undefined;
  
  ngOnDestroy(): void {
    // Arrêter l'abonnement aux données lorsque le composant est détruit
    if (this.dataSubscription) {
      this.dataSubscription.unsubscribe();
    }
  }

}
