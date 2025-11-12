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
