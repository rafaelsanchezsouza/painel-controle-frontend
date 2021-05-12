import { GetServerSideProps } from 'next';
import { useEffect, useState } from 'react';

// Components
import { Header } from '../components/Header';
import { Portal } from '../components/Portal';
import next from 'next';

// Variables
// import getPortais from '../portais.json';

// Types
type HomeProps = {
  portais: Array<Portal>;
};

type Portal = {
  id: string;
  codigo: string;
  nome: string;
};

export default function Home(props: HomeProps) {
  const [portais, setPortais] = useState([]);

  return (
    <>
      <Header></Header>
      {/* {portais.map((portal) => {
        return <Portal portal={portal} />;
      })} */}
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const response = await fetch('http://localhost:3333/portais');
  const data = await response.json();

  return {
    props: {
      episodes: data,
    },
  };
};
