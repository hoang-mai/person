import { forwardRef } from "react";
import styles from "./button.module.css";
import clsx from "clsx";

function Button(
  {
    logo,
    iconSearch,
    iconXSearch,
    icon,
    iconNav,
    iconNavFocus,
    onClick,
    buttonFilter,
    buttonFilterFocus,
    iconFilter,
    iconXHistorySearch,
    saveChange,
    disabled,
    iconElipsis,
    children,
  },
  ref
) {
  return (
    <button
      ref={ref}
      onClick={onClick}
      disabled={disabled}
      className={clsx(styles.btn, {
        [styles.logo]: logo,
        [styles.iconSearch]: iconSearch,
        [styles.iconXSearch]: iconXSearch,
        [styles.icon]: icon,
        [styles.iconNav]: iconNav,
        [styles.iconNavFocus]: iconNavFocus,
        [styles.buttonFilter]: buttonFilter,
        [styles.buttonFilterFocus]: buttonFilterFocus,
        [styles.iconFilter]: iconFilter,
        [styles.iconXHistorySearch]: iconXHistorySearch,
        [styles.saveChange]: saveChange,
      })}
    >
      {children}
    </button>
  );
}

export default forwardRef(Button);
