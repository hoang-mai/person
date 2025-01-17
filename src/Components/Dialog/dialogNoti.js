import styles from './dialog.module.css';
import clsx from 'clsx';
function DialogNoti() {
    return ( 
        <div className={clsx(styles.dialog)}>Thông báo</div>
     );
}

export default DialogNoti;