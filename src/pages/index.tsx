import { GetServerSideProps } from 'next';
import Link from 'next/link';
import { useContext } from 'react';
import { PortalContext } from '../context/PortalContext';

import api from '../service/api';
import GetStatusList from '../service/useGetStatusList';
import styles from './home.module.scss';

// Types
type HomeProps = {
  portais: Array<Portal>;
};

export default function Home({ portais }: HomeProps) {
  const { escolhePortal, defineStatus } = useContext(PortalContext);

  const statusList = GetStatusList();

  escolhePortal(portais[0]);
  defineStatus(statusList);

  return (
    <div className={styles.homepage}>
      <section className={styles.header}>
        <h2>Portais </h2>
        <Link href={'/criarPortal'}>
          <button type="button">
            <img src="/create.svg" alt="Criar Portal" />
          </button>
        </Link>
      </section>
      <section className={styles.portais}>
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
                <tr key={portal.cnpj}>
                  <td className={styles.nomenclatura}>
                    <Link href={`/portais/${portal.nomeBase}`}>
                      <a>{portal.nomenclatura}</a>
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
  const { data } = await api.get('/portais');

  return {
    props: {
      portais: data,
    },
  };
};
