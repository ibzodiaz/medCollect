export interface Paracliniques {

    patientId: string | null,
    consultationId: string | null,
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
     },
     telecoeur: {
        presente: boolean,
        indexCardiothoracique: Number,
        autresSignes: String
     },
     ecg: {
        presente: boolean,
        rythmeCardiaque: ('Sinusal'| 'Tachycardie'| 'Troubles conductifs'| 'HAG'| 'HVG'| 'HAD'| 'HVD'| 'FA'| 'fa')[],
         autres:String
      },
     ett: {
        presente: boolean,
        dtdvg: number,
        dtsvg: number,
        fevg: number,
        epanchementPericardique: {
            presente: boolean
         },
         fuiteValvulaire: {
            typeFuite: ('Absente'| 'Aortique'| 'Mitrale'| 'Tricuspidienne'| 'Pulmonaire')[]
         },
         stenoseValvulaire: {
            typeStenose: ('Absente'| 'Aortique'| 'Mitrale'| 'Tricuspidienne'| 'Pulmonaire')[]
         }
     },
     traitement: {
        diuretique: Boolean,
        iec: Boolean,
        tonicardiaque: Boolean,
        bromocriptine: Boolean,
        anticoagulants: Boolean,
        betabloquants: Boolean,
        contraception: Boolean,
        autres: string
     },
     modaliteEvolutiveHospitalisation: {
      presente: false,
      aspectsDefavorables: {
         complications: Boolean,
         deces: Boolean
      },
      typeComplications: ('AVC'| 'IVG'| 'IVD'| 'ICG'| 'TDR'| 'TDC'| 'Pericardite'| 'Insuffisance coronarienne'| 'Acc. Embolique'| 'Nephropathie'| 'Abces splenique'| 'Autre'| 'Arthropathie')[],
      autres:string,
      delaiDeces: Number
   }
}
