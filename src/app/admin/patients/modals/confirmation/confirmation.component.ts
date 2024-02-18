import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PatientsService } from 'src/app/_services/patients.service';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.css']
})
export class ConfirmationComponent {

  constructor(private httpClient: HttpClient, private route: ActivatedRoute, private router: Router,private patientsService:PatientsService) {}

  @Output() confirmed: EventEmitter<boolean> = new EventEmitter<boolean>();

  confirmDeletion(modalId:string) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.style.display = "none";
      this.confirmed.emit(true);
    }
  }

  onFileSelected(event: any) {
    const files: FileList = event.target.files;
    console.log(files);
  }

  
  initURL():void{
    this.router.navigate([], {
      queryParams: { patientId: null },
      queryParamsHandling: 'merge',
    });
  }


  closeModal(modalId: string): void {

    const modal = document.getElementById(modalId);
    if (modal) {
      modal.style.display = "none";
      this.initURL();
      this.confirmed.emit(false);
    }
  }
  

}
