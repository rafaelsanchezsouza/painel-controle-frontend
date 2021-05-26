import { useEffect, useState } from 'react';

import '../styles/global.scss';

import { Header } from '../components/Header';

import { PortalContext } from '../context/PortalContext';

function MyApp({ Component, pageProps }) {
  const [portal, setPortal] = useState<Portal>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const portal = localStorage.getItem('portal');

    console.log('portal: ');
    console.log(portal);
    if (portal) {
      console.log('entrou no portal');
      setPortal(JSON.parse(portal));
    }

    setLoading(false);
  }, []);

  function escolhePortal(portal: Portal) {
    setPortal(portal);
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
