import apiClient from "./index";

export const createOrder = async (
  userId,
  amount,
  isMinus,
  title,
  description,
  isGenerateCode,
  code,
  vouchers,
  serviceId,
  products
) => {
  try {
    const order = await apiClient.post(`/CoinTransaction`, {
      userId: userId,
      amount: amount,
      isMinus: isMinus,
      title: title,
      description: description,
      isGenerateCode: isGenerateCode,
      code: code,
      vouchers: vouchers,
      serviceId: serviceId,
      products: products,
    });
    return order;
  } catch (error) {
    throw new Error(error.message);
  }
};
// admin manage order
export const getAllOrder = async (pageIndex, pageSize) => {
  try {
      const response = await apiClient.get(`/CoinTransaction`,{
          params: {
              pageIndex,
              pageSize,
              Type: 2
            },
      })
      return response.data.data;
  } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
  }
}
// admin manage payments
export const getAllPayment = async (pageIndex, pageSize) => {
  try {
      const response = await apiClient.get(`/CoinTransaction`,{
          params: {
              pageIndex,
              pageSize,
              Type: 3
            },
      })
      return response.data.data;
  } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
  }
}
// admin manage order details
export const getOrderById = async (OrderId) => {
  try {
      const response = await apiClient.get(`/CoinTransaction/${OrderId}`)
      return response.data;
  } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
  }
}