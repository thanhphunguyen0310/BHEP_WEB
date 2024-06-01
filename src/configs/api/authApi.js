import apiClient from "./index";

export const loginApi = async (credentials) => {
  const response = await apiClient.post("/Auth/Login", credentials);
  console.log(response.data.data.user);
  return response.data;
};
