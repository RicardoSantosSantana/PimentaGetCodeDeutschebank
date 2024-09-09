import { useRouter } from 'next/router';
import styles from '../../styles/Home.module.css';

export default function Returns() {

    const { query } = useRouter();

    return (
        <div className={styles.container}>
            <form>
                <div className={styles.field}>
                    <label class="returnvalue"><span class="returnvalue">CODE :</span> {query?.code} </label>
                    <label class="returnvalue"><span class="returnvalue">STATE:</span> {query?.state} </label>
                </div>
            </form>
        </div>
    )
}