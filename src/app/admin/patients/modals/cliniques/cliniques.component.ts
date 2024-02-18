import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Cliniques } from 'src/app/_interfaces/cliniques';
import { CliniquesService } from 'src/app/_services/cliniques.service';
import { SharedService } from 'src/app/_services/shared.service';

@Component({
  selector: 'app-cliniques',
  templateUrl: './cliniques.component.html',
  styleUrls: ['./cliniques.component.css']
})
export class CliniquesComponent {

  cliniquesForm: Cliniques = this.initializeCliniquesForm();

  patientExists:boolean = false;
  patientId:any;

  constructor(
    private route:ActivatedRoute,
    private sharedService:SharedService,
    private cliniquesService:CliniquesService
  ) {}

  ngOnInit(): void {
    this.cliniquesForm = this.initializeCliniquesForm();
    this.getPatientClinicSigns();
  }

  private initializeCliniquesForm(): Cliniques {
    return {
      patientId: this.route.snapshot.queryParamMap.get('patientId'),
      dyspneeEffort: {
        presente: false,
        typeNYHA: ''
      },
      oedemeAiguPoumon: {
        presente: false
      },
      toux: {
        presente: false
      },
      palpitations: {
        presente: false
      },
      omi: {
        presente: false
      },
      constantes: {
        ta: {
          systolique: 0,
          diastolique: 0
        },
        fc: 0,
        fr: 0,
        temperature: 0,
        poids: 0,
        taille: 0,
        imc: 0,
      },
      souffleCardiaque: {
        presente: false,
        typeSouffle: []
      },
      tsvj: {
        presente: false
      },
      hepatomegalie: {
        presente: false
      }
    };
  }

  getPatientClinicSigns(): void {
    this.route.queryParamMap.subscribe((queryParams: any) => {
      if (queryParams.has('patientId')) {
        this.patientId = queryParams.get('patientId');
        this.cliniquesService.getClinicSignsByPatientId(this.patientId).subscribe(
          (clinicSigns: any) => {
            this.cliniquesForm = { ...clinicSigns, patientId: this.patientId };
            this.patientExists = true;
          },
          (err: any) => {
            if (err.status === undefined) {
              this.cliniquesForm = this.initializeCliniquesForm();
              this.patientExists = false;
            } else {
              console.error(err);
            }
          }
        );
      }
    });
  
  }

  calculateIMC() {
    if (this.cliniquesForm.constantes.poids && this.cliniquesForm.constantes.taille) {
      const poids = this.cliniquesForm.constantes.poids;
      const taille = this.cliniquesForm.constantes.taille / 100; // Convertir en mètres
      const imc = poids / (taille * taille);
      this.cliniquesForm.constantes.imc = imc;
    }
  }
  

  onSubmit():void{

    if(this.cliniquesForm.souffleCardiaque.presente){
      this.cliniquesForm.souffleCardiaque.typeSouffle = this.sharedService.getterCardio().souffleCardiaque.typeSouffle;
    }
 
    if(this.cliniquesForm.dyspneeEffort.presente){
      this.cliniquesForm.dyspneeEffort.typeNYHA = this.sharedService.getterDyspnee().dyspneeEffort.typeNYHA;
      this.cliniquesForm.oedemeAiguPoumon.presente = this.sharedService.getterDyspnee().oedemeAiguPoumon.presente;  
    }

    //console.log(JSON.stringify(this.cliniquesForm));

    if(this.patientExists){
      alert(this.patientId)
      alert(JSON.stringify(this.cliniquesForm));
      this.cliniquesService.updateClinicSigns(this.patientId,this.cliniquesForm).subscribe(
        (success:any)=>{
          alert("modification réussie!");
        },
        (err:any)=> console.log(err.message)
      );
    }
    else
    { 
      this.cliniquesService.addClinicSigns(this.cliniquesForm).subscribe(
        (success:any)=>{
          alert("insertion réussie!");
        },
        (err:any)=> console.log(err.message)
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