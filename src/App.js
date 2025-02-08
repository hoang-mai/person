import { BrowserRouter, Routes, Route } from "react-router-dom";
import { publicRouter, privateRouter, searchRouter } from "~/Routers";
import Home from "~/Pages/Home";
import DefaultLayout from "./Components/Layouts/DefaultLayout";
import Search from "./Pages/Search";
import Top from "./Pages/Search/top";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        {publicRouter.map((route, index) => (
          <Route key={index} path={route.path} element={<route.component />} />
        ))}
        <Route path="/" element={<DefaultLayout />}>
          <Route index element={<Home />} />
          {privateRouter.map((route, index) => (
            <Route
              key={index}
              path={route.path}
              element={<route.component />}
            />
          ))}
          <Route path="/search" element={<Search />}>
            <Route index element={<Top />} />
            {searchRouter.map((route, index) => (
              <Route
                key={index}
                path={route.path}
                element={<route.component />}
              />
            ))}
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
