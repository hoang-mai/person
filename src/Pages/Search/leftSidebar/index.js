import React from "react";
import styles from "./leftSideBar.module.css";
import clsx from "clsx";
import Button from "~/Components/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelopesBulk,
  faNewspaper,
  faPeopleGroup,
  faUserGroup,
} from "@fortawesome/free-solid-svg-icons";

import { useNavigate } from "react-router-dom";
function LeftSideBar() {
  const keyword = new URLSearchParams(window.location.search).get("q");
  
const [focus, setFocus] = React.useState(1);
  
  const navigate=useNavigate();
  const handleOnClickButton = (value) => {
    if (value === focus) {
      return;
    }
    switch (value) {
      case 1:
        navigate(`/search?q=${keyword}`);
        break;
      case 2:
        navigate(`/search/post?q=${keyword}`);
        break;
      case 3:
        navigate(`/search/people?q=${keyword}`);

        break;
      case 4:
        navigate(`/search/group?q=${keyword}`);
        break;
      default:
        break;
    }
    setFocus(value);


  };
  return (
    <aside className={clsx(styles.leftSideBar)}>
      <div>
        <div className={clsx(styles.hearderFilter)}>Kết quả tìm kiếm</div>
      </div>
      <hr />
      <div>
        <div className={clsx(styles.bodyFilter)}>Bộ lọc</div>
        <ul className={clsx(styles.listFilter)}>
          <li className={clsx(styles.itemFilter)}>
            
              <Button
                buttonFilter
                icon
                buttonFilterFocus={1 === focus}
                onClick={()=>handleOnClickButton(1)}
              >
                <Button icon buttonFilterFocus={1 === focus} iconFilter>
                  <FontAwesomeIcon icon={faEnvelopesBulk} />
                </Button>
                Tất cả
              </Button>
            
          </li>
          <li>
            <Button
              buttonFilter
              icon
              buttonFilterFocus={2 === focus}
              onClick={()=>handleOnClickButton(2)}
            >
              <Button icon buttonFilterFocus={2 === focus} iconFilter>
                <FontAwesomeIcon icon={faNewspaper} />
              </Button>
              Bài viết
            </Button>
          </li>
          <li>
            <Button
              buttonFilter
              icon
              buttonFilterFocus={3 === focus}
              onClick={()=>handleOnClickButton(3)}
            >
              <Button icon buttonFilterFocus={3 === focus} iconFilter>
                <FontAwesomeIcon icon={faUserGroup} />
              </Button>
              Mọi người
            </Button>
          </li>
          <li>
            <Button
              buttonFilter
              icon
              buttonFilterFocus={4 === focus}
              onClick={()=>handleOnClickButton(4)}
            >
              <Button icon buttonFilterFocus={4 === focus} iconFilter>
                <FontAwesomeIcon icon={faPeopleGroup} />
              </Button>
              Nhóm
            </Button>
          </li>
        </ul>
      </div>
    </aside>
  );
}

export default LeftSideBar;
