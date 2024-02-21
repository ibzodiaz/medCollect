import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Evolution } from 'src/app/_interfaces/evolution';
import { EvolutionService } from 'src/app/_services/evolution.service';
import { SharedService } from 'src/app/_services/shared.service';

@Component({
  selector: 'app-evolution',
  templateUrl: './evolution.component.html',
  styleUrls: ['./evolution.component.css']
})
export class EvolutionComponent {

  constructor(
    private sharedService: SharedService,
    private route:ActivatedRoute,
    private evolutionService:EvolutionService
  ) {}

  evolutionForm:any = {}

  private initForm():Evolution{
    return {
      patientId: null,

      mere:{
         presente: false,
         evolutionApresSortie: '',
         classeNYHA: '',
         detailsDeces: {
            presente: false,
            date: '',
            causes: '',
            lieu: ''
         },
         bonneObservanceTherapeutique: false,
         nombreRehospitalisations: 0,
         facteursDecompensation:  {
              anemie: false,
              infectionsVirales: false,
              infectionsBacteriennes: false,
              denutrition: false,
              rupturesTherapeutiques: false
          },
         echocardiographie: {
            dtdvg: '',
            dtsvg: '',
            fevg: '',
            fr: '', 
            e: '',
            a: '',
            td: '',
            ee: '',
            tapse: '',
            dtog:''
         },
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
         }
      },
   
      enfant:{
         presente: false,
         evolutionBebe: {
            mortNes: false,
            faiblePoidsNaissance: false,
            prematurite: false,
            poidsNaissance: 0,
            alimentationNaissance: '',
            poids3Mois: 0,
            alimentation3Mois: '',
            poids6Mois: 0,
            alimentation6Mois: '',
            poids12Mois: 0,
            alimentation12Mois: ''
         }
      }
    }
  }

  patientId:string = '';
  patientExists:boolean = false;

  getIdPatient(){
    this.route.queryParamMap.subscribe((queryParams: any) => {
      if (queryParams.has('patientId')) {
        this.patientId = queryParams.get('patientId');
        this.evolutionForm.patientId = this.patientId;
      }
    });
  }

    
  getPatientEvolution(): void {
    this.route.queryParamMap.subscribe((queryParams: any) => {
      if (queryParams.has('patientId')) {
        this.patientId = queryParams.get('patientId');
        this.evolutionService.getEvolutionByPatientId(this.patientId).subscribe(
          (evolution: any) => {
            this.evolutionForm = { ...evolution, patientId: this.patientId };
            //console.log(this.evolutionForm);
            this.patientExists = true;
          },
          (err: any) => {
            if (err.status === undefined) {
              this.evolutionForm = this.initForm();
              this.patientExists = false;
            } else {
              console.error(err);
            }
          }
        );
      }
    });
  
  }

  ngOnInit(): void {
    this.getIdPatient();
    //this.evolutionForm = this.initForm();
    this.getPatientEvolution();
  }

  onSubmit(){
    this.getIdPatient();

    if(this.evolutionForm.mere.presente){
      this.evolutionForm.mere.evolutionApresSortie = this.sharedService.getterWomen().mere.evolutionApresSortie;
      this.evolutionForm.mere.classeNYHA = this.sharedService.getterWomen().mere.classeNYHA;
      this.evolutionForm.mere.detailsDeces = this.sharedService.getterWomen().mere.detailsDeces;
      this.evolutionForm.mere.bonneObservanceTherapeutique = this.sharedService.getterWomen().mere.bonneObservanceTherapeutique;
      this.evolutionForm.mere.nombreRehospitalisations = this.sharedService.getterWomen().mere.nombreRehospitalisations;
      this.evolutionForm.mere.facteursDecompensation = this.sharedService.getterWomen().mere.facteursDecompensation;
      this.evolutionForm.mere.echocardiographie = this.sharedService.getterWomen().mere.echocardiographie;
      this.evolutionForm.mere.biologie = this.sharedService.getterWomen().mere.biologie;
      this.evolutionForm.mere.presente = true;
    }
    else
    {
      this.evolutionForm.mere = this.initForm().mere;
    }

    if(this.evolutionForm.enfant.presente){
      this.evolutionForm.enfant = this.sharedService.getterBabies().enfant;
      this.evolutionForm.enfant.presente = true;
    }
    else
    {
      this.evolutionForm.enfant = this.initForm().enfant;
    }

    // console.log("test Evolution")
    // console.log(JSON.stringify(this.evolutionForm));

    if(this.patientExists){
      this.evolutionService.updateEvolution(this.patientId,this.evolutionForm).subscribe(
        (success:any)=>{
          alert("Modification réussie!");
        },
        (err:any)=>console.log(err.message)
      );
    }
    else
    {
      this.evolutionService.addEvolution(this.evolutionForm).subscribe(
        (success:any)=>{
          alert("Insertion réussie!");
        },
        (err:any)=>console.log(err.message)
      );
    }
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
