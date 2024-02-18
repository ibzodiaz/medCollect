export interface Cliniques {
    patientId: string | null;

    dyspneeEffort: {
        presente: boolean;
        typeNYHA?: '' | 'Type I' | 'Type II' | 'Type III' | 'Type IV'; // Utilisation d'une union de chaînes pour les valeurs énumérées
    };
    oedemeAiguPoumon: {
        presente: boolean;
    };
    toux: {
        presente: boolean;
    };
    palpitations: {
        presente: boolean;
    };
    omi: {
        presente: boolean;
    };
    constantes: {
        ta: {
        systolique?: number; // Supposons que ce sont des nombres optionnels
        diastolique?: number;
        };
        fc?: number;
        fr?: number;
        temperature?: number;
        poids?: number;
        taille?: number;
        imc?: number;
    };
    souffleCardiaque: {
        presente: boolean;
        typeSouffle?:  ('IM' | 'RM' | 'IA' | 'RA' | 'IP' | 'RP' | 'IT' | 'RP')[];
    };
    tsvj: {
        presente: boolean;
    };
    hepatomegalie: {
        presente: boolean;
    };


}
