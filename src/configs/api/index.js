import axios from 'axios';
// URL dev
const BASE_URL = 'https://bhepapi.azurewebsites.net/Api/V1';
// URL Production
// const BASE_URL = 'https://8b79-103-77-167-61.ngrok-free.app/Api/V1' 

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// export const apiClientFormData = axios.create({
//   baseURL: BASE_URL,
//   headers: {
//     'Content-Type': 'multipart/form-data',
//   },
// });
export default apiClient;
