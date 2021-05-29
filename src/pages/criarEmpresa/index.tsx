import Link from 'next/link';
import { useRouter } from 'next/router';
import { FormEvent, useContext, useState } from 'react';

// API
import api from '../../service/api';
import { EmpresaContext } from '../../context/EmpresaContext';

// Styles
import styles from './styles.module.scss';
import {
  mascaraCnpj,
  mascaraTelefone,
  mascaraData,
} from '../../service/mascaraInput';

export default function CriarEmpresa() {
  const { statusList } = useContext(EmpresaContext);

  const [id, setId] = useState('');
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

  const router = useRouter();

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
      id: id,
      cnpj: cnpj,
      nomenclatura: nomenclatura,
      vencimento: vencimento,
      status: status,
    };

    const gestorData = {
      id: id,
      nome: nomeGestor,
      email: emailGestor,
      telefone: telefoneGestor,
    };

    const secretarioData = {
      id: id,
      nome: nomeSecretario,
      email: emailSecretario,
      telefone: telefoneSecretario,
    };

    try {
      await api.post('/empresas', empresaData);
      await api.post(`/${id}/gestores`, gestorData);
      await api.post(`/${id}/secretarios`, secretarioData);

      alert('Empresa criado com sucesso!');

      router.push('/');
    } catch (err) {
      console.log(err);
      alert(err.response.data.message);
    }
  }

  return (
    <div className={styles.createEmpresa}>
      <form onSubmit={handleSubmit}>
        <section className={styles.header}>
          <h2>Criar Empresa</h2>
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
                <td>
                  <input
                    type="text"
                    value={id}
                    onChange={(event) => setId(event.target.value)}
                  />
                </td>
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
                    onChange={(event) => setNomeSecretario(event.target.value)}
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
                    onChange={(event) => setEmailSecretario(event.target.value)}
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
