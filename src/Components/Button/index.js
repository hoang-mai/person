
import styles from "./button.module.css";
import clsx from "clsx";


function Button({logo,icon,iconNav,iconNavFocus,onClick, children }) {

  return (
      <button onClick={onClick}
        className={clsx(styles.btn,{
          [styles.logo]: logo,
          [styles.icon]: icon,
          [styles.iconNav]: iconNav,
          [styles.iconNavFocus]: iconNavFocus,
        })}
      >
        {children}
      </button>
     
  );
}

export default Button;
