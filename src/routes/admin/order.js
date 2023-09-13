import React, { lazy } from 'react';
import { Switch, Route } from 'react-router-dom';
import { useRouteMatch } from 'react-router-dom/cjs/react-router-dom.min';

const AllOrder = lazy(() => import('../../container/order/Orders'))
const CreateOrder = lazy(() => import('../../container/order/overview/CreateOrder'))
const EditOrder = lazy(() => import('../../container/order/overview/EditOrder'))
const Invoice = lazy(() => import('../../container/order/Invoice'))
const DesignList = lazy(() => import('../../container/order/DesignList'))


function OrdersRoutes() {
  const { path } = useRouteMatch();
  return (
    <Switch>
      <Route path={`${path}/list`} component={AllOrder} />
      <Route path={`${path}/create-orders`} component={CreateOrder} />
      <Route path={`${path}/edit-orders`} component={EditOrder} />
      <Route path={`${path}/invoice`} component={Invoice} />
      <Route path={`${path}/design-list`} component={DesignList} />
    </Switch>
  );
}

export default OrdersRoutes;
