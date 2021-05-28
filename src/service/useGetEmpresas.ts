import api from './api';
import { useEffect, useState } from 'react';

type Empresa = {
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

export default function GetEmpresas<Empresa>(nomeDaBase: string) {
  const [empresa, setEmpresa] = useState<Empresa>();

  useEffect(() => {
    const request = `/empresas/${nomeDaBase}`;
    api.get(request).then((response) => {
      setEmpresa(response.data[0]);
    });
  }, [nomeDaBase]);

  return empresa;
}
