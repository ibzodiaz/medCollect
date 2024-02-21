export interface Evolution {
   patientId: string | null,

   mere:{
      presente: Boolean,
      evolutionApresSortie: '' | '3 mois'| '6 mois'| '9 mois'| '12 mois'
      classeNYHA: '' | 'recuperation_totale' | 'recuperation_partielle' | 'etat_stationnaire' | 'degradation_qualite_vie'
      detailsDeces: {
         presente: Boolean,
         date: string,
         causes: String,
         lieu: '' | 'hopital'| 'domicile'
      },
      bonneObservanceTherapeutique: Boolean,
      nombreRehospitalisations: Number,
      facteursDecompensation:  {
         anemie: Boolean,
         infectionsVirales: Boolean,
         infectionsBacteriennes: Boolean,
         denutrition: Boolean,
         rupturesTherapeutiques: Boolean
      },
      echocardiographie: {
         dtdvg: String,
         dtsvg: String,
         fevg: String,
         fr: String, 
         e: String,
         a: String,
         td: String,
         ee: String,
         tapse: String,
         dtog:String
      },
      biologie: {
         hemoglobinemie: Number,
         gb: Number,
         plaquettes: Number,
         vgm: Number,
         ccmh: Number,
         tcmh: Number,
         crp: Number,
         uree: Number,
         creatininemie: Number,
         ntProBNP: Number,
         prolactine: Number
      }
   },

   enfant:{
      presente: Boolean,
      evolutionBebe: {
         mortNes: Boolean,
         faiblePoidsNaissance: Boolean,
         prematurite: Boolean,
         poidsNaissance: Number,
         alimentationNaissance: String,
         poids3Mois: Number,
         alimentation3Mois: String,
         poids6Mois: Number,
         alimentation6Mois: String,
         poids12Mois: Number,
         alimentation12Mois: String
      }
   }

}
