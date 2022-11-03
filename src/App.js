import React from "react";
import Home from "./screens/home";
import { createBrowserRouter, RouterProvider, Route } from "react-router-dom";
import MainPlayer from "./screens/mainPlayer";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/mainPlayer",
    element: <MainPlayer />,
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;

