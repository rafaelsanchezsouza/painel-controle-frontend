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

      <section className={styles.infoPortal}>
        <table cellSpacing={0}>
          <thead>
            <tr>
              <th>Nomenclatura</th>
              <th>Nome da Base</th>
              <th>CNPJ</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            <tr key={portal.id}>
              <td className={styles.nomenclatura}>dawdawdawdw</td>
              <td>
                <a href={`https://www.consigsimples.com.br/${portal.nomeBase}`}>
                  {portal.nomeBase}
                </a>
              </td>

              <td>{portal.cnpj}</td>
              <td>{portal.status}</td>
            </tr>
          </tbody>
        </table>
      </section>

      <Link href={'/'}>
        <button type="button">
          <img src="/arrow-left.svg" alt="Voltar" />
        </button>
      </Link>
    </div>
  );
}
