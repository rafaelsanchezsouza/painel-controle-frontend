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
              <td>{portal.gestor.updated_at}</td>
            </tr>
            <tr>
              <td className={styles.destaque}>Secretário da Pasta</td>
              <td>{portal.secretario.nome}</td>
              <td>{portal.secretario.telefone}</td>
              <td>{portal.secretario.email}</td>
              <td>{portal.secretario.updated_at}</td>
            </tr>
          </tbody>
        </table>
      </section>
    </div>
  );
}
