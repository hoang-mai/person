import Login from "~/Pages/Auth/login";
import Register from "~/Pages/Auth/register";
import Friends from "~/Pages/Friends";
import Home from "~/Pages/Home";
// API public
const publicRouter=[
 {path:"/",component:Home},
 {path:"/login",component:Login},
 {path:"/register",component:Register},
]

// API private
const privateRouter=[
    {path:"/friends",component:Friends}
]

export {publicRouter,privateRouter};