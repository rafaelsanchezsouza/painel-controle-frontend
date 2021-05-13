import { GetServerSideProps } from 'next';
import Link from 'next/link';
import { useContext } from 'react';
import { PortalContext } from '../context/portalContext';

import api from '../service/api';
import styles from './home.module.scss';

// Types
type HomeProps = {
  portais: Array<Portal>;
};

type Portal = {
  id: string;
  cnpj: string;
  nomeBase: string;
  nomenclatura: string;
  status: string;
};

export default function Home({ portais }: HomeProps) {
  const { escolhePortal } = useContext(PortalContext);
  return (
    <div className={styles.homepage}>
      <section className={styles.portais}>
        <h2>Portais </h2>

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
            {portais.map((portal: Portal) => {
              return (
                <tr key={portal.id}>
                  <td className={styles.nomenclatura}>
                    <Link href={`/portais/${portal.nomeBase}`}>
                      <a onClick={() => escolhePortal(portal)}>
                        {portal.nomenclatura}
                      </a>
                    </Link>
                  </td>
                  <td>
                    <a
                      href={`https://www.consigsimples.com.br/${portal.nomeBase}`}
                    >
                      {portal.nomeBase}
                    </a>
                  </td>

                  <td>{portal.cnpj}</td>
                  <td>{portal.status}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </section>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const { data } = await api.get('portais');

  return {
    props: {
      portais: data,
    },
  };
};
