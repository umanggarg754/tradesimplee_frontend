import React, { useState, useCallback } from 'react';
import {  NavLink, useHistory } from 'react-router-dom';
import { Form, Input, Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
// eslint-disable-next-line import/no-extraneous-dependencies
// import { FacebookOutlined, TwitterOutlined } from '@ant-design/icons';
import { Auth0Lock } from 'auth0-lock';
import toast from 'react-hot-toast';
import { AuthWrapper } from './style';
import { login } from '../../../../redux/authentication/actionCreator';
// import { Checkbox } from '../../../../components/checkbox/checkbox';
import Heading from '../../../../components/heading/heading';
import { auth0options } from '../../../../config/auth0';
import { loginAPI } from '../../../../config/api/login';
import { toastStyle } from '../../../../utility/helper'


const domain = process.env.REACT_APP_AUTH0_DOMAIN;
const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;

function SignIn() {
  const history = useHistory();
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.auth.loading);
  const [form] = Form.useForm();
  const [state, setState] = useState({
    checked: null,
    email : "",
    password : ""
  });

  const lock = new Auth0Lock(clientId, domain, auth0options);

  const handleSubmit = useCallback(async () => {
    console.log(state.email, state.password);
    const response = await loginAPI(state.email, state.password);
    console.log(response);

    dispatch(login());
    history.push('/admin');
  }, [history, dispatch]);

  const onEmailChange = (e) => {
    setState({...state, email : e.target.value});
  }

  const onPasswordChange = (e) => {
    setState({...state, password : e.target.value});
  }

  // const onChange = (checked) => {
  //   setState({ ...state, checked });
  // };

  lock.on('authenticated', authResult => {
    lock.getUserInfo(authResult.accessToken, error => {
      if (error) {
        return;
      }

      handleSubmit();
      lock.hide();
    });
  });

  return (
    <AuthWrapper>
      <p className="auth-notice">
        Don&rsquo;t have an account? <NavLink to="/register">Sign up now</NavLink>
      </p>
      <div className="auth-contents">
        <Form name="login" form={form}
        //  onFinish={handleSubmit} 
         layout="vertical">
          <Heading as="h3">
            Sign in<span className="color-secondary"> </span>
          </Heading>
          <Form.Item
            name="username"
            rules={[{ message: 'Please input your username or Email!', required: true }]}
            // initialValue="name@example.com"
            label="Email Address"
          >
            <Input onChange={onEmailChange} placeholder="Email"/>
          </Form.Item>
          <Form.Item name="password" 
            rules={[{ message: 'Please input your Password!', required: true }]}
          // initialValue="123456"
          label="Password">
            <Input.Password placeholder="Password" onChange={onPasswordChange}/>
          </Form.Item>
          {/* <div className="auth-form-action">
            <Checkbox onChange={onChange} checked={state.checked}>
              Keep me logged in
            </Checkbox>
            <NavLink className="forgot-pass-link" to="/forgotPassword">
              Forgot password?
            </NavLink>
          </div> */}
          <Form.Item>
            <Button className="btn-signin" htmlType="submit" type="primary" size="large" onClick={async ()=>{
              console.log(state.email, state.password);
              const response = await loginAPI(state.email, state.password);
              console.log(response);
              if(response?.status===200){
                toast.success('Login Successfully 🥳',{...toastStyle.success})
                dispatch(login());
                history.push('/admin/contact/list');
              }else{
                toast.error('Invalid Email or Password 😞',{...toastStyle.error})
              }
            }}>
              {isLoading ? 'Loading...' : 'Sign In'}
            </Button>
          </Form.Item>
          {/* <p className="form-divider">
            <span>Or</span>
          </p> */}
          {/* <ul className="social-login">
            <li>
              <Link className="google-signup" to="#">
                <img src={require('../../../../static/img/google.png')} alt="" />
                <span>Sign in with Google</span>
              </Link>
            </li>
            <li>
              <Link className="facebook-sign" to="#">
                <FacebookOutlined />
              </Link>
            </li>
            <li>
              <Link className="twitter-sign" to="#">
                <TwitterOutlined />
              </Link>
            </li>
          </ul> */}
          {/* <div className="auth0-login">
            <Link to="#" onClick={() => lock.show()}>
              Sign In with Auth0
            </Link>
            <Link to="/fbSignIn">Sign In With Firebase</Link>
          </div> */}
        </Form>
      </div>
    </AuthWrapper>
  );
}

export default SignIn;
