import axios from 'axios'
import {config} from './index'

export const createOrders = async (params) => {
    const baseURL = config.API_URL;
    const path = `/api/user/1/createOrder`;

    console.log(params)
  
    try {
      const response = await axios.post(`${baseURL + path}`, params);
      console.log(response);
      return response;
    } catch (error) {
      console.log(error.response);
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