import api from './api';
import { useEffect, useState } from 'react';

export default function GetEmpresas<Empresa>(id: string) {
  const [empresa, setEmpresa] = useState<Empresa>();

  useEffect(() => {
    const request = `/empresas`;
    api.get(request).then((response) => {
      setEmpresa(response.data[0]);
    });
  }, [id]);

  return empresa;
}
