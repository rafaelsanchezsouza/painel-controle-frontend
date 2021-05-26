import Link from 'next/link';
import {
  createContext,
  FormEvent,
  useContext,
  useEffect,
  useState,
} from 'react';

// API
import api from '../../../../service/api';

// Styles
import styles from './styles.module.scss';
import {
  mascaraCnpj,
  mascaraTelefone,
  mascaraData,
} from '../../../../service/mascaraInput';
import { PortalContext } from '../../../../context/PortalContext';

export default function EditarPortal() {
  const { portal, loading } = useContext(PortalContext);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  // const statusList = await GetStatusList();
  const statusList = [
    { label: 'Ativo', value: 'Ativo' },
    { label: 'Inativo', value: 'Inativo' },
    { label: 'Em Alerta', value: 'Em Alerta' },
  ];

  const [nomeBase, setNomeBase] = useState(portal.nomeBase);
  const [cnpj, setCnpj] = useState(portal.cnpj);
  const [nomenclatura, setNomenclatura] = useState(portal.nomenclatura);
  const [vencimento, setVencimento] = useState(portal.vencimento);
  const [status, setStatus] = useState(portal.status);
  const [nomeGestor, setNomeGestor] = useState(portal.gestor.nome);
  const [emailGestor, setEmailGestor] = useState(portal.gestor.email);
  const [telefoneGestor, setTelefoneGestor] = useState(portal.gestor.telefone);
  const [nomeSecretario, setNomeSecretario] = useState(portal.secretario.nome);
  const [emailSecretario, setEmailSecretario] = useState(
    portal.secretario.email
  );
  const [telefoneSecretario, setTelefoneSecretario] = useState(
    portal.secretario.telefone
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

    const portalData = {
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
      alert('Vai Alterar Portal');
      // await api.put('/portais', portalData);
      await api.put(`/${nomeBase}/gestores`, gestorData);
      await api.put(`/${nomeBase}/secretarios`, secretarioData);

      alert('Portal alterado com sucesso!');

      // history.push('/');
    } catch (err) {
      console.log(err);
    }
  }

  if (portal) {
    return (
      <div className={styles.createPortal}>
        <form onSubmit={handleSubmit}>
          <section className={styles.header}>
            <h2>Editar Portal</h2>
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
                  <td className={styles.destaque}>Nome do Portal</td>
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
                      value={status}
                      onChange={(event) => setStatus(event.target.value)}
                    >
                      {statusList.map((option: any) => {
                        return (
                          <option key={option.value} value={option.value}>
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
