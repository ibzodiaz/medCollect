import { Component } from '@angular/core';
import { Antecedents } from 'src/app/_interfaces/antecedants';
import { ActivatedRoute, Router } from '@angular/router';
import { AntecedantsService } from 'src/app/_services/antecedants.service';
import { SharedService } from 'src/app/_services/shared.service';

@Component({
  selector: 'app-antecedents',
  templateUrl: './antecedents.component.html',
  styleUrls: ['./antecedents.component.css']
})
export class AntecedentsComponent {

  PatientAntecedantId:any;
  patientExists: boolean =false;

  hospitalisationForm:any;
  atcdForm:any;

  
  antecedantForm: Antecedents = {};

  initForm():void{
      
    this.antecedantForm = {
      patientId: '',
    
      htaGravidique: false,
      diabete_gestionnelle: false,
      pre_eclampsie: false,
      autres: '',

      menarche: 0,
      gestite: 0,
      parite: 0,
      grossessesGemellaires: false,
      tocolyseProlongee: '',

      atcdDecompensation: false,
      nombreAtcdDecompensation:0,
      typeInsuffisanceCardiaque: '',

      hospitalisationsAnterieures: false,
      nombreHospitalisations: 0

    };

  }

  constructor(
    private router:Router,
    private route: ActivatedRoute, 
    private antecedantsService:AntecedantsService,
    private sharedService:SharedService
    ) {}

  ngOnInit(): void {
    this.initForm();
    this.getPatientAntecedant();
  }


  getPatientAntecedant(): void {
    this.route.queryParamMap.subscribe((queryParams: any) => {
      if (queryParams.has('patientId')) {
        this.PatientAntecedantId = queryParams.get('patientId');
        this.antecedantsService.getAntecedantByPatientId(this.PatientAntecedantId).subscribe(
          (antecedants: any) => {
            this.antecedantForm = { ...antecedants, patientId: this.PatientAntecedantId };
            this.patientExists = true;
            console.log(this.antecedantForm);
          },
          (err: any) => {
            if (err.status === undefined) {
              this.initForm();
              this.patientExists = false;
            } else {
              console.error(err);
            }
          }
        );
      }
    });
  }

  
  initATCD(){
    this.antecedantForm.atcdDecompensation = false;
    this.antecedantForm.nombreAtcdDecompensation = 0;
    this.antecedantForm.typeInsuffisanceCardiaque = "";
    this.sharedService.setterATCD(this.antecedantForm);
  }

  initHA(){
    this.antecedantForm.hospitalisationsAnterieures = false;
    this.antecedantForm.nombreHospitalisations = 0;
    this.sharedService.setterHospitalisation(this.antecedantForm);
  }


  createNewAntecedant(antecedants:Antecedents):void{
    this.antecedantsService.addPatient(antecedants).subscribe(
      (antecedants: any) => {
        alert("Insertion réussie!");
      },
      (err: any) => {
        console.error(err);
        alert("Une erreur s'est produite lors de l'insertion.");
      }
    );
  }

  updateAntecedant(patientId:string,antecedants:Antecedents):void{
    this.antecedantsService.updatePatient(patientId, antecedants).subscribe(
      (antecedants: any) => {
        alert("Modification réussie!");
      },
      (err: any) => {
        console.error(err);
        alert("Une erreur s'est produite lors de la modification.");
      }
    );
  }

  onSubmitAntecedant(): void {

    if(!this.antecedantForm.atcdDecompensation){
      this.initATCD();
    }
    else
    {
      this.antecedantForm.atcdDecompensation = this.sharedService.getterATCD().atcdDecompensation;
      this.antecedantForm.nombreAtcdDecompensation = this.sharedService.getterATCD().nombreAtcdDecompensation;
      this.antecedantForm.typeInsuffisanceCardiaque = this.sharedService.getterATCD().typeInsuffisanceCardiaque;
  
    }

    if(!this.antecedantForm.hospitalisationsAnterieures){
      this.initHA();
    }
    else
    {
      this.antecedantForm.hospitalisationsAnterieures = this.sharedService.getterhospitalisation().hospitalisationsAnterieures;
      this.antecedantForm.nombreHospitalisations = this.sharedService.getterhospitalisation().nombreHospitalisations;  
    }
    
    if (this.patientExists) {
      
      this.updateAntecedant(this.PatientAntecedantId, this.antecedantForm);
 
    } else {
      
      this.antecedantForm.patientId = this.PatientAntecedantId;
      this.createNewAntecedant(this.antecedantForm);

    }
  }

  openModal(modalId: string, e:Event): void {
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
      this.router.navigate([], { queryParams: { patientId: null } });
    }
  }

}
