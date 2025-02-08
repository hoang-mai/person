import Login from "~/Pages/Auth/login";
import Register from "~/Pages/Auth/register";
import Friends from "~/Pages/Friends";


import Post from "~/Pages/Search/post";
import People from "~/Pages/Search/people";
import Group from "~/Pages/Search/group";
import SearchHistory from "~/Pages/SearchHistory";
// API public
const publicRouter = [
  { path: "/login", component: Login },

  { path: "/register", component: Register },
];

// API private
const privateRouter = [
  { path: "/friends", component: Friends },
  {path:"/search-history",component: SearchHistory}

];
const searchRouter = [
  {path:"post",component:Post},
  {path:"people",component:People},
  {path:"group",component:Group},
];

export { publicRouter, privateRouter,searchRouter };
