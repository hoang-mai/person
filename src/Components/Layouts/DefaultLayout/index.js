import { Fragment } from "react";
import Header from "../header";
import { Outlet } from "react-router-dom";

function DefaultLayout() {
    return ( 
        <Fragment>
            <Header/>
            <main>
                <Outlet/>
            </main>
        </Fragment>
     );
}

export default DefaultLayout
