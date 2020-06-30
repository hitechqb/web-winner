import {httpClient} from 'boot/axios'

const qs = require('querystring');

/* handle post json encode */
function DoPostJson(endpoint, data) {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  return httpClient.post(endpoint, data, config)
}

/* handle post params encode */
function DoPostParam(endpoint, data) {
  const config = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  };

  return httpClient.post(endpoint, qs.stringify(data), config)
}

export {
  DoPostJson, DoPostParam
}
