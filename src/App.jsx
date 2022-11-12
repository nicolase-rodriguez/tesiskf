import React, { createContext, useState } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './screens/home';
import MainPlayer from './screens/mainPlayer';
import "./App.css"

export const Context = createContext(null)
const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/mainPlayer',
    element: <MainPlayer />
  }
]);

function App() {
  const [state, setState] = useState({nameNumber: undefined});
  return <Context.Provider  value={{state, setState}}><RouterProvider router={router} /></Context.Provider>;
}

export default App;
