import { GetServerSideProps } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FormEvent, useContext } from 'react';
import { EmpresaContext } from '../context/EmpresaContext';

import api from '../service/api';
import GetStatusList from '../service/useGetStatusList';
import styles from './home.module.scss';

// Types
type HomeProps = {
  empresas: Array<Empresa>;
};

export default function Home({ empresas }: HomeProps) {
  const { escolheEmpresa, defineStatus } = useContext(EmpresaContext);
  const router = useRouter();

  const statusList = GetStatusList();

  escolheEmpresa(empresas[0]);
  defineStatus(statusList);

  return (
    <div className={styles.homepage}>
      <section className={styles.header}>
        <h2>Empresas </h2>
        <Link href={'/criarEmpresa'}>
          <button type="button">
            <img src="/create.svg" alt="Criar Empresa" />
          </button>
        </Link>
      </section>
      <section className={styles.empresas}>
        <table cellSpacing={0}>
          <thead>
            <tr>
              <th>id</th>
              <th>Nome</th>
              <th>CNPJ</th>
              <th>Status</th>
              <th>Saude</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {empresas.map((empresa: Empresa) => {
              return (
                <tr key={empresa.id}>
                  <td>{empresa.id}</td>
                  <td className={styles.nomenclatura}>
                    <Link href={`/empresas/${empresa.id}`}>
                      <a>{empresa.nome}</a>
                    </Link>
                  </td>
                  <td>{empresa.cnpj}</td>

                  <td>Não Implementado</td>
                  <td>Não Implementado</td>
                  <td>
                    <button
                      type="button"
                      onClick={async function handleDelete(event: FormEvent) {
                        event.preventDefault();
                        try {
                          await api.delete(`/empresas/${empresa.id}`);

                          alert('Empresa excluido com sucesso!');
                          router.reload();
                        } catch (err) {
                          console.log(err);
                          alert(err.response.data.message);
                        }
                      }}
                    >
                      <img src="/trash.svg" alt="Excluir Empresa" />
                    </button>
                  </td>
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
  const { data } = await api.get('/empresas');

  return {
    props: {
      empresas: data,
    },
  };
};
