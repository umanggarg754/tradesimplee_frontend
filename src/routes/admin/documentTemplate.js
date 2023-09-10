import React, { lazy } from 'react';
import { Switch, Route } from 'react-router-dom';
import { useRouteMatch } from 'react-router-dom/cjs/react-router-dom.min';

const CreateTemplate = lazy(() => import('../../container/documentTemplate/CreateTemplate'))
const ViewTemplate = lazy(() => import('../../container/documentTemplate/ViewTemplate'))

function DocumentTemplate() {
  const { path } = useRouteMatch();
  return (
    <Switch>
      <Route path={`${path}/list`} component={ViewTemplate} />
      <Route path={`${path}/create`} component={CreateTemplate} />
    </Switch>
  );
}

export default DocumentTemplate;
