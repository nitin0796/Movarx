import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import App from "../App";
import Explore from "../pages/Explore";
import DetailsPage from "../pages/DetailsPage";
import Search from "../pages/Search";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: ":explore", element: <Explore /> },
      { path: ":explore/:id", element: <DetailsPage /> },
      { path: "search", element: <Search /> },
    ],
  },
]);

export default router;
