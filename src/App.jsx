import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './screens/home';
import MainPlayer from './screens/mainPlayer';

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
  return <RouterProvider router={router} />;
}

export default App;
