import { useState } from 'react';

import '../styles/global.scss';

import { Header } from '../components/Header';
import { PortalContext } from '../context/portalContext';

function MyApp({ Component, pageProps }) {
  const [portalList, setPortalList] = useState([]);
  const [portalIndex, setPortalIndex] = useState(0);

  function escolhePortal(portal) {
    setPortalList([portal]);
    setPortalIndex(0);
  }

  return (
    <PortalContext.Provider value={{ portalList, portalIndex, escolhePortal }}>
      <main>
        <Header />
        <Component {...pageProps} />
      </main>
    </PortalContext.Provider>
  );
}

export default MyApp;
