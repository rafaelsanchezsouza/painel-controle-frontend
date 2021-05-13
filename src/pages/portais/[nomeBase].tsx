import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from './portais.module.scss';

export default function Portais() {
  const router = useRouter();

  return (
    <div className={styles.portal}>
      <h2>{router.query.nomeBase}</h2>

      <Link href={'/'}>
        <button type="button">
          <img src="/arrow-left.svg" alt="Voltar" />
        </button>
      </Link>
    </div>
  );
}
