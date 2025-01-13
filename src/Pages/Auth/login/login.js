import { Fragment } from "react";

function Login() {
  const handleOnClick = (e) => {
    e.preventDefault();
    console.log("Login");
  };
  return (
    <Fragment>
      <form>
        <legend>Login</legend>
        <ul>
          <li>
            <label htmlFor="account">Tài khoản: </label>
            <input type="text" id="account" name="account" />
          </li>
          <li>
            <label htmlFor="password">Mật khẩu: </label>
            <input type="password" id="password" name="password" />
          </li>
          <li>
            <input type="submit" value="Đăng nhập" onClick={handleOnClick} />
          </li>
        </ul>
      </form>
      <span>Bạn chưa có tài khoản?</span>
    </Fragment>
  );
}

export default Login;
