import { useEffect, useState } from 'react';

// Components
import { Header } from '../components/Header';
import { Portal } from '../components/Portal';
import next from 'next';

// Variables
// import getPortais from '../portais.json';

export default function Home(props) {
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

export async function getServerSideProps() {
  const response = await fetch('http://localhost:3333/portais');
  const data = await response.json();

  return {
    props: {
      episodes: data,
    },
  };
}
