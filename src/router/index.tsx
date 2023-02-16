import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import PrivateRouter from '../components/permissions/PrivateRouter';
import Signin from '../containers/auth/Signin';
import OutputInevtary from '../containers/ouputInventary/OutputInevtary';
import Inventary from '../containers/inventary/Inventary';
import Home from '../page/Home';
import OutputInevtaryList from '../containers/ouputInventary/OutputInevtaryList';
import Audit from '../containers/audit/Audit';

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
  },
  {
    path: '/output_inventary/',
    element: <PrivateRouter access={Promise.resolve(true)} element={<OutputInevtary />} />
  },
  {
    path: '/output_inventary_List/',
    element: (
      <PrivateRouter access={Promise.resolve(true)} element={<OutputInevtaryList />} />
    )
  },
  {
    path: '/audit',
    element: <PrivateRouter access={Promise.resolve(true)} element={<Audit />} />
  }
]);
export default index;
