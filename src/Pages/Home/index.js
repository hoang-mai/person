import { Fragment } from "react";
import Header from "~/Components/Layouts/header";

function Home() {
    return ( 
        <Fragment>
            <Header index={1}/>
            <h1>Home</h1>
        </Fragment>
     );
}

export default Home;