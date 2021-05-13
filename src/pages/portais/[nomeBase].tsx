import Link from 'next/link';
import { useRouter } from 'next/router';
import { useContext } from 'react';

import { PortalContext } from '../../context/portalContext';

import styles from './portais.module.scss';

export default function Portais() {
  const router = useRouter();
  const { portalList, portalIndex } = useContext(PortalContext);

  const portal = portalList[portalIndex];

  return (
    <div className={styles.portal}>
      <h2>{router.query.nomeBase}</h2>

      <h3>{portal.cnpj}</h3>

      <Link href={'/'}>
        <button type="button">
          <img src="/arrow-left.svg" alt="Voltar" />
        </button>
      </Link>
    </div>
  );
}
