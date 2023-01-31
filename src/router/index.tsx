import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import PrivateRouter from '../components/permissions/PrivateRouter';
import Signin from '../containers/auth/Signin';
import Inventary from '../containers/inventary/Inventary';
import Home from '../page/Home';

const index = createBrowserRouter([
  {
    path: '/',
    element: <Signin />
  },
  {
    path: '/home',
    element: <PrivateRouter access={Promise.resolve(true)} element={<Home />} />
  },
  {
    path: '/inventary/',
    element: <PrivateRouter access={Promise.resolve(true)} element={<Inventary />} />
  }
]);
export default index;
