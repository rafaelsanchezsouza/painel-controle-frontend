import { createContext } from 'react';

type Portal = {
  cnpj: string;
  nomeBase: string;
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

type PortalContextData = {
  portalList: Portal[];
  portalIndex: number;
  escolhePortal: (portal: Portal) => void;
};

export const PortalContext = createContext({} as PortalContextData);
