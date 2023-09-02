import axios from 'axios';
import { config } from './index';

export const loginAPI = async (email, password) => {
  const baseURL = config.API_URL;
  const path = `/api/user/login`;

  const params = {
    email,
    password,
  };

  try {
    const response = await axios.post(`${baseURL + path}`, params);
    return { status: response.status, data: response.data };
  } catch (error) {
    console.log(error.response);
  }
};

export const createUserAPI = async (params) => {
  const baseURL = config.API_URL;
  const path = `/api/user/createUser`;

  console.log(params);

  try {
    const response = await axios.post(`${baseURL + path}`, params);
    console.log(response);
    return { status: response.status, data: response.data };
  } catch (error) {
    console.log(error.response);
  }
};

export const createCompanyAPI = async (params, token) => {
  const baseURL = config.API_URL;
  const path = '/api/company/createCompany';


  try {
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    const response = await axios.post(`${baseURL + path}`, params, { headers });
    console.log(response);
    return { status: response.status, data: response.data };
  } catch (error) {
    console.log(error.response);
  }
};