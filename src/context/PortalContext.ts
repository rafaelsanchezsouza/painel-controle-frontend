import { createContext } from 'react';

type Portal = {
  id: string;
  cnpj: string;
  nomeBase: string;
  nomenclatura: string;
  status: string;
};

type PortalContextData = {
  portalList: Portal[];
  portalIndex: number;
  escolhePortal: (portal: Portal) => void;
};

export const PortalContext = createContext({} as PortalContextData);
