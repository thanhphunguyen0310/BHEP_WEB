import axios from 'axios';
// URL dev
const BASE_URL = 'https://bhepapi.azurewebsites.net/Api/V1';
// URL Production
<<<<<<< Updated upstream
// const BASE_URL = 'https://8b79-103-77-167-61.ngrok-free.app/Api/V1' 
=======
// const BASE_URL = 'https://44f6-103-77-167-61.ngrok-free.app/Api/V1' 
// const BASE_URL = 'https://cleanly-divine-pegasus.ngrok-free.app/Api/V1'
>>>>>>> Stashed changes

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
<<<<<<< Updated upstream
=======
    // 'ngrok-skip-browser-warning': 'true',
>>>>>>> Stashed changes
  },
});

// export const apiClientFormData = axios.create({
//   baseURL: BASE_URL,
//   headers: {
//     'Content-Type': 'multipart/form-data',
//   },
// });
export default apiClient;
