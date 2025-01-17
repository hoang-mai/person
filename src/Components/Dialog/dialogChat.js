
import styles from "./dialog.module.css";
import clsx from "clsx";
import React from "react";
function DialogChat({ onClick} ) {
  const dialogChatRef = React.useRef(null);
  const isFirstRender = React.useRef(true);
  React.useEffect(() => {
    const handleOnClick=((e)=>{
      
      if( dialogChatRef.current && !dialogChatRef.current.contains(e.target) && isFirstRender.current===false){
       
        onClick();
      
      }
      isFirstRender.current=false;
    })
  
  
    document.addEventListener("click", handleOnClick);
    return () => {
      document.removeEventListener("click", handleOnClick);
    };
  }
  , [dialogChatRef,onClick]);
  return (
    <div ref={dialogChatRef} className={clsx(styles.dialog)}>
      Dialog
    </div>
  );
}

export default DialogChat;
