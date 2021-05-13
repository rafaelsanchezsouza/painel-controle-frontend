import { GetServerSideProps } from 'next';
import { useEffect, useState } from 'react';
import api from '../service/api';
import styles from './home.module.scss';

// Components
import { Portal } from '../components/Portal';

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
                  <td className={styles.nomenclatura}>{portal.nomenclatura}</td>
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
