import React from 'react';
import styles from './loader.module.css';
function LoaderPeople() {
    return ( 
        <div className={styles.skeletonContainer}>
      {/* Avatar */}
      <div className={styles.skeletonAvatar}></div>

      {/* Content */}
      <div className={styles.skeletonContent}>
        <div className={styles.skeletonLine}></div>
        <div className={styles.skeletonLine}></div>
        <div className={styles.skeletonLineShort}></div>
      </div>
    </div>
     );
}

export default LoaderPeople;