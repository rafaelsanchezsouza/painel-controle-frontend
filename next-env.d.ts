/// <reference types="next" />
/// <reference types="next/types/global" />

type Empresa = {
  id: number;
  nome: string;
  cnpj: string;
  created_at: Date;
  updated_at: Date;
  unidades: [{
    id: number;
    nome: string;
    endereco: string;
    created_at: Date;
    updated_at: Date;
    ativos: [{
      id: number;
      nome: string;
      descricao: string;
      status: string;
      saude: string;
      created_at: Date;
      uptated_at: Date;
      imagemAtivo: { path: string };
    }];
  }];
  usuarios: [{
    id: number;
    nome: string;
    email: string;
    telefone: string;
    departamento: string;
    created_at: Date;
    updated_at: Date;
    ativos: [{
      id: number;
      nome: string;
      descricao: string;
      status: string;
      saude: string;
      created_at: Date;
      uptated_at: Date;
      imagemAtivo: { path: string };
    }];
  }];
};

type Unidade = {
  id: number;
  nome: string;
  endereco: string;
  created_at: Date;
  updated_at: Date;
  ativos: Ativo[];
};

type Usuario = {
  id: number;
  nome: string;
  email: string;
  telefone: string;
  departamento: string;
  created_at: Date;
  updated_at: Date;
  ativos: Ativo[];
};

type Ativo = {
  id: number;
  nome: string;
  descricao: string;
  status: string;
  saude: string;
  created_at: Date;
  uptated_at: Date;
  imagemAtivo: { path: string };
};
