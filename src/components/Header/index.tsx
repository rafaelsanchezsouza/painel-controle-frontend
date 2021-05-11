import format from 'date-fns/format';
import styles from './styles.module.scss';

export function Header() {
  return (
    <header className={styles.headerContainer}>
      <img src="/logo.png" alt="SP Consig"></img>

      <p>Tecnologia Simples</p>

      <span>Qui, 8 de Abril</span>
    </header>
  );
}
