import React from 'react';

/* packages */
import axios from 'axios';

const api = axios.create({
  baseURL: `https://api.spotify.com/v1`
});

function onBeforeResponse(response) {
  const { config: { method, url }, data } = response;

  console.groupCollapsed(`%c[api] ${method} ${url}`, `color: #039be5`);
  console.log('data: ', data);
  console.groupEnd();

  return response;
}

function onBeforeResponseError(error) {
  return Promise.reject(error);
}

if (__DEV__) {
  api.interceptors.response.use(onBeforeResponse, onBeforeResponseError);
}

export function useAPI() {
  return api;
}

export default api;
