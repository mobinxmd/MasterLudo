import styles from './centerBox.module.css';

export default function CenterBox() {

    return (
        <div className={styles.center}>
            <div className={styles.center_right}></div>
            <div className={styles.center_top}></div>
            <div className={styles.center_left}></div>
            <div className={styles.center_bottom}></div>
        </div>
    )
}
