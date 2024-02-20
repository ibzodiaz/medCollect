import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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

  patientExists:boolean = false;
  
  private initializeCliniquesForm():Paracliniques {
    return {
      patientId: null,
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
        dtdvg: '',
        dtsvg: '',
        fevg: '',
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

  
  getPatientClinicSigns(): void {
    this.route.queryParamMap.subscribe((queryParams: any) => {
      if (queryParams.has('patientId')) {
        this.patientId = queryParams.get('patientId');
        this.paracliniquesService.getParaClinicSignsByPatientId(this.patientId).subscribe(
          (paraclinicSigns: any) => {
            this.paracliniquesForm = { ...paraclinicSigns, patientId: this.patientId };
            //console.log(this.paracliniquesForm);
            this.patientExists = true;
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
    });
  
  }
  
  getIdPatient(){
    this.route.queryParamMap.subscribe((queryParams: any) => {
      if (queryParams.has('patientId')) {
        this.patientId = queryParams.get('patientId');
        this.paracliniquesForm.patientId = this.patientId;
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
      this.paracliniquesForm.ett.dtdvg = '';
      this.paracliniquesForm.ett.dtsvg = '';
      this.paracliniquesForm.ett.fevg = '';
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
    this.getIdPatient();
    //this.paracliniquesForm = this.initializeCliniquesForm();
    this.getPatientClinicSigns();
  }

  onSubmit(){
    this.getIdPatient();
    this.updateData();

    if(this.patientExists){
      this.paracliniquesService.updateParaClinicSigns(this.patientId,this.paracliniquesForm).subscribe(
        (success:any)=>{
          alert("Modification réussie!");
        },
        (err:any)=>console.log(err.message)
      );
    }
    else
    {
      this.paracliniquesService.addParaClinicSigns(this.paracliniquesForm).subscribe(
        (success:any)=>{
          alert("Insertion réussie!");
        },
        (err:any)=>console.log(err.message)
      );
    }

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

}
