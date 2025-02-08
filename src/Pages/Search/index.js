import Body from "~/Components/Layouts/body";
import LeftSideBar from "./leftSidebar";
import styles from "./search.module.css";
import { Outlet } from "react-router-dom";
import React from "react";
import clsx from "clsx";
function Search() {
  
  return (
    <Body search>
      <LeftSideBar  />
      <main>
        <div className={clsx(styles.container)}>
          
              <Outlet  />
          
        </div>
      </main>
    </Body>
  );
}

export default Search;
