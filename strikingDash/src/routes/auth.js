import React, { lazy, Suspense } from 'react';
import { Spin } from 'antd';
import { Switch, Route, Redirect } from 'react-router-dom';
import AuthLayout from '../container/profile/authentication/Index';

const Login = lazy(() => import('../container/profile/authentication/overview/SignIn'));
const SignUp = lazy(() => import('../container/profile/authentication/overview/Signup'));
const FbLogin = lazy(() => import('../container/profile/authentication/overview/FbSignIn'));
const FbSignUp = lazy(() => import('../container/profile/authentication/overview/FbSignup'));
const ForgotPass = lazy(() => import('../container/profile/authentication/overview/ForgotPassword'));
const CompanyRegister = lazy(() => import('../container/profile/authentication/overview/CompanyRegister'))

function NotFound() {
  return <Redirect to="/" />;
}

function FrontendRoutes() {
  return (
    <Switch>
      <Suspense
        fallback={
          <div className="spin">
            <Spin />
          </div>
        }
      >
        <Route exact path="/" component={Login} />
        <Route path="/forgotPassword" component={ForgotPass} />
        <Route path="/register" component={SignUp} />
        <Route path="/company-register" component={CompanyRegister} />
        <Route path="/fbRegister" component={FbSignUp} />
        <Route path="/fbSignIn" component={FbLogin} />
        <Route exact path="*" component={NotFound} />
      </Suspense>
    </Switch>
  );
}

export default AuthLayout(FrontendRoutes);
