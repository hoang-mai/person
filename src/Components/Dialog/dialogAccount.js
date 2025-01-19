
import styles from "./dialog.module.css";
import clsx from "clsx";
import React from "react";
import { Link } from "react-router-dom";
function DialogAccount({ onClick} ) {
  const dialogAccountRef = React.useRef(null);
  const isFirstRender = React.useRef(true);
  React.useEffect(() => {
    const handleOnClick=((e)=>{
      
      if( dialogAccountRef.current && !dialogAccountRef.current.contains(e.target) && isFirstRender.current===false){
       
        onClick();
      
      }
      isFirstRender.current=false;
    })
  
  
    document.addEventListener("click", handleOnClick);
    return () => {
      document.removeEventListener("click", handleOnClick);
    };
  }
  , [dialogAccountRef,onClick]);
  return (
    <div role="dialog" ref={dialogAccountRef} className={clsx(styles.dialog,styles.dialogAccount)}>
      <ul>
        <li>
          <button>Thông tin cá nhân</button>
        </li>
        <li>

          <Link to="/login"><button>Đăng xuất</button></Link>
        </li>
      </ul>
    </div>
  );
}

export default DialogAccount;
