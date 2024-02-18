export interface Antecedents {
   htaGravidique?: boolean;
   diabete_gestionnelle?: boolean;
   pre_eclampsie?: boolean;
   autres?: string;
   patientId?:string;

   menarche?: Number;
   gestite?: Number;
   parite?: Number;
   grossessesGemellaires?: boolean;
   tocolyseProlongee?: string;

   atcdDecompensation?: boolean;
   nombreAtcdDecompensation?: number;
   typeInsuffisanceCardiaque?: '' | 'IVG' | 'IVD' | 'ICG';
 
   hospitalisationsAnterieures?: boolean;
   nombreHospitalisations?: number;
 }
 