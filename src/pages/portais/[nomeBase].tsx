import Link from 'next/link';
import { useRouter } from 'next/router';
import format from 'date-fns/format';
import ptBR from 'date-fns/locale/pt-BR';

// API
import api from '../../service/api';

import styles from './portais.module.scss';
import { useEffect, useState } from 'react';

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

export default function Portais() {
  const [portal, setPortal] = useState<Portal>();
  const router = useRouter();
  const nomeBase = router.query.nomeBase;

  useEffect(() => {
    api.get(`/portais/${nomeBase}`).then((response) => {
      setPortal(response.data[0]);
    });
  }, []);

  if (portal) {
    return (
      <div className={styles.portal}>
        <section className={styles.header}>
          <h2>{portal.nomenclatura}</h2>
          <Link href={'/'}>
            <button type="button">
              <img src="/arrow-left2.svg" alt="Voltar" />
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
                  <a
                    href={`https://www.consigsimples.com.br/${portal.nomeBase}`}
                  >
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
  } else return <h1>Carregando...</h1>;
}
