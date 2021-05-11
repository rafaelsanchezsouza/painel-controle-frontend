import format from 'date-fns/format';
import ptBR from 'date-fns/locale/pt-BR';
import styles from './styles.module.scss';

export function Header() {
  const currentDate = format(new Date(), 'EEEE, d MMMM', {
    locale: ptBR,
  });

  return (
    <header className={styles.headerContainer}>
      <img src="/logo.png" alt="SP Consig"></img>

      <p>Tecnologia Simples</p>

      <span>{currentDate}</span>
    </header>
  );
}
