//--------------------Listagem------------------------
export interface ListagemAtividadesMedicasApiResponse {
  sucesso: boolean;
  dados: Dados;
}

export interface Dados {
  quantidadeRegistros: number;
  registros: AtividadeMedicaModel[];
}

export interface AtividadeMedicaModel {
  id: string;
  paciente: AtividadeMedicaPacienteModel;
  inicio: string | Date;
  termino: string | Date;
  tipoAtividade: TipoAtividadeMedica;
  medicos: AtividadeMedicaMedicoModel[];
}
//--------------------Cadastro------------------------
export interface CadastrarAtividadeMedicaModel {
  pacienteID: string;
  inicio: string | Date;
  termino: string | Date;
  tipo: TipoAtividadeMedica;
  medicos: CadastrarAtividadeMedicaMedicoModel[];
}

export interface CadastrarAtividadeMedicaResponseModel {
  sucesso: boolean;
  dados: DadosCadastrarAtividadeMedicaResponse;
}

export interface DadosCadastrarAtividadeMedicaResponse {
  id: string;
}

export interface CadastrarAtividadeMedicaMedicoModel {
  id: string;
}
//--------------------Editar--------------------------
// Pode remover o Partial ou transformar em alias; o importante é o shape do body:
export interface EditarAtividadeMedicaModel {
  inicio: string | Date | null;
  termino: string | Date | null;
  medicos: string[];
}

export interface EditarAtividadeMedicaResponseModel {
  sucesso: boolean;
  dados: DadosEditarAtividadeMedicaResponse;
}

export interface DadosEditarAtividadeMedicaResponse {
  id: string;
}
//--------------------Detalhes------------------------
export interface DetalhesAtividadeMedicaModel {
  sucesso: boolean;
  dados: DadosDetalheAtividadeMedicaResponse;
}

export interface DadosDetalheAtividadeMedicaResponse {
  id: string;
  paciente: AtividadeMedicaPacienteModel;
  inicio: string | Date;
  termino: string | Date;
  tipo: TipoAtividadeMedica;
  medicos: AtividadeMedicaMedicoModel[];
}

export interface AtividadeMedicaMedicoModel {
  id: string;
  nome: string;
  crm: string;
}

export interface AtividadeMedicaPacienteModel {
  id: string;
  nome: string;
  email: string;
  telefone: string;
}

export enum TipoAtividadeMedica {
  Consulta = 'Consulta',
  Cirurgia = 'Cirurgia',
}
