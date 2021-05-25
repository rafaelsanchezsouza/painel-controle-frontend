/// <reference types="next" />
/// <reference types="next/types/global" />

type Portal = {
  nomeBase: string;
  cnpj: string;
  nomenclatura: string;
  vencimento: string;
  status: string;
  gestor: {
    id: string;
    nome: string;
    email: string;
    telefone: string;
    created_at: Date;
    updated_at: Date;
  };
  secretario: {
    id: string;
    nome: string;
    email: string;
    telefone: string;
    created_at: Date;
    updated_at: Date;
  };
};
