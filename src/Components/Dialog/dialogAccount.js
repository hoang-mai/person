import styles from "./dialog.module.css";
import clsx from "clsx";
import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { logout } from "~/services/apiEndpoint";
import { post } from "~/services/callApi";
function DialogAccount({ onClick }) {
  const dialogAccountRef = React.useRef(null);
  const isFirstRender = React.useRef(true);
  const navigate = useNavigate();
  const handleOnClick = () => {
    toast.promise(post(logout, {}, true), {
      success: {
        render: () => {
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          navigate("/login");
          return "Đăng xuất thành công";
        },
      },
      error: {
        render: ({data}) => {
          console.log(data)
          if(data.code==="ERR_NETWORK"){
            return "Không thể kết nối với server";
          }
          return "Đăng xuất thất bại";
        },
      },
    });
  };
  React.useEffect(() => {
    const handleOnClickOutSide = (e) => {
      if (
        dialogAccountRef.current &&
        !dialogAccountRef.current.contains(e.target) &&
        isFirstRender.current === false
      ) {
        onClick();
      }
      isFirstRender.current = false;
    };

    document.addEventListener("click", handleOnClickOutSide);
    return () => {
      document.removeEventListener("click", handleOnClickOutSide);
    };
  }, [dialogAccountRef, onClick]);
  return (
    <div
      role="dialog"
      ref={dialogAccountRef}
      className={clsx(styles.dialog, styles.dialogAccount)}
    >
      <ul>
        <li>
          <button>Thông tin cá nhân</button>
        </li>
        <li>
          <button onClick={handleOnClick}>Đăng xuất</button>
        </li>
      </ul>
    </div>
  );
}

export default DialogAccount;
