import Link from 'next/link';
import { Router, useRouter } from 'next/router';
import { useContext } from 'react';
import format from 'date-fns/format';
import ptBR from 'date-fns/locale/pt-BR';

// API
import api from '../../service/api';
import { GetServerSideProps } from 'next';

import styles from './portais.module.scss';

// Types
type HomeProps = {
  portal: Portal;
};

type Portal = {
  cnpj: string;
  nomeBase: string;
  nomenclatura: string;
  vencimento: string;
  status: string;
  gestor: {
    id: string;
    nome: string;
    email: string;
    telefone: string;
    created_at: Date;
    updated_at: Date;
  };
  secretario: {
    id: string;
    nome: string;
    email: string;
    telefone: string;
    created_at: Date;
    updated_at: Date;
  };
};

function formatDate(date: Date) {
  const formattedDate = format(new Date(date), 'dd/MM/yyyy', {
    locale: ptBR,
  });
  return formattedDate;
}

let nomeBase: string;

export default function Portais({ portal }: HomeProps) {
  const router = useRouter();
  nomeBase = Array.isArray(router.query.nomeBase)
    ? router.query.nomeBase[0]
    : router.query.nomeBase;

  console.log('nomeBase: ');
  console.log(nomeBase);

  console.log('portal: ');
  console.log(portal);

  return (
    <div className={styles.portal}>
      <section className={styles.header}>
        <h2>{portal.nomenclatura}</h2>
        <Link href={'/'}>
          <button type="button">
            <img src="/arrow-left.svg" alt="Voltar" />
          </button>
        </Link>
      </section>

      <h3>Geral</h3>
      <section className={styles.infoGeral}>
        <table>
          <tbody>
            <tr>
              <td className={styles.destaque}>Vencimento do Comodato</td>
              <td>{portal.vencimento}</td>
            </tr>
            <tr>
              <td className={styles.destaque}>CNPJ</td>
              <td>{portal.cnpj}</td>
            </tr>

            <tr>
              <td className={styles.destaque}>Portal</td>
              <td>
                <a href={`https://www.consigsimples.com.br/${portal.nomeBase}`}>
                  {`https://www.consigsimples.com.br/${portal.nomeBase}`}
                </a>
              </td>
            </tr>

            <tr>
              <td className={styles.destaque}>Status</td>
              <td>{portal.status}</td>
            </tr>
          </tbody>
        </table>
      </section>

      <h3>Comercial</h3>
      <section className={styles.infoDepartamento}>
        <table cellSpacing={0}>
          <thead>
            <tr>
              <th></th>
              <th>Nome</th>
              <th>Telefone</th>
              <th>E-mail</th>
              <th>Atualizado</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td className={styles.destaque}>Gestor da Folha</td>
              <td>{portal.gestor.nome}</td>
              <td>{portal.gestor.telefone}</td>
              <td>{portal.gestor.email}</td>
              <td>{formatDate(portal.gestor.updated_at)}</td>
            </tr>
            <tr>
              <td className={styles.destaque}>Secretário da Pasta</td>
              <td>{portal.secretario.nome}</td>
              <td>{portal.secretario.telefone}</td>
              <td>{portal.secretario.email}</td>
              <td>{formatDate(portal.secretario.updated_at)}</td>
            </tr>
          </tbody>
        </table>
      </section>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const { data } = await api.get(`/portais/${nomeBase}`);

  return {
    props: {
      portal: data[0],
    },
  };
};
