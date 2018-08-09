import React from 'react';
import { Switch } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import routes from '../router/routes';
const MainRoute = () => (
  <Switch>
    {renderRoutes(routes)}
  </Switch>
);
export default MainRoute;