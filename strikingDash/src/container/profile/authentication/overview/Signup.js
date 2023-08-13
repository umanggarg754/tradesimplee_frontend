import React, { useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom/cjs/react-router-dom.min';
// import { FacebookOutlined, TwitterOutlined } from '@ant-design/icons';
import { Form, Input, Button } from 'antd';
import toast from 'react-hot-toast';
// import { useDispatch } from 'react-redux';
import { AuthWrapper } from './style';
import { Checkbox } from '../../../../components/checkbox/checkbox';
import Heading from '../../../../components/heading/heading';
import { createUserAPI } from '../../../../config/api/login';
import { toastStyle } from '../../../../utility/helper'
// import { login } from '../../../../redux/authentication/actionCreator';

function SignUp() {
  const history = useHistory();
  // const dispatch = useDispatch();


  const [state, setState] = useState({
    values: null,
    checked: null,
    name : "",
    linkedIN : "",
    email : "",
    phone : "",
    whatsapp : "",
    password : "",
    summary : ""
  });

  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  }
  
  const handleSubmit = (values) => {
    setState({ ...state, values });
  };

  const onChange = (checked) => {
    setState({ ...state, checked });
  };

  return (
    <AuthWrapper>
      <p className="auth-notice">
        Already have an account? <NavLink to="/">Sign In</NavLink>
      </p>
      <div className="auth-contents">
        <Form name="register" onFinish={handleSubmit} layout="vertical">
          <Heading as="h3">
            Sign Up <span className="color-secondary"> </span>
          </Heading>
          <Form.Item label="Name" rules={[{ required: true, message: 'Please input your Full name!' }]}>
            <Input placeholder="Full name" name="name" onChange={handleChange}/>
          </Form.Item>
          <Form.Item
            label="LinkedIN URL"
          >
            <Input placeholder="URL" name="linkedIN" onChange={handleChange}/>
          </Form.Item>
          <Form.Item
            label="Email Address"
            rules={[{ required: true, message: 'Please input your email!', type: 'email' }]}
          >
            <Input placeholder="name@example.com" name="email" onChange={handleChange}/>
          </Form.Item>
          <Form.Item
            label="Phone Number"
            rules={[{ required: true, message: 'Please input your phone number!'}]}
          >
            <Input placeholder="+91- " name="phone" onChange={handleChange}/>
          </Form.Item>
          <Form.Item
            label="WhatsApp Number"
            rules={[{ required: true, message: 'Please input your Whatapp number!'}]}
          >
            <Input placeholder="+91- " name="whatsapp" onChange={handleChange}/>
          </Form.Item>
          <Form.Item
            label="Password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password name="password" placeholder="Password" onChange={handleChange}/>
          </Form.Item>
          <div className="auth-form-action">
            <Checkbox onChange={onChange} checked={state.checked}>
              Creating an account means you’re okay with our Terms of Service and Privacy Policy
            </Checkbox>
          </div>
          <Form.Item>
            <Button className="btn-create" htmlType="submit" type="primary" size="large" onClick={async()=>{
              console.log(state)
              const params = {
                name : state.name,
                linkedin : state.linkedIN,
                email : state.email,
                phone : state.phone,
                whatsapp : state.whatsapp,
                password : state.password,
                summary : state.summary
              }
              const response = await createUserAPI(params)
              console.log(response);
              if(response?.status===200){
                toast.success('SignUp Successfull 🥳',{...toastStyle.success})
                const tokenFromServer = response.data.token;
                localStorage.setItem('loginToken', tokenFromServer);
                // dispatch(login());
                history.push('/company-register');
              }else{
                toast.error('Please try again 😞',{...toastStyle.error})
              }
            }}>
              Create Account
            </Button>
          </Form.Item>
          {/* <p className="form-divider">
            <span>Or</span>
          </p> */}
          {/* <ul className="social-login signin-social">
            <li>
              <a className="google-signup" href="/">
                <img src={require('../../../../static/img/google.png')} alt="" />
                <span>Sign up with Google</span>
              </a>
            </li>
            <li>
              <a className="facebook-sign" href="/">
                <FacebookOutlined />
              </a>
            </li>
            <li>
              <a className="twitter-sign" href="/">
                <TwitterOutlined />
              </a>
            </li>
          </ul> */}
        </Form>
      </div>
    </AuthWrapper>
  );
}

export default SignUp;
