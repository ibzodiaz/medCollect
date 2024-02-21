import { Component, EventEmitter, Output } from '@angular/core';
import { SharedService } from 'src/app/_services/shared.service';

@Component({
  selector: 'app-deces',
  templateUrl: './deces.component.html',
  styleUrls: ['./deces.component.css']
})
export class DecesComponent {

  decesForm:any={
    detailsDeces: {
      date: '',
      causes: '',
      lieu: ''
    }
  }

  constructor(
    private sharedService:SharedService
  ){}

  ngOnInit():void{}

  onSubmit(){
    //alert(JSON.stringify(this.decesForm));
    this.sharedService.setterDeces(this.decesForm);
  }

  closeModal(modalId: string,e:Event): void {
    e.preventDefault();
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.style.display = "none";
    }
  }

}
