import { Component } from '@angular/core';
import { ActivatedRoute,ParamMap } from '@angular/router';
import { Medicaments } from 'src/app/_interfaces/medicaments';
import { Posologie } from 'src/app/_interfaces/posologie';
import { Prescription } from 'src/app/_interfaces/prescription';
import { MedicamentsService } from 'src/app/_services/medicaments.service';
import { OrdonnanceService } from 'src/app/_services/ordonnance-service.service';
import { PosologieService } from 'src/app/_services/posologie.service';
import { PrescriptionService } from 'src/app/_services/prescription-service.service';
import { TokenService } from 'src/app/_services/token.service';

@Component({
  selector: 'app-ajoutordonnance',
  templateUrl: './ajoutordonnance.component.html',
  styleUrls: ['./ajoutordonnance.component.css']
})
export class AjoutordonnanceComponent {

  constructor(
    private ordonnanceService:OrdonnanceService,
    private posologieService:PosologieService,
    private medicamentsService:MedicamentsService,
    private prescriptionService:PrescriptionService,
    private tokenService: TokenService,
    private route:ActivatedRoute
  ){}

  prescriptionForm:Prescription={
    userId: this.tokenService.getUserIdFromToken(),
    patientId: this.route.snapshot.paramMap.get('patientId'),
    consultationId:this.route.snapshot.paramMap.get('consultationId'),
    posologie:'',
    medicament:''
  }

  posologieForm:Posologie = {
    posologie: ''
  }

  medicamentForm:Medicaments = {
    medicament: ''
  }

  posologieList:any;
  medicamentsList:any;

  prescriptionList:any;

  patientId:any;


  prescriptionTable(patientId:string,consultationId:string){

    this.prescriptionService.getPrescriptionByPatient(patientId,consultationId).subscribe(
      (prescription:any)=>{
        this.prescriptionList = prescription;
        //alert(JSON.stringify(this.prescriptionList))
      },
      (err:any)=>console.log(err.message)
    ); 
    
  }

  showPosologie(){
    const poso = document.querySelector('.hide-poso');
    if (poso) {
      poso.classList.toggle('visible');
    }
  }

  showMedicament(){
    const medi = document.querySelector('.hide-medi');
    if (medi) {
      medi.classList.toggle('visible');
    }
  }

  showSave1() {
    const input:any | null = document.getElementById('textInput1') as HTMLElement;
    const medi = document.querySelector('.save-medi') as HTMLElement;
    
    // Vérifie si l'entrée a du texte
    if (input.value.trim() !== '') {
      medi.classList.add('visible'); // Affiche l'élément
    } else {
      medi.classList.remove('visible'); // Cache l'élément
    }
  }
  
  showSave2() {
    const input:any | null = document.getElementById('textInput2') as HTMLElement;
    const poso = document.querySelector('.save-poso') as HTMLElement;
    
    // Vérifie si l'entrée a du texte
    if (input.value.trim() !== '') {
      poso.classList.add('visible'); // Affiche l'élément
    } else {
      poso.classList.remove('visible'); // Cache l'élément
    }
  }

  posologie(){
    this.posologieService.getAllPosologie().subscribe(
      (posologie:any)=>{
        this.posologieList = posologie;
        //console.log(JSON.stringify(ordonnance))
      },
      (err:any)=>console.log(err.message)
    );

  }
  

  medicaments(){
    this.medicamentsService.getAllMedicaments().subscribe(
      (medicament:any)=>{
        this.medicamentsList = medicament;
        //console.log(JSON.stringify(ordonnance))
      },
      (err:any)=>console.log(err.message)
    );
  }

  savePosologie(){
    this.posologieService.addPosologie(this.posologieForm).subscribe(
      (success:any)=>{
        alert("posologie ajoutée!");
        this.posologie();
        //console.log(JSON.stringify(ordonnance))
      },
      (err:any)=>console.log(err.message)
    );

  }

  saveMedicaments(){
    this.medicamentsService.addMedicaments(this.medicamentForm).subscribe(
      (success:any)=>{
        alert("medicament ajouté!");
        this.medicaments();
        //console.log(JSON.stringify(ordonnance))
      },
      (err:any)=>console.log(err.message)
    );
  }
  

  ngOnInit():void{

    this.prescriptionList = []

    this.route.paramMap.subscribe((params: ParamMap) => {
      const consultationId = params.get('consultationId');
      const patientId = params.get('patientId');
      this.prescriptionForm.consultationId = consultationId;
      this.prescriptionForm.patientId = patientId;

      if(patientId && consultationId){
        this.prescriptionTable(patientId,consultationId);
      }
    });

    this.medicaments();
    this.posologie();

    
  }

  onSubmit(){

    this.prescriptionService.addPrescription(this.prescriptionForm).subscribe(
      (success:any)=>{
        alert("Ajouté!")
        if(this.prescriptionForm.patientId && this.prescriptionForm.consultationId){
          this.prescriptionTable(this.prescriptionForm.patientId,this.prescriptionForm.consultationId);
        }
      },
      (err:any)=>console.log(err.message)
    );

  
  }

  delete(id:string){

    this.prescriptionService.deletePrescriptionById(id).subscribe(
      (success)=>{
        alert("supprimé!");
        if(this.prescriptionForm.patientId && this.prescriptionForm.consultationId){
          this.prescriptionTable(this.prescriptionForm.patientId,this.prescriptionForm.consultationId);
        }
      },
      (err:any)=>console.log(err.message)
    );
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
