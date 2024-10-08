import axios from 'axios'
import {config} from './index'

export const addContanctAPI = async (params) => {
    const baseURL = config.API_URL;
    const path = `/api/user/1/addContact`;

    console.log(params)
  
    try {
      const response = await axios.post(`${baseURL + path}`, params);
      console.log(response);
      return response;
    } catch (error) {
      console.log(error.response);
    }
  };

  export const editContact = async (params) => {
    const baseURL = config.API_URL;
    const path = `/api/user/1/editContact/1`;

    console.log(params)
  
    try {
      const response = await axios.post(`${baseURL + path}`, params);
      console.log(response);
      return response;
    } catch (error) {
      console.log(error.response);
    }
  };