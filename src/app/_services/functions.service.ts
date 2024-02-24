import { Injectable } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FunctionsService {

  constructor(
    private route:ActivatedRoute
  ) { }

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
    // Vérification de la disponibilité dans la liste des plannings ou des jours déjà occupés
    for (let planning of planningList) {
        if (planning.date === meetingForm.date && !(meetingForm.hourEnd < planning.hourStart || meetingForm.hourStart > planning.hourEnd)) {
            // La période chevauche un créneau existant, donc elle est indisponible
            return false;
        }
    }
    for (let busy of busyDays) {
        if (busy.date === meetingForm.date && !(meetingForm.hourEnd < busy.hourStart || meetingForm.hourStart > busy.hourEnd)) {
            // La période chevauche un créneau existant, donc elle est indisponible
            return false;
        }
    }


    // Si aucune date n'a été trouvée dans les jours déjà occupés ou les plannings existants, la période est disponible
    return true;
  }

  observeParamIdChanges(id:string): Observable<string> {
    return this.route.paramMap.pipe(
        map((params: ParamMap) => params.get(id) || '')
    );
}



}
