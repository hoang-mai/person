import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import clsx from "clsx";
import styles from "./login.module.css";
import logo from "~/assets/images/logo.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { login } from "~/services/ApiEndpoint";
import { post } from "~/services/callApi";
import { toast } from "react-toastify";


function Login() {
  const [username, setUsername] = useState("");
  const [errorUsername, setErrorUsername] = useState(false);
  const [password, setPassword] = useState("");
  const [errorPassword, setErrorPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const [errorResponse, setErrorResponse] = useState(false);
  const [errorText, setErrorText] = useState(
    "Thông tin tài khoản hoặc nhật khẩu không chính xác1"
  );
  const navigate = useNavigate();
  const handleOnChangeUsername = (event) => {
    const value = event.target.value;
    setUsername(value);
    setErrorResponse(false);
    if (value.length === 0) {
      setErrorUsername(false);
      return;
    }
    if (value.length < 6) {
      setErrorUsername(true);
    } else {
      setErrorUsername(false);
    }
  };
  const handleOnChangePassword = (event) => {
    const value = event.target.value;
    setPassword(value);
    setErrorResponse(false);
    if (value.length === 0) {
      setErrorPassword(false);
      return;
    }
    if (value.length < 6) {
      setErrorPassword(true);
    } else {
      setErrorPassword(false);
    }
  };
  useEffect(() => {
    console.log(username, password);
    if (username.length >= 6 && password.length >= 6) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [username, password]);
  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission logic here
    toast.promise(
      post(login, { username: username, password: password }, false),
      {
        pending: "Đang xử lý, vui lòng đợi...",
        success: {
          render({data}) {
            const response = data;
            
            
            localStorage.setItem("accessToken", response?.data?.data?.accessToken);
            localStorage.setItem("refreshToken", response?.data?.data?.refreshToken);
            navigate("/");
            return "Đăng nhập thành công";
          },
        },
        error: {
          render({ data }) {
            setErrorResponse(true);
            const error = data;
            console.log(error);
            if (error.code === "ERR_NETWORK") {
              setErrorText("Không thể kết nối với server.");
            } else {
              setErrorText(error.response?.data?.message);
            }
            return "Đăng nhập thất bại";
          },
        },
      }
    );
  };

  return (
    <div className={clsx(styles.container)}>
      <form onSubmit={handleSubmit} className={clsx(styles.form)}>
        <img src={logo} alt="logo" className={clsx(styles.logo)} />
        <legend>Đăng nhập</legend>
        <div>
          <div>
            <label htmlFor="username">Tài khoản:</label>
            <input
              id="username"
              className={clsx(styles.input)}
              type="text"
              placeholder="Tài khoản"
              value={username}
              onChange={handleOnChangeUsername}
            />
            <div
              className={clsx(styles.error, {
                [styles.showError]: errorUsername,
              })}
            >
              Tài khoản phải chứa ít nhất 6 ký tự
            </div>
          </div>
          <div>
            <label htmlFor="password">Mật khẩu:</label>
            <div className={clsx(styles.passwordWrapper)}>
              <button
                className={clsx(styles.eyeBtn)}
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <FontAwesomeIcon icon={faEyeSlash} />
                ) : (
                  <FontAwesomeIcon icon={faEye} />
                )}
              </button>
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                className={clsx(styles.input)}
                placeholder="Mật khẩu"
                value={password}
                onChange={handleOnChangePassword}
              />
            </div>
            <div
              className={clsx(styles.error, {
                [styles.showError]: errorPassword,
              })}
            >
              Mật khẩu phải chứa ít nhất 6 ký tự
            </div>
          </div>
          <div
            className={clsx(styles.error, {
              [styles.showError]: errorResponse,
            })}
          >
            {errorText}
          </div>
        </div>

        <button
          type="submit"
          disabled={isDisabled}
          className={clsx(styles.btn)}
        >
          Đăng nhập
        </button>
        <div>
          Bạn chưa có tài khoản?
          <Link to="/register">Đăng ký</Link>
        </div>
      </form>
    </div>
  );
}

export default Login;
