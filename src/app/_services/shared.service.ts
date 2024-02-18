import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor() { }

  atcd:any;
  hospitalisation:any;
  cardio:any;
  dyspnee:any;

  setterATCD(atcd:any){
    this.atcd = atcd;
  }

  getterATCD():any{
    return this.atcd;
  }

  setterHospitalisation(hospitalisation:any){
    this.hospitalisation = hospitalisation;
  }

  getterhospitalisation():any{
    return this.hospitalisation;
  }

  setterCardio(cardio:any){
    this.cardio = cardio;
  }

  getterCardio():any{
    return this.cardio;
  }

  setterDyspnee(dyspnee:any){
    this.dyspnee = dyspnee;
  }

  getterDyspnee():any{
    return this.dyspnee;
  }
}
