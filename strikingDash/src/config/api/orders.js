import axios from 'axios'
import {config} from './index'

export const createOrderAPI = async (params, token) => {
  const baseURL = config.API_URL;
  const path = '/api/order/createOrder';

  try {
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data"
    };


    const response = await axios.post(`${baseURL + path}`, params, { headers});
    console.log(response);
    return { status: response.status, data: response.data };
  } catch (error) {
    console.log(error);
  }
};

export const getOrderListAPI = async (token) => {
  const baseURL = config.API_URL;
  const path = '/api/order/getUserOrders';

  try {
    const headers = {
      Authorization: `Bearer ${token}`
    };


    const response = await axios.get(`${baseURL + path}`, { headers});
    console.log(response);
    return { status: response.status, data: response.data };
  } catch (error) {
    console.log(error);
  }
};

export const getOrderByIdAPI = async (id, token) => {
  const baseURL = config.API_URL;
  const path = '/api/order/getOrder/';

  try {
    const headers = {
      Authorization: `Bearer ${token}`
    };


    const response = await axios.get(`${baseURL + path + id}`, { headers});
    console.log(response);
    return { status: response.status, data: response.data };
  } catch (error) {
    console.log(error);
  }
};

export const editOrderAPI = async (id, params, token) => {
  const baseURL = config.API_URL;
  const path = '/api/order/editOrder/';

  try {
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data"
    };


    const response = await axios.put(`${baseURL + path + id}`, params, { headers});
    console.log(response);
    return { status: response.status, data: response.data };
  } catch (error) {
    console.log(error);
  }
};

export const getProformaDetailsAPI = async (orderNo, token) => {
  const baseURL = config.API_URL;
  const path = '/api/order/createPerforma/';

  try {
    const headers = {
      Authorization: `Bearer ${token}`,
    };


    const response = await axios.get(`${baseURL + path + orderNo}`, { headers});
    console.log(response);
    return { status: response.status, data: response.data };
  } catch (error) {
    console.log(error);
  }
};

export const getDesignListAPI = async (orderNo, token) => {
  const baseURL = config.API_URL;
  const path = '/api/order/createDesignList/';

  try {
    const headers = {
      Authorization: `Bearer ${token}`,
    };


    const response = await axios.get(`${baseURL + path + orderNo}`, { headers});
    console.log(response);
    return { status: response.status, data: response.data };
  } catch (error) {
    console.log(error);
  }
};