import styles from './innerBox.module.css';

export default function InnerBox({color}) {
    

    return (
        <div className={styles.innerBox} style={{backgroundColor: `${color}`}}>
            <div  className={styles.box}>
            
             </div>
        </div>
    )
}
