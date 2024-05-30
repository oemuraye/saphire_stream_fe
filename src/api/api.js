import axios from 'axios';

const API = axios.create({ baseURL: 'https://api.saphirestreamapp.com/api' });

API.interceptors.request.use((req) => {
  const userToken = localStorage.getItem('profile');
  console.log(userToken);
  if (userToken) {
    req.headers.Authorization = `Bearer ${JSON.parse(userToken).access_token}`;
    req.headers["Accept"] = "application/json"; 
  }
  return req;
});

API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // handle token expiration, possibly by redirecting to login page or refreshing token
      console.error('Unauthorized access - possibly due to expired token');
    }
    return Promise.reject(error);
  }
);

export default API;