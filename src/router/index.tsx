import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import PrivateRouter from '../components/permissions/PrivateRouter';
import Signin from '../containers/auth/Signin';
import OutputInevtary from '../containers/ouputInventary/OutputInevtary';
import Inventary from '../containers/inventary/Inventary';
import Home from '../page/Home';
import AuditoryList from '../containers/auditory/AuditoryList';
import OutputInevtaryList from '../containers/ouputInventary/OutputInevtaryList';

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
    path: '/auditory/',
    element: <PrivateRouter access={Promise.resolve(true)} element={<AuditoryList />} />
  },
  {
    path: '/output_inventary_List/',
    element: (
      <PrivateRouter access={Promise.resolve(true)} element={<OutputInevtaryList />} />
    )
  }
]);
export default index;
