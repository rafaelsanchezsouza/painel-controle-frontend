import Link from 'next/link';
import { useRouter } from 'next/router';

// Dados dos Empresas
import GetEmpresas from '../../../service/useGetEmpresas';

// Styles
import styles from './empresas.module.scss';
import format from 'date-fns/format';
import ptBR from 'date-fns/locale/pt-BR';
import { useContext, useEffect, useState } from 'react';
import { EmpresaContext } from '../../../context/EmpresaContext';

export default function Empresas() {
  const router = useRouter();
  const { escolheEmpresa } = useContext(EmpresaContext);

  const id = Array.isArray(router.query.id)
    ? router.query.id[0]
    : router.query.id;

  const empresa: Empresa = GetEmpresas(id);
  escolheEmpresa(empresa);

  console.debug('Index', empresa);

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

          <div className={styles.dadosGerais}>
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

            <section className={styles.detalhamento}>
              {renderizaUnidades(empresa.unidades)}
              {renderizaUsuarios(empresa.usuarios)}
            </section>
          </div>
        </div>
      );
    } catch (error) {
      console.log(error);
      return <h1>{error}</h1>;
    }
  } else return <h1>Carregando...</h1>;
}

function renderizaUnidades(unidades: Unidade[]) {
  if (unidades.length > 0) {
    return (
      <>
        <h3>Unidades</h3>
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
            {unidades.map((unidade: Unidade) => {
              return (
                <tr key={unidade.id}>
                  <td>{unidade.id}</td>
                  <td>
                    <a href={`/unidades/${unidade.id}`}>{unidade.nome}</a>
                  </td>
                  <td>{unidade.endereco}</td>
                  <td>{unidade.ativos.length}</td>
                  <td>{calculaAtivos(unidade.ativos)}</td>
                  <td>{formatDate(unidade.updated_at)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </>
    );
  } else return <h3>Sem Unidades Cadastradas</h3>;
}
function renderizaUsuarios(usuarios: Usuario[]) {
  if (usuarios.length > 0) {
    return (
      <>
        <h3>Usuários</h3>
        <table cellSpacing={0}>
          <thead>
            <tr>
              <th>id</th>
              <th>Nome</th>
              <th>E-mail</th>
              <th>Telefone</th>
              <th>Departamento</th>
              <th>Ativos</th>
              <th>Status Ativos</th>
              <th>Atualizado em</th>
            </tr>
          </thead>

          <tbody>
            {usuarios.map((usuario: Usuario) => {
              return (
                <tr key={usuario.id}>
                  <td>{usuario.id}</td>
                  <td>
                    <a href={`/usuarios/${usuario.id}`}>{usuario.nome}</a>
                  </td>
                  <td>{usuario.email}</td>
                  <td>{usuario.telefone}</td>
                  <td>{usuario.departamento}</td>
                  <td>{usuario.ativos.length}</td>
                  <td>{calculaAtivos(usuario.ativos)}</td>
                  <td>{formatDate(usuario.updated_at)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </>
    );
  } else return <h3>Sem Usuários Cadastrados</h3>;
}
function calculaAtivos(ativos: Ativo[]) {
  const emParada = ativos.filter((ativo) => ativo.status === 'Em Parada')
    .length;
  const emOperacao = ativos.filter((ativo) => ativo.status === 'Em Operação')
    .length;
  const emAlerta = ativos.filter((ativo) => ativo.status === 'Em Alerta')
    .length;

  const string = `Alerta ${emAlerta} | Parada ${emParada} | Operação ${emOperacao}`;

  return string;
}

function formatDate(date: Date) {
  const formattedDate = format(new Date(date), 'dd/MM/yyyy', {
    locale: ptBR,
  });
  return formattedDate;
}
