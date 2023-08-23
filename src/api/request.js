import axios from 'axios';

const API_HOST = process.env?.REACT_APP_API_HOST ?? 'https://api.dev.nccuaps.profcoo.com';

export default function request({
  method = 'get',
  baseURL = API_HOST,
  endpoint,
  jwt = true,
  headers = {},
  params,
  data,
  requestType = 'json',
  ...axiosProps
}) {
  const requestHeaders = new Headers();

  if (jwt) {
    const accessToken = localStorage.getItem('APSAccessToken');
    if (accessToken) requestHeaders.set('Authorization', `Bearer ${accessToken}`);
  }

  switch (requestType) {
    case 'json': {
      requestHeaders.set('Accept', 'application/json');
      requestHeaders.set('Content-Type', 'application/json');
      break;
    }
    case 'form-data': {
      requestHeaders.set('Accept', 'application/json');
      requestHeaders.set('Content-Type', 'multipart/form-data');
      break;
    }
    default:
      break;
  }

  Object.entries(headers).forEach(([key, value]) => {
    requestHeaders.set(key, value);
  });

  return axios({
    method,
    baseURL,
    url: endpoint,
    headers: Object.fromEntries(requestHeaders),
    params,
    data,
    ...axiosProps,
  });
}
