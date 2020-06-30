// import Vue from 'vue'
import axios from 'axios'
import {Notify} from 'quasar'

import {MSG_BAD_REQUEST, MSG_INTERNAL_SERVER, MSG_NOT_FOUND} from "src/helpers/messages";

const httpClient = axios.create({
  baseURL: process.env.VUE_APP_BASE_URL,
  timeout: 10000, // indicates, 1000ms ie. 1 second
});

// handle response client
const errorInterceptor = error => {
  // check if it's a server error
  if (!error.response) {
    Notify.create({
      position: 'top',
      color: 'red-5',
      textColor: 'white',
      icon: 'warning',
      message: MSG_INTERNAL_SERVER
    });
    return Promise.reject(error);
  }

  // all the other error responses
  switch (error.response.status) {
    case 400:
      console.error('error: ', error.response.status, error.message);
      Notify.create({
        position: 'top',
        color: 'red-5',
        textColor: 'white',
        icon: 'warning',
        message: MSG_BAD_REQUEST
      });

      break;

    case 404:
      Notify.create({
        position: 'top',
        color: 'red-5',
        textColor: 'white',
        icon: 'warning',
        message: MSG_NOT_FOUND
      });

      break;

    default:
      console.error(error.response.status, error.message);
      Notify.create({
        position: 'top',
        color: 'red-5',
        textColor: 'white',
        icon: 'warning',
        message: MSG_BAD_REQUEST
      });
  }

  return Promise.reject(error);
};

// Interceptor for responses
const responseInterceptor = response => {
  if (response.status === 200) {
    // alert success
  } else {
  }

  return response;
};

httpClient.interceptors.response.use(responseInterceptor, errorInterceptor);

// for use inside Vue files through this.$axios
// Vue.prototype.$axios = httpClient
export {httpClient}

