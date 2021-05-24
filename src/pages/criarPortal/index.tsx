import Link from 'next/link';
import format from 'date-fns/format';
import ptBR from 'date-fns/locale/pt-BR';

// API
import api from '../../service/api';
import { GetServerSideProps } from 'next';

import styles from './styles.module.scss';
import { FormEvent, useState } from 'react';

export default function CriarPortal() {
  const [nomeBase, setNomeBase] = useState('');
  const [cnpj, setCnpj] = useState('');
  const [nomenclatura, setNomenclatura] = useState('');
  const [vencimento, setVencimento] = useState('');
  const [status, setStatus] = useState('');
  const [nomeGestor, setNomeGestor] = useState('');
  const [emailGestor, setEmailGestor] = useState('');
  const [telefoneGestor, setTelefoneGestor] = useState('');
  const [nomeSecretario, setNomeSecretario] = useState('');
  const [emailSecretario, setEmailSecretario] = useState('');
  const [telefoneSecretario, setTelefoneSecretario] = useState('');

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

  return (
    <div className={styles.createPortal}>
      <form onSubmit={handleSubmit}>
        <section className={styles.header}>
          <h2>Criar Portal</h2>
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
                <td className={styles.destaque}>CNPJ</td>
                <td>
                  <input
                    type="text"
                    value={cnpj}
                    onChange={(event) => setCnpj(event.target.value)}
                  />
                </td>
              </tr>
              <tr>
                <td className={styles.destaque}>Vencimento do Comodato</td>
                <td>
                  <input
                    type="text"
                    value={vencimento}
                    onChange={(event) => setVencimento(event.target.value)}
                  />
                </td>
              </tr>

              <tr>
                <td className={styles.destaque}>Portal</td>
                <td>
                  <input
                    type="text"
                    value={nomeBase}
                    onChange={(event) => setNomeBase(event.target.value)}
                  />
                </td>
              </tr>

              <tr>
                <td className={styles.destaque}>Status</td>
                <td>
                  <input
                    type="text"
                    value={status}
                    onChange={(event) => setStatus(event.target.value)}
                  />
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
                    value={emailGestor}
                    onChange={(event) => setEmailGestor(event.target.value)}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={telefoneGestor}
                    onChange={(event) => setTelefoneGestor(event.target.value)}
                  />
                </td>
              </tr>
              <tr>
                <td className={styles.destaque}>Secretário da Pasta</td>
                <td>
                  <input
                    type="text"
                    value={nomeSecretario}
                    onChange={(event) => setNomeSecretario(event.target.value)}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={emailSecretario}
                    onChange={(event) => setEmailSecretario(event.target.value)}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={telefoneSecretario}
                    onChange={(event) =>
                      setTelefoneSecretario(event.target.value)
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
}
