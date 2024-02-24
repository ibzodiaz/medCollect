export interface Antecedents {
  patientId?:string | null;

  htaGravidique?: boolean;
  diabete_gestionnelle?: boolean;
  pre_eclampsie?: boolean;
  autres?: string;

  menarche?: Number;
  gestite?: Number;
  parite?: Number;
  grossessesGemellaires?: boolean;
  tocolyseProlongee?: boolean;

  atcdDecompensation?: boolean;
  nombreAtcdDecompensation?: number;
  typeInsuffisanceCardiaque?: '' | 'IVG' | 'IVD' | 'ICG';

  hospitalisationsAnterieures?: boolean;
  nombreHospitalisations?: number;
 }
 