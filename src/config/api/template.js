import axios from 'axios'
import {config} from './index'

export const getTemplateListAPI = async (token) => {
    const baseURL = config.API_URL;
    const path = '/api/template/getUserTemplates';
  
    try {
      const headers = {
        Authorization: `Bearer ${token}`,
      };
  
  
      const response = await axios.get(`${baseURL + path}`, { headers});
      console.log(response);
      return { status: response.status, data: response.data };
    } catch (error) {
      console.log(error);
    }
  };

  export const getTemplateDetailsAPI = async (id, token) => {
    const baseURL = config.API_URL;
    const path = '/api/template/getUserTemplates/';
  
    try {
      const headers = {
        Authorization: `Bearer ${token}`,
      };
  
  
      const response = await axios.get(`${baseURL + path + id}`, { headers});
      console.log(response);
      return { status: response.status, data: response.data };
    } catch (error) {
      console.log(error);
    }
  };

  export const createTemplateAPI = async (params, token) => {
    const baseURL = config.API_URL;
    const path = '/api/template/addTemplate';
  
    try {
      const headers = {
        Authorization: `Bearer ${token}`,
      };
  
  
      const response = await axios.post(`${baseURL + path}`, params, { headers});
      console.log(response);
      return { status: response.status, data: response.data };
    } catch (error) {
      console.log(error);
    }
  };

  export const createDocumentTemplateAPI = async (params, token) => {
    const baseURL = config.API_URL;
    const path = '/api/docTemplate/addTemplate';
  
    try {
      const headers = {
        Authorization: `Bearer ${token}`,
      };
  
  
      const response = await axios.post(`${baseURL + path}`, params, { headers});
      console.log(response);
      return { status: response.status, data: response.data };
    } catch (error) {
      console.log(error);
    }
  };

  export const getDocumentTemplateListAPI = async (token) => {
    const baseURL = config.API_URL;
    const path = '/api/docTemplate/getUserTemplates';
  
    try {
      const headers = {
        Authorization: `Bearer ${token}`,
      };
  
  
      const response = await axios.get(`${baseURL + path}`, { headers});
      console.log(response);
      return { status: response.status, data: response.data };
    } catch (error) {
      console.log(error);
    }
  };

  

  export const getDocumentTemplateDetailsAPI = async (orderId, docTemplateId, token) => {
    const baseURL = config.API_URL;
    const path = `/api/order/createDocument/${orderId}/${docTemplateId}`;
    console.log(`${baseURL + path}`)
    try {
      const headers = {
        Authorization: `Bearer ${token}`,
      };
  
  
      const response = await axios.get(`${baseURL + path}`, { headers});
      console.log(response);
      return { status: response.status, data: response.data };
    } catch (error) {
      console.log(error);
    }
  };

  export const getDocumentTemplateDetailsByIdAPI = async (id, token) => {
    const baseURL = config.API_URL;
    const path = `/api/docTemplate/getUserTemplates/${id}`;
    console.log(`${baseURL + path}`)
    try {
      const headers = {
        Authorization: `Bearer ${token}`,
      };
  
  
      const response = await axios.get(`${baseURL + path}`, { headers});
      console.log(response);
      return { status: response.status, data: response.data };
    } catch (error) {
      console.log(error);
    }
  };