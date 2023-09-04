import axios from 'axios'
import {config} from './index'

export const getContactAPI = async (token) => {
  const baseURL = config.API_URL;
  const path = '/api/contact/getUserContacts';

  try {
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    const response = await axios.get(`${baseURL + path}`, { headers });
    console.log(response);
    return { status: response.status, data: response.data };
  } catch (error) {
    console.log(error.response);
  }
};


export const addContactAPI = async (params, token) => {
  const baseURL = config.API_URL;
  const path = '/api/contact/addContact';

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


export const editContactAPI = async (id, params, token) => {
  const baseURL = config.API_URL;
  const path = '/api/contact/editContact/';

  try {
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    const response = await axios.put(`${baseURL + path + id}`, params, { headers });
    console.log(response);
    return { status: response.status, data: response.data };
  } catch (error) {
    console.log(error.response);
  }
};