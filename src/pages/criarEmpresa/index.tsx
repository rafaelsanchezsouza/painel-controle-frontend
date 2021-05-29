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
  const [nome, setNome] = useState('');

  const router = useRouter();

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
      await api.post('/empresas', empresaData);

      alert('Empresa criado com sucesso!');

      router.push('/');
    } catch (err) {
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
                      onChange={(event) => setNome(event.target.value)}
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
              </tbody>
            </table>
          </section>
        </div>
      </form>
    </div>
  );
}
