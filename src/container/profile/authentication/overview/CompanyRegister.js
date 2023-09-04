import React, { useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom/cjs/react-router-dom.min';
// import { FacebookOutlined, TwitterOutlined } from '@ant-design/icons';
import { Form, Input, Button } from 'antd';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { AuthWrapper } from './style';
import { Checkbox } from '../../../../components/checkbox/checkbox';
import Heading from '../../../../components/heading/heading';
import { createCompanyAPI } from '../../../../config/api/login';
import { toastStyle } from '../../../../utility/helper'
import { login } from '../../../../redux/authentication/actionCreator';

function CompanyRegister() {
  const history = useHistory();
  const dispatch = useDispatch();

  const [state, setState] = useState({
    checked: null,
    name : "",
    ic_number : "",
    gst : "",
    pan : "",
    address : "",
    city : "",
    bank_details : ""
  });

  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  }

  const onChange = (checked) => {
    setState({ ...state, checked });
  };

  return (
    <AuthWrapper>
      <p className="auth-notice">
        Already have an account? <NavLink to="/">Sign In</NavLink>
      </p>
      <div className="auth-contents">
        <Form name="register" layout="vertical">
          <Heading as="h3">
            Enter Your Company Details <span className="color-secondary"> </span>
          </Heading>
          <Form.Item label="Name" rules={[{ required: true, message: 'Please input your Full name!' }]}>
            <Input placeholder="Full name" name="name" onChange={handleChange}/>
          </Form.Item>
          <Form.Item
            label="IC Number"
            rules={[{ required: true, message: 'Please input your ic number!'}]}
          >
            <Input name="ic_number" onChange={handleChange}/>
          </Form.Item>
          <Form.Item
            label="GST Number"
            rules={[{ required: true, message: 'Please input your GST number!'}]}
          >
            <Input name="gst" onChange={handleChange}/>
          </Form.Item>
          <Form.Item
            label="PAN Number"
            rules={[{ required: true, message: 'Please input your PAN number!'}]}
          >
            <Input name="pan" onChange={handleChange}/>
          </Form.Item>
          <Form.Item
            label="Address"
            rules={[{ required: true, message: 'Please input your address!'}]}
          >
            <Input name="address" onChange={handleChange}/>
          </Form.Item>
          <Form.Item
            label="City"
            rules={[{ required: true, message: 'Please input your city!'}]}
          >
            <Input name="city" onChange={handleChange}/>
          </Form.Item>
          <Form.Item
            label="Bank Details"
            rules={[{ required: true, message: 'Please input your bank details!'}]}
          >
            <Input name="bank_details" onChange={handleChange}/>
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
                ic_number : state.ic_number,
                gst : state.gst,
                pan : state.pan,
                address : state.address,
                city : state.city,
                bank_details : state.bank_details
              }
              const token = localStorage.getItem("loginToken")
              const response = await createCompanyAPI(params, token)
              console.log(response);
              if(response?.status===201){
                toast.success('SignUp Successfull 🥳',{...toastStyle.success})
                dispatch(login());
                history.push('/admin/contact/list');
              }else{
                toast.error('Please try again 😞',{...toastStyle.error})
              }
            }}>
              Add Company
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

export default CompanyRegister;