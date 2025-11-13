//--------------------Listagem------------------------
export interface ListagemMedicosApiResponse {
  sucesso: boolean;
  dados: Dados;
}

export interface Dados {
  quantidadeRegistros: number;
  registros: MedicoModel[];
}

export interface MedicoModel {
  id: string;
  nome: string;
  crm: string;
}
//--------------------Cadastro------------------------
export interface CadastrarMedicoModel {
  nome: string;
  crm: string;
}

export interface CadastrarMedicoResponseModel {
  sucesso: boolean;
  dados: DadosCadastrarMedicoResponse;
}

export interface DadosCadastrarMedicoResponse {
  id: string;
}
//--------------------Editar------------------------
export interface EditarMedicoModel {
  nome: string;
  crm: string;
}
export interface EditarMedicoResponseModel {
  sucesso: boolean;
  dados: DadosEditarMedicoResponse;
}

export interface DadosEditarMedicoResponse {
  id: string;
}
//--------------------Detalhes------------------------
export interface DetalhesMedicoModel {
  sucesso: boolean;
  dados: DadosDetalheMedicoResponse;
}

export interface DadosDetalheMedicoResponse {
  id: string;
  nome: string;
  crm: string;
}
//--------------------Top 10 Medicos------------------------
export interface ListarTop10MedicosModel {
  inicio: Date;
  termino: Date;
}

export interface ListarTop10MedicosResponseModel {
  sucesso: boolean;
  dados: DadosTop10MedicosResponse;
}

export interface DadosTop10MedicosResponse {
  quantidadeRegistros: number;
  registros: RegistrosTop10MedicosResponse;
}

export interface RegistrosTop10MedicosResponse {
  medicoId: string;
  nomeMedico: string;
  totalHorasTrabalhadas: number;
}
