import { Injectable } from '@angular/core';
import { Patients } from '../_interfaces/patients';
import { Antecedents } from '../_interfaces/antecedants';
import { Cliniques } from '../_interfaces/cliniques';
import { Paracliniques } from '../_interfaces/paracliniques';
import { Evolution } from '../_interfaces/evolution';

@Injectable({
  providedIn: 'root'
})
export class InitAllService {

  constructor() { }

  initPatient():Patients{
    return {
      prenom:'',
      nom:'',
      age: '',
      adresse: '',
      telephone: '',
      statut: '',
      profession: '',
      niveau_socioeconomique: ''
    };
  }

  initAntecedant():Antecedents{
    return {
      patientId: '',
    
      htaGravidique: false,
      diabete_gestionnelle: false,
      pre_eclampsie: false,
      autres: '',

      menarche: 0,
      gestite: 0,
      parite: 0,
      grossessesGemellaires: false,
      tocolyseProlongee: false,

      atcdDecompensation: false,
      nombreAtcdDecompensation:0,
      typeInsuffisanceCardiaque: '',

      hospitalisationsAnterieures: false,
      nombreHospitalisations: 0

    }
  }

  initClinique():Cliniques{
    return {
      patientId: '',
      consultationId: '',
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
    }
  }

  initParaClinique():Paracliniques{
    return {
      patientId: null,
      consultationId: null,
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
      telecoeur: {
        presente: false,
        indexCardiothoracique: 0,
        autresSignes: '',
      },
      ecg: {
        presente: false,
        rythmeCardiaque: [],
        autres: ''
      },
      ett: {
        presente: false,
        dtdvg: '',
        dtsvg: '',
        fevg: '',
        epanchementPericardique: {
          presente: false
        },
        fuiteValvulaire: {
          typeFuite: []
        },
        stenoseValvulaire: {
          typeStenose: []
        }
      },
      traitement: {
        diuretique: false,
        iec: false,
        tonicardiaque: false,
        bromocriptine: false,
        anticoagulants: false,
        betabloquants: false,
        contraception: false,
        autres: ''
      },
      modaliteEvolutiveHospitalisation: {
        presente: false,
        aspectsDefavorables: {
          complications: false,
          deces: false
        },
        typeComplications: [],
        autres:'',
        delaiDeces: 0
      }
    }
  }

  initEvolution():Evolution{
    return {
      patientId: null,
      consultationId: null,
      mere:{
         presente: false,
         evolutionApresSortie: '',
         classeNYHA: '',
         detailsDeces: {
            presente: false,
            date: '',
            causes: '',
            lieu: ''
         },
         bonneObservanceTherapeutique: false,
         nombreRehospitalisations: 0,
         facteursDecompensation:  {
              anemie: false,
              infectionsVirales: false,
              infectionsBacteriennes: false,
              denutrition: false,
              rupturesTherapeutiques: false
          },
         echocardiographie: {
            dtdvg: '',
            dtsvg: '',
            fevg: '',
            fr: '', 
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
         }
      },
   
      enfant:{
         presente: false,
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
  }
}
