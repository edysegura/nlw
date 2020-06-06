import React from 'react';
import { Route, BrowserRouter } from "react-router-dom";

import LandingPage from './pages/LandingPage';
import CreatePoint from './pages/CreatePoint';


const Routes = () => {
  return (
    <BrowserRouter>
      <Route component={LandingPage} path="/" exact />
      <Route component={CreatePoint} path="/create-point" />
    </BrowserRouter>
  );
}

export default Routes;
