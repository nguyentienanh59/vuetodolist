/* eslint-disable class-methods-use-this */
import Axios from 'axios';
import ToastUtil from 'utilities/toast';
import { useAuthStore } from 'stores/auth-store';
import { useAppStore } from 'stores/app-store';

// merge params to axios config
function mergeAxiosConfig(data, config) {
  const axiosConfig = Object.assign(config || {}, {
    params: data,
  });
  return axiosConfig;
}

export default class RestClient {
  #client;

  #version;

  #servicePath;

  constructor(servicePath, version = 'v1') {
    this.client = this.createAxiosClient();
    this.version = version;
    this.servicePath = servicePath;
  }

  createAxiosClient() {
    const axiosInstance = Axios.create({
      baseURL: process.env.API_URL,
      headers: {
        'Content-type': 'application/json',
      },
      withCredentials: false,
    });

    axiosInstance.interceptors.request.use(this.onRequest, this.onRequestError);

    return axiosInstance;
  }

  onRequest = async (config) => {
    // await this.extendTokenValidityPeriod();
    // TODO tạm thời dùng token lưu trong store
    const auth = useAuthStore();

    if (config.headers) {
      config.headers.Authorization = `Bearer ${auth.token}`;
    }

    // do something here before request
    return config;
  };

  onRequestError(error) {
    return Promise.reject(error);
  }

  async extendTokenValidityPeriod() {
    // extend token here
  }

  request(method, url, data, config) {
    const app = useAppStore();

    return new Promise((resolve, reject) => {
      // show loading
      app.setLoading(true);
      const axiosConfig = Object.assign(config, {
        url: `${this.version}${this.servicePath}${url}`,
        method,
        data,
      });
      this.client.request(axiosConfig).then((response) => {
        const result = response.data;
        if (result.code === 401) {
          const auth = useAuthStore();
          auth.signOut();
        }

        if (result.code !== 0) {
          ToastUtil.error(result.message);
          reject(result);
        }

        resolve(result);
      })
        .catch((error) => {
          if (Axios.isAxiosError(error)) {
            if (error.response) {
              // The request was made and the server responded with a status code
              // that falls out of the range of 2xx
              if (error.response.data) {
                // error data from server
                const serviceErrorResponse = error.response.data;
                reject(serviceErrorResponse);
              } else {
                reject(error);
              }
            } else if (error.request) {
              // The request was made but no response was received
              // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
              // http.ClientRequest in node.js
              reject(error);
            } else {
              // Something happened in setting up the request that triggered an Error
              reject(error);
            }
          } else {
            reject(error);
          }
          // ToastUtil.exception(error);
        }).finally(() => {
          // hide loading
          app.setLoading(false);
        });
    });
  }

  get(url, data, config) {
    // merge params to axios config
    const axiosConfig = mergeAxiosConfig(data, config);
    return this.request('GET', url, null, axiosConfig);
  }

  post(url, data, config) {
    // merge params to axios config
    const axiosConfig = mergeAxiosConfig(data, config);
    delete axiosConfig.params;
    return this.request('POST', url, data, axiosConfig);
  }

  put(url, data, config) {
    // merge params to axios config
    const axiosConfig = mergeAxiosConfig(data, config);
    delete axiosConfig.params;
    return this.request('PUT', url, data, axiosConfig);
  }

  delete(url, data, config) {
    // merge params to axios config
    const axiosConfig = mergeAxiosConfig(data, config);
    delete axiosConfig.params;
    return this.request('DELETE', url, data, axiosConfig);
  }
}
