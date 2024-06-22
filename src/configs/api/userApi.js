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