import styles from './dialog.module.css';
import clsx from 'clsx';
function DialogAccount({onClick}) {
    return ( 
        <div onClick={onClick} className={clsx(styles.dialog)} >DialogAccount</div>
     );
}

export default DialogAccount;