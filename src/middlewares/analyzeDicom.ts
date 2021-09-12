import axios, { AxiosRequestConfig } from 'axios';
import httpError from '../errorHandler/httpError/httpError';

const config: AxiosRequestConfig = {
  method: 'post',
  url: '/',
  headers: {
    'Content-Type': 'application/json',
  },
};

const analyseDicom = async (path: Array<string>) => {
  try {
    return await axios({ ...config, data: path });
  } catch (e: any) {
    if (e.response) {
      return httpError(e.response.status, 'analyse dicom response error');
    } else if (e.request) {
      return httpError(400, 'analyse dicom : request error');
    } else {
      return httpError(0, 'Unknown');
    }
  }
};

export default analyseDicom;
