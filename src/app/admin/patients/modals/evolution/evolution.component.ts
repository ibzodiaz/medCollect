import { Component } from '@angular/core';
import { Evolution } from 'src/app/_interfaces/evolution';

@Component({
  selector: 'app-evolution',
  templateUrl: './evolution.component.html',
  styleUrls: ['./evolution.component.css']
})
export class EvolutionComponent {

  constructor() {}

  womenCanceled:boolean = false;
  babiesCanceled:boolean = false;

  evolutionForm:any = {}

  private initForm():Evolution{
    return {
      patientId: '',
      evolutionApresSortie: '',
      classeNYHA: '',
      detailsDeces: {
         date: '',
         causes: '',
         lieu: ''
      },
      bonneObservanceTherapeutique: false,
      nombreRehospitalisations: 0,
      facteursDecompensation: {
        anemie: false,
        infectionsVirales: false,
        infectionsBacteriennes: false,
        denutrition: false,
        rupturesTherapeutiques: false
      },
      echocardiographie: {
        DTDVG: '',
        DTSVG: '',
        FEVG: '',
        FR: '', 
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
      },
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

  ngOnInit(): void {}

  checkboxState($event: boolean){
    this.womenCanceled = $event;
    this.babiesCanceled = $event;

    const women = document.getElementById("women") as HTMLInputElement;
    const baby = document.getElementById("baby") as HTMLInputElement;

    if(this.womenCanceled){
      women.checked = false;
    }

    if(this.babiesCanceled){
      baby.checked = false;
    }

  }
  
  openModal(modalId: string): void {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.style.display = "block";

    }
  }

  closeModal(modalId: string): void {

    const modal = document.getElementById(modalId);
    if (modal) {
      modal.style.display = "none";
    }
  }

}
