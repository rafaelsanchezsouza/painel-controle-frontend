import { useEffect, useState } from 'react';

import '../styles/global.scss';

import { Header } from '../components/Header';

import { PortalContext } from '../context/PortalContext';

function MyApp({ Component, pageProps }) {
  const [portal, setPortal] = useState<Portal>();
  const [loading, setLoading] = useState(true);
  const [statusList, setStatusList] = useState<string[]>(['0']);

  useEffect(() => {
    const portal = localStorage.getItem('portal');
    const statusList = localStorage.getItem('statusList');
    if (portal) {
      setPortal(JSON.parse(portal));
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

  function escolhePortal(portal: Portal) {
    useEffect(() => {
      setPortal(portal);
      if (typeof window !== 'undefined' && portal) {
        localStorage.setItem('portal', JSON.stringify(portal));
      }
    });
  }
  return (
    <PortalContext.Provider
      value={{ portal, statusList, loading, escolhePortal, defineStatus }}
    >
      <main>
        <Header />
        <Component {...pageProps} />
      </main>
    </PortalContext.Provider>
  );
}

export default MyApp;
