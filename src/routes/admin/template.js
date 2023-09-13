import React, { lazy } from 'react';
import { Switch, Route } from 'react-router-dom';
import { useRouteMatch } from 'react-router-dom/cjs/react-router-dom.min';

const CreateTemplate = lazy(() => import('../../container/template/CreateTemplate'))
const ViewTemplate = lazy(() => import('../../container/template/ViewTemplate'))
const EditOrder = lazy(() => import('../../container/template/EditTemplate'))

function OrdersRoutes() {
  const { path } = useRouteMatch();
  return (
    <Switch>
      <Route path={`${path}/list`} component={ViewTemplate} />
      <Route path={`${path}/create`} component={CreateTemplate} />
      <Route path={`${path}/edit`} component={EditOrder} />
    </Switch>
  );
}

export default OrdersRoutes;
