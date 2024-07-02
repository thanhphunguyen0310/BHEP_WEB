import axios from "axios";
import apiClient from "./index";

export const getUserDetail = async (id) => {
  try {
    const response = await apiClient.get(`/User/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

<<<<<<< Updated upstream
// export const updateUserDetail = async (id, formData) => {
//   try {
//     const response = await axios.put(`https://bhepapi.azurewebsites.net/Api/V1/User/${id}`, formData, {
//       headers: {
//         "Content-Type": "multipart/form-data",
//       },
//     });
    export const updateUserDetail = async (id, formData) => {
      try {
        const response = await apiClient.put(`/User/${id}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
    // const response = await axios.put(`https://8b79-103-77-167-61.ngrok-free.app/Api/V1/User/${id}`, formData, {
    //   headers: {
    //     "Content-Type": "multipart/form-data",
    //   },
    // });

=======
export const updateUserDetail = async (id, formData) => {
  try {
    const response = await axios.put(
      `https://bhepapi.azurewebsites.net/Api/V1/User/${id}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
>>>>>>> Stashed changes
    return response.data;
  } catch (error) {
    console.error("Error updating user data:", error);
    throw error;
  }
};
<<<<<<< Updated upstream
=======

// export const updateUserDetail = async (id, formData) => {
//   try {
//     const response = await axios.put(
//       `https://cleanly-divine-pegasus.ngrok-free.app/Api/V1/User/${id}`,
//       formData,
//       {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       }
//     );
//     return response.data;
//   } catch (error) {
//     console.error("Error updating user data:", error);
//     throw error;
//   }
// };

>>>>>>> Stashed changes
