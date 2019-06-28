import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://mentorme-backend.herokuapp.com/api/v1'
});

instance.interceptors.request.use((config) => {
  const token = localStorage.getItem('jwtToken');
  config.headers.authorization = `${token}`;
  return config;
});

instance.interceptors.response.use(
  response => response,
  (error) => {
      const { response: { status, message } } = error;

      if (status === 401 && message === 'Invalid token supplied') {
          window.location.reload();
      }

      return Promise.reject(error);
  }
);

export default instance;