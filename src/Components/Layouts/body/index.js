
import styles from "./body.module.css";
import clsx from "clsx";
function Body({children,search,searchHistory}) {
    return ( 
        <div className={clsx(styles.body,{
            [styles.search]: search,
            [styles.searchHistory]: searchHistory
        })}>
            {children}
            </div>
     );
}

export default Body;