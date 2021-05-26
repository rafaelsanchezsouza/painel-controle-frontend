import api from './api';
import { useEffect, useState } from 'react';

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

export default function GetPortals<Portal>(nomeDaBase: string) {
  const [portal, setPortal] = useState<Portal>();

  useEffect(() => {
    const request = `/portais/${nomeDaBase}`;
    api.get(request).then((response) => {
      setPortal(response.data[0]);
    });
  }, [nomeDaBase]);

  return portal;
}
