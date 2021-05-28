import { createContext } from 'react';

type EmpresaContextData = {
  empresa: Empresa;
  statusList: Array<string>;
  loading: boolean;
  escolheEmpresa: (empresa: Empresa) => void;
  defineStatus: (statusList: Array<string>) => void;
};

export const EmpresaContext = createContext({} as EmpresaContextData);
