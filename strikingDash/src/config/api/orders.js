import axios from 'axios'
import {config} from './index'

export const createOrderAPI = async (params, token) => {
  const baseURL = config.API_URL;
  const path = '/api/order/createOrder';

  try {
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    console.log(params)

    const response = await axios.post(`${baseURL + path}`, params, { headers });
    console.log(response);
    return { status: response.status, data: response.data };
  } catch (error) {
    console.log(error);
  }
};

  export const editOrders = async (params) => {
    const baseURL = config.API_URL;
    const path = `/api/order/editOrder`;

    console.log(params)
  
    try {
      const response = await axios.post(`${baseURL + path}`, params);
      console.log(response);
      return response;
    } catch (error) {
      console.log(error.response);
    }
  };