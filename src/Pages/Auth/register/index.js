import React, { useEffect, useState } from "react";
import { post } from "~/services/callApi.js";
import { register } from "~/services/ApiEndpoint.js";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import clsx from "clsx";
import styles from "./register.module.css";
import logo from "~/assets/images/logo.svg";

import { toast } from "react-toastify";
function Register() {
  const [username, setUsername] = useState("");

  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [fullname, setFullname] = useState("");
  const [errorUsername, setErrorUsername] = useState(false);
  const [errorPassword, setErrorPassword] = useState(false);
  const [errorConfirmPassword, setErrorConfirmPassword] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const [errorResponse, setErrorResponse] = useState(false);
  const [errorText, setErrorText] = useState("Tài khoản đã tồn tại");
  const navigate = useNavigate();

  const handleOnChangeUsername = (event) => {
    const value = event.target.value;
    setUsername(value);
    setErrorResponse(false);
    if(value.length===0){
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
    if(value.length===0){
      setErrorPassword(false);
      return;
    }
    if (value.length < 6) {
      setErrorPassword(true);
    } else {
      setErrorPassword(false);
    }
  };
  const handleOnChangeConfirmPassword = (event) => {
    const value = event.target.value;
    setConfirmPassword(value);
    if(value.length===0){
      setErrorConfirmPassword(false);
      return;
    }
    if (value !== password) {
      setErrorConfirmPassword(true);
    } else {
      setErrorConfirmPassword(false);
    }
  };
  useEffect(() => {
    console.log(username, password, confirmPassword);
    if (
      username.length >= 6 &&
      password.length >= 6 &&
      confirmPassword === password
    ) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [username, password, confirmPassword]);
  const handleSubmit = (event) => {
    event.preventDefault();
    toast.promise(
      post(
        register,
        {
          username: username,
          password: password,
          fullname: fullname,
        },
        false
      ),
      {
        pending: "Đang xử lý, vui lòng đợi...",
        success: {
          render() {
            navigate("/login"); // Chuyển hướng sau khi đăng ký thành công
            return "Đăng ký thành công!";
          },
        },
        error: {
          render({ data }) {
            const err = data; // Lỗi trả về từ axios
            setErrorResponse(true);
            if (err?.code === "ERR_NETWORK") {
              setErrorText("Không thể kết nối với server.");
            } else {
              setErrorText(err?.response?.data?.message || "Đã xảy ra lỗi!");
            }
            return "Đăng ký thất bại!";
          },
        },
      }
    );
    
  };
  
  return (
    <div className={clsx(styles.container)}>
      <form onSubmit={handleSubmit} className={clsx(styles.form)}>
        <img src={logo} alt="logo" className={clsx(styles.logo)} />
        <legend>Đăng ký</legend>
        <div >
          <div>
            <label htmlFor="fullname">
              Họ và tên<sup>(</sup>
              <sup className={clsx(styles.force)}>*</sup>
              <sup>)</sup>:
            </label>
            <input
              className={clsx(styles.input)}
              id="fullname"
              type="text"
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
              placeholder="Họ và tên"
            />
          </div>
          <div>
            <label htmlFor="username">
              Tài khoản<sup>(</sup>
              <sup className={clsx(styles.force)}>*</sup>
              <sup>)</sup>:
            </label>
            <input
              className={clsx(styles.input)}
              id="username"
              type="text"
              value={username}
              onChange={handleOnChangeUsername}
              placeholder="Tài khoản"
            />
            <div className={clsx(styles.error,{
              [styles.showError]:errorUsername
            })}>Tài khoản phải lớn hơn 6 ký tự</div>
          </div>
          <div>
            <label htmlFor="password">
              Mật khẩu<sup>(</sup>
              <sup className={clsx(styles.force)}>*</sup>
              <sup>)</sup>:
            </label>
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
                className={clsx(styles.input)}
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={handleOnChangePassword}
                placeholder="Mật khẩu"
              />
            </div>
            <div className={clsx(styles.error,{
              [styles.showError]:errorPassword
            })}>Mật khẩu phải lớn hơn 6 ký tự</div>
          </div>
          <div>
            <label htmlFor="confirmPassword">
              Nhập lại mật khẩu<sup>(</sup>
              <sup className={clsx(styles.force)}>*</sup>
              <sup>)</sup>:
            </label>
            <div className={clsx(styles.passwordWrapper)}>
              <button
                className={clsx(styles.eyeBtn)}
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                aria-label={
                  showConfirmPassword ? "Hide password" : "Show password"
                }
              >
                {showConfirmPassword ? (
                  <FontAwesomeIcon icon={faEyeSlash} />
                ) : (
                  <FontAwesomeIcon icon={faEye} />
                )}
              </button>
              <input
                id="confirmPassword"
                className={clsx(styles.input, styles.inputPassword)}
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={handleOnChangeConfirmPassword}
                placeholder="Nhập lại mật khẩu"
              />
            </div>
            <div className={clsx(styles.error,{
              [styles.showError]:errorConfirmPassword
            })}>Mật khẩu không khớp</div>
          </div>
          <div className={clsx(styles.error,{
            [styles.showError]:errorResponse
          })}>{errorText}</div>
        </div>
        <button type="submit" disabled={isDisabled} className={clsx(styles.btn)}>
          Đăng ký
        </button>
        <div>
          Bạn đã có tài khoản?
          <Link to="/login">Đăng nhập</Link>
        </div>
      </form>
    </div>
  );
}

export default Register;
