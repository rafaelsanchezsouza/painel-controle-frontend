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

  const [nomeBase, setNomeBase] = useState(empresa.nomeBase);
  const [cnpj, setCnpj] = useState(empresa.cnpj);
  const [nomenclatura, setNomenclatura] = useState(empresa.nomenclatura);
  const [vencimento, setVencimento] = useState(empresa.vencimento);
  const [status, setStatus] = useState(empresa.status);
  const [nomeGestor, setNomeGestor] = useState(empresa.gestor.nome);
  const [emailGestor, setEmailGestor] = useState(empresa.gestor.email);
  const [telefoneGestor, setTelefoneGestor] = useState(empresa.gestor.telefone);
  const [nomeSecretario, setNomeSecretario] = useState(empresa.secretario.nome);
  const [emailSecretario, setEmailSecretario] = useState(
    empresa.secretario.email
  );
  const [telefoneSecretario, setTelefoneSecretario] = useState(
    empresa.secretario.telefone
  );

  function handleCnpj(event: React.ChangeEvent<HTMLInputElement>) {
    const cnpjFormatado = mascaraCnpj(event.target.value);
    setCnpj(cnpjFormatado);
  }

  function handleTelefoneGestor(event: React.ChangeEvent<HTMLInputElement>) {
    const telefoneFormatado = mascaraTelefone(event.target.value);
    setTelefoneGestor(telefoneFormatado);
  }

  function handleTelefoneSecretario(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const telefoneFormatado = mascaraTelefone(event.target.value);
    setTelefoneSecretario(telefoneFormatado);
  }

  function handleData(event: React.ChangeEvent<HTMLInputElement>) {
    const vencimentoFormatado = mascaraData(event.target.value);
    setVencimento(vencimentoFormatado);
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    const empresaData = {
      nomeBase: nomeBase,
      cnpj: cnpj,
      nomenclatura: nomenclatura,
      vencimento: vencimento,
      status: status,
    };

    const gestorData = {
      nomeBase: nomeBase,
      nome: nomeGestor,
      email: emailGestor,
      telefone: telefoneGestor,
    };

    const secretarioData = {
      nomeBase: nomeBase,
      nome: nomeSecretario,
      email: emailSecretario,
      telefone: telefoneSecretario,
    };

    try {
      await api.put(`/empresas/${nomeBase}`, empresaData);
      await api.put(`/${nomeBase}/gestores`, gestorData);
      await api.put(`/${nomeBase}/secretarios`, secretarioData);

      alert('Empresa alterado com sucesso!');
      router.push(`/empresas/${nomeBase}`);
    } catch (err) {
      console.log(err);
      alert(err.response.data.message);
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

          <h3>Dados Gerais</h3>
          <section className={styles.infoGeral}>
            <table>
              <tbody>
                <tr>
                  <td className={styles.destaque}>Nome do Empresa</td>
                  <td>
                    <input
                      type="text"
                      value={nomenclatura}
                      onChange={(event) => setNomenclatura(event.target.value)}
                    />
                  </td>
                </tr>
                <tr>
                  <td className={styles.destaque}>Nome Base</td>
                  <td>{nomeBase}</td>
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
                  <td>
                    <input
                      type="text"
                      value={vencimento}
                      onChange={handleData}
                      maxLength={14}
                    />
                  </td>
                </tr>

                <tr>
                  <td className={styles.destaque}>Status</td>
                  <td>
                    <select
                      key={status}
                      value={status}
                      onChange={(event) => setStatus(event.target.value)}
                    >
                      {statusList.map((option: any) => {
                        return (
                          <option key={option.label} value={option.value}>
                            {option.label}
                          </option>
                        );
                      })}
                    </select>
                  </td>
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
                  <th></th>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <td className={styles.destaque}>Gestor da Folha</td>
                  <td>
                    <input
                      type="text"
                      value={nomeGestor}
                      onChange={(event) => setNomeGestor(event.target.value)}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={telefoneGestor}
                      onChange={handleTelefoneGestor}
                      maxLength={15}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={emailGestor}
                      onChange={(event) => setEmailGestor(event.target.value)}
                    />
                  </td>
                </tr>
                <tr>
                  <td className={styles.destaque}>Secretário da Pasta</td>
                  <td>
                    <input
                      type="text"
                      value={nomeSecretario}
                      onChange={(event) =>
                        setNomeSecretario(event.target.value)
                      }
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={telefoneSecretario}
                      onChange={handleTelefoneSecretario}
                      maxLength={15}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={emailSecretario}
                      onChange={(event) =>
                        setEmailSecretario(event.target.value)
                      }
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </section>
        </form>
      </div>
    );
  } else return <h1>Carregando...</h1>;
}
