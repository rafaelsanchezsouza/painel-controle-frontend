import Link from 'next/link';
import { FormEvent, useEffect, useState } from 'react';
import { useRouter } from 'next/router';

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
import GetPortals from '../../../../service/useGetPortal';

export default function EditarPortal() {
  const router = useRouter();
  const nomeBase = Array.isArray(router.query.nomeBase)
    ? router.query.nomeBase[0]
    : router.query.nomeBase;

  console.log('nomeBase: ');
  console.log(nomeBase);

  console.log('Vai Entrar');
  // const portal: Portal = GetPortals(nomeBase);

  const portal = {} as Portal;

  portal.nomenclatura = 'PM de João Pessoa';

  console.log('Saiu');
  console.log('portal: ');
  console.log(portal);

  // const statusList = await GetStatusList();
  const statusList = [
    { label: 'Ativo', value: 'Ativo' },
    { label: 'Inativo', value: 'Inativo' },
    { label: 'Em Alerta', value: 'Em Alerta' },
  ];

  const [cnpj, setCnpj] = useState('');
  const [nomenclatura, setNomenclatura] = useState(portal.nomenclatura);
  const [vencimento, setVencimento] = useState('');
  const [status, setStatus] = useState('');
  const [nomeGestor, setNomeGestor] = useState('');
  const [emailGestor, setEmailGestor] = useState('');
  const [telefoneGestor, setTelefoneGestor] = useState('');
  const [nomeSecretario, setNomeSecretario] = useState('');
  const [emailSecretario, setEmailSecretario] = useState('');
  const [telefoneSecretario, setTelefoneSecretario] = useState('');

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
      await api.post('/portais', portalData);
      await api.post(`/${nomeBase}/gestores`, gestorData);
      await api.post(`/${nomeBase}/secretarios`, secretarioData);

      alert('Portal criado com sucesso!');

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
                {/* <tr>
                  <td className={styles.destaque}>Nome Base</td>
                  <td>{portal.nomeBase}</td>
                </tr>
                <tr>
                  <td className={styles.destaque}>CNPJ</td>
                  <td>
                    <input
                      type="text"
                      value={portal.cnpj}
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
                      value={portal.vencimento}
                      onChange={handleData}
                      maxLength={14}
                    />
                  </td>
                </tr> */}

                {/* <tr>
                  <td className={styles.destaque}>Status</td>
                  <td>
                    <select
                      value={portal.status}
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
                </tr> */}
              </tbody>
            </table>
          </section>

          {/* <h3>Comercial</h3>
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
                      value={portal.gestor.nome}
                      onChange={(event) => setNomeGestor(event.target.value)}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={portal.gestor.telefone}
                      onChange={handleTelefoneGestor}
                      maxLength={15}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={portal.gestor.email}
                      onChange={(event) => setEmailGestor(event.target.value)}
                    />
                  </td>
                </tr>
                <tr>
                  <td className={styles.destaque}>Secretário da Pasta</td>
                  <td>
                    <input
                      type="text"
                      value={portal.secretario.nome}
                      onChange={(event) =>
                        setNomeSecretario(event.target.value)
                      }
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={portal.secretario.telefone}
                      onChange={handleTelefoneSecretario}
                      maxLength={15}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={portal.secretario.email}
                      onChange={(event) =>
                        setEmailSecretario(event.target.value)
                      }
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </section> */}
        </form>
      </div>
    );
  } else return <h1>Carregando...</h1>;
  // return <h1>Carregando...</h1>;
}
