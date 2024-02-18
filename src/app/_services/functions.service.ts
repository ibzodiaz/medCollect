import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FunctionsService {

  constructor() { }

  getRandomColor() {
    return '#' + Math.floor(Math.random()*16777215).toString(16);
  }

  formatTime(date: Date): string {
    return date.toTimeString().split(' ')[0]; // Retourne HH:MM:SS
  }

  formatDate(dateString:string) {
    const dateObj = new Date(dateString); // Crée un objet Date à partir de la chaîne de date

    // Récupère le jour, le mois et l'année de l'objet Date
    const jour = dateObj.getDate();
    const mois = dateObj.getMonth() + 1; // Le mois commence à 0, donc on ajoute 1
    const annee = dateObj.getFullYear();

    // Formate les composants en chaîne sous le format "jj/mm/aaaa"
    const dateFormatee = `${annee}-${mois.toString().padStart(2, '0')}-${jour.toString().padStart(2, '0')}`;

    return dateFormatee;
  }


  isAvailable(planningList: any[], meetingForm: any, busyDays: any[]): boolean {
    // Vérification de la disponibilité dans la liste des plannings
    if(planningList.length != 0){
      for (let planning of planningList) {
          if (planning.date === meetingForm.date) {
              if (!(meetingForm.hourEnd < planning.hourStart || meetingForm.hourStart > planning.hourEnd)) {
                return false; // La période chevauche un créneau existant, donc elle est indisponible
              }
          }
      }
    }

    // Vérification de la disponibilité dans les jours déjà occupés
    if(busyDays.length != 0){
      for (let busy of busyDays) {
          if (busy.date === meetingForm.date) {
              // Vérification si le rendez-vous chevauche un créneau existant
              if (!(meetingForm.hourEnd < busy.hourStart || meetingForm.hourStart > busy.hourEnd)) {
                  return false; // La période chevauche un créneau existant, donc elle est indisponible
              }
          }
      }
    }

    // Si la date n'est pas trouvée dans les jours déjà occupés ou si elle ne chevauche aucun créneau existant, elle est disponible
    return true;
  }
}
