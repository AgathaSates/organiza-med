//--------------------Listagem------------------------
export interface ListagemPacientesApiResponse {
  sucesso: boolean;
  dados: Dados;
}

export interface Dados {
  quantidadeRegistros: number;
  registros: PacienteModel[];
}

export interface PacienteModel {
  id: string;
  nome: string;
  cpf: string;
  email: string;
  telefone: string;
}
//--------------------Cadastro------------------------
export interface CadastrarPacienteModel {
  nome: string;
  cpf: string;
  email: string;
  telefone: string;
}
export interface CadastrarPacienteResponseModel {
  sucesso: boolean;
  dados: DadosCadastrarPacienteResponse;
}

export interface DadosCadastrarPacienteResponse {
  id: string;
}
//--------------------Editar------------------------
export interface EditarPacienteModel {
  nome: string;
  cpf: string;
  email: string;
  telefone: string;
}
export interface EditarPacienteResponseModel {
  sucesso: boolean;
  dados: DadosEditarPacienteResponse;
}

export interface DadosEditarPacienteResponse {
  id: string;
}
//--------------------Detalhes------------------------
export interface DetalhesPacienteModel {
  sucesso: boolean;
  dados: DadosDetalhePacienteResponse;
}

export interface DadosDetalhePacienteResponse {
  id: string;
  nome: string;
  cpf: string;
  email: string;
  telefone: string;
  atividades: AtividadePaciente;
}

export interface AtividadePaciente {
  id: string;
  inicio: string;
  termino: string;
  tipo: TipoAtividadeMedicaEnum;
  medicos: MedicosModel;
}

export interface TipoAtividadeMedicaEnum {
  consulta: string;
  Cirurgia: string;
}

export interface MedicosModel {
  id: string;
  nome: string;
  crm: string;
}
