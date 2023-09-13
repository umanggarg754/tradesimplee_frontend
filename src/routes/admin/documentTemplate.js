import React, { lazy } from 'react';
import { Switch, Route } from 'react-router-dom';
import { useRouteMatch } from 'react-router-dom/cjs/react-router-dom.min';

const CreateTemplate = lazy(() => import('../../container/documentTemplate/CreateTemplate'))
const ViewTemplate = lazy(() => import('../../container/documentTemplate/ViewTemplate'))
const EditDocumentTemplate = lazy(() => import('../../container/documentTemplate/EditDocumentTemplate'))

function DocumentTemplate() {
  const { path } = useRouteMatch();
  return (
    <Switch>
      <Route path={`${path}/list`} component={ViewTemplate} />
      <Route path={`${path}/create`} component={CreateTemplate} />
      <Route path={`${path}/edit`} component={EditDocumentTemplate} />
    </Switch>
  );
}

export default DocumentTemplate;
