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
  telecoeur:any;
  ecg:any;
  ett:any;
  evolution:any;
  deces:any;
  women:any;
  babies:any;

  assistant:any;

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

  
  setterTelecoeur(telecoeur:any){
    this.telecoeur = telecoeur;
  }

  getterTelecoeur():any{
    return this.telecoeur;
  }
    
  setterEcg(ecg:any){
    this.ecg = ecg;
  }

  getterEcg():any{
    return this.ecg;
  }

  setterEtt(ett:any){
    this.ett = ett;
  }

  getterEtt():any{
    return this.ett;
  }

  setterEvolution(evolution:any){
    this.evolution = evolution;
  }

  getterEvolution():any{
    return this.evolution;
  }
  
  setterDeces(deces:any){
    this.deces = deces;
  }

  getterDeces():any{
    return this.deces;
  }

  setterWomen(women:any){
    this.women = women;
  }

  getterWomen():any{
    return this.women;
  } 

  setterBabies(babies:any){
    this.babies = babies;
  }

  getterBabies():any{
    return this.babies;
  }

  setterAssistant(assistant:any){
    this.assistant = assistant;
  }

  getterAssistant():any{
    return this.assistant;
  }
}
