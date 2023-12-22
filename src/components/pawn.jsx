import { FaChessPawn } from 'react-icons/fa';
import styles from './pawn.module.css';

function Pawn({ color, position, scale }) {
    return (
        <div className={`${styles.pawn} ${styles[color]} ${styles[position]}`} style={{transform: scale}}>
            <FaChessPawn />
        </div>
    );
}

export default Pawn;
