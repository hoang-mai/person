import { forwardRef } from "react";
import styles from "./button.module.css";
import clsx from "clsx";


function Button({logo,icon,iconNav,iconNavFocus,onClick, children },ref) {

  
  return (
      <button ref={ref} onClick={onClick}
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

export default forwardRef(Button);
