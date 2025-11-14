import { ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { TipoAtividadeMedica } from '../atividades-medicas.models';

export const apenasUmMedicoPorConsulta: ValidatorFn = (
  group: AbstractControl,
): ValidationErrors | null => {
  const tipo = group.get('tipoAtividade')?.value as TipoAtividadeMedica | null;
  const medicos = group.get('medicos')?.value as string[] | null;

  if (tipo === TipoAtividadeMedica.Consulta && Array.isArray(medicos) && medicos.length > 1) {
    return { apenasUmMedicoPorConsulta: true };
  }
  return null;
};
