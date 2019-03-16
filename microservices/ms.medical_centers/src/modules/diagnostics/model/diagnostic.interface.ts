import IPatient from '../../patients/model/patient.interface';
import IPractitioner from '../../practitioners/model/practitioner.interface';

export default interface IDiagnostic {
  id?: number;
  userId?: number;
  status: number;
  notes: string;

  // Relations
  patient: IPatient;
  practitioner: IPractitioner;
}
