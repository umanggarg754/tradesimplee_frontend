import React, { Suspense, lazy } from 'react';
import { Spin } from 'antd';
import { Switch, Route, useRouteMatch } from 'react-router-dom';

import Dashboard from './dashboard';
import Orders from './order'
import Template from './template'
import DocumentTemplate from './documentTemplate';
import withAdminLayout from '../../layout/withAdminLayout';

const Contact = lazy(() => import('../../container/contact/Contact'));


const Admin = () => {
  const { path } = useRouteMatch();

  return (
    <Switch>
      <Suspense
        fallback={
          <div className="spin">
            <Spin />
          </div>
        }
      >
        <Route path={path} component={Dashboard} />
        <Route path={`${path}/orders`} component={Orders} />
        <Route path={`${path}/contact/list`} component={Contact} />
        <Route path={`${path}/template`} component={Template} />
        <Route path={`${path}/document-template`} component={DocumentTemplate} />
      </Suspense>
    </Switch>
  );
}

export default withAdminLayout(Admin);
