import { useEffect, useState } from 'react';

import '../styles/global.scss';

import { Header } from '../components/Header';

import { PortalContext } from '../context/PortalContext';

function MyApp({ Component, pageProps }) {
  const [portal, setPortal] = useState<Portal>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const portal = localStorage.getItem('portal');

    if (portal) {
      setPortal(JSON.parse(portal));
    }

    setLoading(false);
  }, []);

  function escolhePortal(portal: Portal) {
    useEffect(() => {
      setPortal(portal);
      if (typeof window !== 'undefined' && portal) {
        localStorage.setItem('portal', JSON.stringify(portal));
      }
    });
  }
  return (
    <PortalContext.Provider value={{ portal, escolhePortal, loading }}>
      <main>
        <Header />
        <Component {...pageProps} />
      </main>
    </PortalContext.Provider>
  );
}

export default MyApp;
