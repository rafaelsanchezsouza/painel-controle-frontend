import { useEffect, useState } from 'react';

import styles from './styles.module.scss';

type Portal = {
  id: string;
  codigo: string;
  nome: string;
};

export function Portal(portal: Portal) {
  return (
    <header className={styles.headerContainer}>
      <img src="/logo.png" alt="SP Consig"></img>

      <p>Tecnologia Simples</p>

      <span></span>
    </header>
  );
}
