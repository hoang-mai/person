import { BrowserRouter, Routes, Route } from "react-router-dom";
import { publicRouter, privateRouter } from "~/Routers";
function App() {
    return (
        <BrowserRouter>
        <Routes>
          {publicRouter.map((route, index) => (
           <Route key={index} path={route.path} element={<route.component />} />
          ))}
          {privateRouter.map((route, index) => (
            <Route key={index} path={route.path} element={<route.component />} />
          ))}
        </Routes>
        </BrowserRouter>
      );
}

export default App;