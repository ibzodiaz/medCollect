export interface Prescription {
    userId: string | null,
    patientId:string | null,
    consultationId:string | null,
    posologie:string,
    medicament:string
}
