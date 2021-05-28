import Link from 'next/link';
import { useRouter } from 'next/router';

// Dados dos Empresas
import api from '../../../service/api';
import GetEmpresas from '../../../service/useGetEmpresas';

// Styles
import styles from './empresas.module.scss';
import format from 'date-fns/format';
import ptBR from 'date-fns/locale/pt-BR';
import { useContext, useEffect, useState } from 'react';
import { EmpresaContext } from '../../../context/EmpresaContext';

function formatDate(date: Date) {
  const formattedDate = format(new Date(date), 'dd/MM/yyyy', {
    locale: ptBR,
  });
  return formattedDate;
}

function calculaAtivos(ativos: Ativo[]) {
  const [emAlerta, setEmAlerta] = useState(0);
  const [emOperacao, setEmOperacao] = useState(0);
  const [emParada, setEmParada] = useState(0);

  setEmParada[ativos.filter((ativo) => ativo.status === 'Em Parada').length];
  setEmOperacao[
    ativos.filter((ativo) => ativo.status === 'Em Operação').length
  ];
  setEmAlerta[ativos.filter((ativo) => ativo.status === 'Em Alerta').length];

  console.log('emAlerta: ');
  console.log(emAlerta);
  console.log('emOperacao: ');
  console.log(emOperacao);
  console.log('emParada: ');
  console.log(emParada);

  const string = `Alerta:${emAlerta} ; Parada:${emParada} Operação:${emOperacao} `;

  return string;
}

export default function Empresas() {
  const router = useRouter();
  const { escolheEmpresa } = useContext(EmpresaContext);
  const id = Array.isArray(router.query.id)
    ? router.query.id[0]
    : router.query.id;

  const empresa: Empresa = GetEmpresas(id);
  escolheEmpresa(empresa);

  if (empresa) {
    try {
      return (
        <div className={styles.empresa}>
          <section className={styles.header}>
            <h2>Detalhes Empresa: {empresa.nome}</h2>
            <div className={styles.buttons}>
              <Link href={`/empresas/${id}/editarEmpresa`}>
                <button type="button">
                  <img src="/edit.svg" alt="Editar" />
                </button>
              </Link>
              <Link href={'/'}>
                <button type="button">
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
                  <td>{empresa.nome}</td>
                </tr>
                <tr>
                  <td className={styles.destaque}>CNPJ</td>
                  <td>{empresa.cnpj}</td>
                </tr>
                <tr>
                  <td className={styles.destaque}>Vencimento do Contrato</td>
                  <td>Não implementado</td>
                </tr>
                <tr>
                  <td className={styles.destaque}>Status</td>
                  <td>Não Implementado</td>
                </tr>
              </tbody>
            </table>
          </section>

          <h3>Unidades</h3>
          <section className={styles.infoDepartamento}>
            <table cellSpacing={0}>
              <thead>
                <tr>
                  <th>id</th>
                  <th>Nome</th>
                  <th>Endereço</th>
                  <th>Ativos</th>
                  <th>Status Ativos</th>
                  <th>Atualizado em</th>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <td>{empresa.unidade.id}</td>
                  <td>{empresa.unidade.nome}</td>
                  <td>{empresa.unidade.endereco}</td>
                  <td>{empresa.unidade.ativos.length}</td>
                  <td>{calculaAtivos(empresa.unidade.ativos)}</td>
                  <td>{formatDate(empresa.unidade.updated_at)}</td>
                </tr>
              </tbody>
            </table>
          </section>
        </div>
      );
    } catch (error) {
      console.log(error);
      return <h1>{error}</h1>;
    }
  } else return <h1>Carregando...</h1>;
}
