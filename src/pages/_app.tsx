import { useEffect, useState } from 'react';

import '../styles/global.scss';

import { Header } from '../components/Header';

import { EmpresaContext } from '../context/EmpresaContext';

function MyApp({ Component, pageProps }) {
  const [empresa, setEmpresa] = useState<Empresa>();
  const [loading, setLoading] = useState(true);
  const [statusList, setStatusList] = useState<string[]>(['0']);

  useEffect(() => {
    const empresa = localStorage.getItem('empresa');
    const statusList = localStorage.getItem('statusList');
    if (empresa) {
      setEmpresa(JSON.parse(empresa));
    }
    if (statusList) {
      setStatusList(JSON.parse(statusList));
    }
    setLoading(false);
  }, []);

  function defineStatus(statusList: Array<string>) {
    useEffect(() => {
      setStatusList(statusList);
      if (typeof window !== 'undefined' && statusList) {
        localStorage.setItem('statusList', JSON.stringify(statusList));
      }
    });
  }

  function escolheEmpresa(empresa: Empresa) {
    useEffect(() => {
      setEmpresa(empresa);
      if (typeof window !== 'undefined' && empresa) {
        localStorage.setItem('empresa', JSON.stringify(empresa));
      }
    });
  }
  return (
    <EmpresaContext.Provider
      value={{ empresa, statusList, loading, escolheEmpresa, defineStatus }}
    >
      <main>
        <Header />
        <Component {...pageProps} />
      </main>
    </EmpresaContext.Provider>
  );
}

export default MyApp;
