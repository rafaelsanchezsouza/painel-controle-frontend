import { createContext } from 'react';

type Portal = {
  cnpj: string;
  nomeBase: string;
  nomenclatura: string;
  vencimento: string;
  comercial: {
    gestorFolha: {
      nome: string;
      email: string;
      telefone: string;
    };
    secretarioPasta: {
      nome: string;
      email: string;
      telefone: string;
    };
    dataAtualizacao: string;
  };
  status: {
    geral: string;
  };
};

type PortalContextData = {
  portalList: Portal[];
  portalIndex: number;
  escolhePortal: (portal: Portal) => void;
};

export const PortalContext = createContext({} as PortalContextData);
