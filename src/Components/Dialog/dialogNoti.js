
import styles from "./dialog.module.css";
import clsx from "clsx";
import React from "react";
function DialogNoti({ onClick} ) {
  const dialogNotiRef = React.useRef(null);
  const isFirstRender = React.useRef(true);
  React.useEffect(() => {
    const handleOnClick=((e)=>{
      
      if( dialogNotiRef.current && !dialogNotiRef.current.contains(e.target) && isFirstRender.current===false){
       
        onClick();
      
      }
      isFirstRender.current=false;
    })
  
  
    document.addEventListener("click", handleOnClick);
    return () => {
      document.removeEventListener("click", handleOnClick);
    };
  }
  , [dialogNotiRef,onClick]);
  return (
    <div ref={dialogNotiRef} className={clsx(styles.dialog)}>
      Dialog
    </div>
  );
}

export default DialogNoti;
