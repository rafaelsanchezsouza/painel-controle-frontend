import { useRouter } from 'next/router';
import Link from 'next/link';
import { FormEvent, useContext, useState } from 'react';

// API
import api from '../../../../service/api';
import GetStatusList from '../../../../service/useGetStatusList';

// Styles
import styles from './styles.module.scss';
import {
  mascaraCnpj,
  mascaraTelefone,
  mascaraData,
} from '../../../../service/mascaraInput';
import { EmpresaContext } from '../../../../context/EmpresaContext';

export default function EditarEmpresa() {
  const { empresa, loading, statusList } = useContext(EmpresaContext);
  const router = useRouter();

  if (loading) {
    return <h1>Carregando...</h1>;
  }

  const [id, setId] = useState(empresa.id);
  const [cnpj, setCnpj] = useState(empresa.cnpj);
  const [nome, setNomenclatura] = useState(empresa.nome);
  // const [vencimento, setVencimento] = useState(empresa.vencimento);
  // const [status, setStatus] = useState(empresa.status);

  function handleCnpj(event: React.ChangeEvent<HTMLInputElement>) {
    const cnpjFormatado = mascaraCnpj(event.target.value);
    setCnpj(cnpjFormatado);
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    const empresaData = {
      id: id,
      cnpj: cnpj,
      nome: nome,
    };

    try {
      await api.put(`/empresas/${id}`, empresaData);
      if (typeof window !== 'undefined') {
        alert('Empresa alterada com sucesso!');
      }
      router.push(`/empresas/${id}`);
    } catch (err) {
      console.log(err);
      if (typeof window !== 'undefined') {
        alert(err.response.data.message);
      }
    }
  }

  if (empresa) {
    return (
      <div className={styles.createEmpresa}>
        <form onSubmit={handleSubmit}>
          <section className={styles.header}>
            <h2>Editar Empresa</h2>
            <div className={styles.buttons}>
              <button type="submit" className={styles.submitButton}>
                Enviar
              </button>
              <Link href={'/'}>
                <button>
                  <img src="/arrow-left.svg" alt="Voltar" />
                </button>
              </Link>
            </div>
          </section>

          <div className={styles.dadosGerais}>
            <h3>Dados Gerais</h3>
            <section className={styles.infoGeral}>
              <table>
                <tbody>
                  <tr>
                    <td className={styles.destaque}>Nome do Empresa</td>
                    <td>
                      <input
                        type="text"
                        value={nome}
                        onChange={(event) =>
                          setNomenclatura(event.target.value)
                        }
                      />
                    </td>
                  </tr>
                  <tr>
                    <td className={styles.destaque}>ID</td>
                    <td>{id}</td>
                  </tr>
                  <tr>
                    <td className={styles.destaque}>CNPJ</td>
                    <td>
                      <input
                        type="text"
                        value={cnpj}
                        onChange={handleCnpj}
                        maxLength={18}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td className={styles.destaque}>Vencimento do Comodato</td>
                    <td>Sem implementação</td>
                  </tr>

                  <tr>
                    <td className={styles.destaque}>Status</td>
                    <td>Sem implementação</td>
                  </tr>
                </tbody>
              </table>
            </section>
          </div>
        </form>
      </div>
    );
  } else return <h1>Carregando...</h1>;
}
