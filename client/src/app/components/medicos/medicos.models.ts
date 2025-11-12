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
