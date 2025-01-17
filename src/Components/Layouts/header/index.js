import clsx from "clsx";
import logo from "~/assets/images/logo.svg";
import styles from "./hearder.module.css";
import Button from "~/Components/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBell,
  faComment,
  faHome,
  faSearch,
  faUser,
  faUserGroup,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import React from "react";
import {
  DialogChat,
  DialogNoti,
  DialogAccount,
} from "~/Components/Dialog/dialog";

function Header({ index }) {
  const [iconNavFocus, setIconNavFocus] = React.useState(index);
  const [showDialog, setShowDialog] = React.useState(0);
  const btnChatRef = React.useRef(null);
  const btnNotiRef = React.useRef(null);
  const btnAccountRef = React.useRef(null);
  const handleOnClick = (indexButton,btnRef) => {
    if (indexButton === showDialog) {
      btnRef.current.blur();
      return setShowDialog(0);
    } else {
      return setShowDialog(indexButton);
    }
  };


  return (
    <header role="banner" className={clsx(styles.header)}>
      <div className={clsx(styles.logoWrapper)}>
        <Link to="/">
          <Button logo>
            <img src={logo} alt="logo" />
          </Button>
        </Link>
        <div className={clsx(styles.searchWrapper)}>
          <FontAwesomeIcon
            icon={faSearch}
            className={clsx(styles.iconSearch)}
          />
          <input
            type="text"
            className={clsx(styles.search)}
            placeholder="Tìm kiếm"
          />
        </div>
      </div>
      <nav role="navigation" className={clsx(styles.nav)}>
        <div className={clsx(styles.active, styles.childNav)}>
          <Link to="/">
            <Button
              icon
              iconNav
              iconNavFocus={1 === iconNavFocus}
              onClick={() => setIconNavFocus(1)}
            >
              <FontAwesomeIcon icon={faHome} />
            </Button>
          </Link>
          <span className={clsx(styles.toolTip)}>Trang chủ</span>
        </div>
        <div className={clsx(styles.active, styles.childNav)}>
          <Link to="/friends">
            <Button
              icon
              iconNav
              iconNavFocus={2 === iconNavFocus}
              onClick={() => setIconNavFocus(2)}
            >
              <FontAwesomeIcon icon={faUserGroup} />
            </Button>
          </Link>
          <span className={clsx(styles.toolTip)}>Bạn bè</span>
        </div>
      </nav>
      <div className={clsx(styles.userInfo)}>
        <div className={clsx(styles.active, styles.paddingRight)}>
          <Button ref={btnChatRef} icon onClick={()=>handleOnClick(1,btnChatRef)} >
            <FontAwesomeIcon icon={faComment} />
          </Button>
          <span className={clsx(styles.toolTip)}>Tin nhắn</span>
          {showDialog === 1 &&<DialogChat onClick={() => setShowDialog(0)} />}
        </div>

        <div className={clsx(styles.active, styles.paddingRight)}>
          <Button ref={btnNotiRef} icon onClick={()=>handleOnClick(2,btnNotiRef)}>
            <FontAwesomeIcon icon={faBell} />
          </Button>
          <span className={clsx(styles.toolTip)}>Thông báo</span>
          {showDialog === 2 && <DialogNoti onClick={() => setShowDialog(0)} />}
        </div>

        <div className={clsx(styles.active)}>
          <Button icon onClick={()=>handleOnClick(3,btnAccountRef)} ref={btnAccountRef}>
            <FontAwesomeIcon icon={faUser} />
          </Button>
          <span className={clsx(styles.toolTip)}>Tài khoản</span>
          {showDialog === 3 && (
            <DialogAccount onClick={() => setShowDialog(0)} />
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
