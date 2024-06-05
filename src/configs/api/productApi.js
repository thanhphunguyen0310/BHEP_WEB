import apiClient from "./index";

export const getAllProduct = async (pageIndex, pageSize) => {
    try {
        const response = await apiClient.get(`/ProductService`,{
            params: {
                pageIndex,
                pageSize,
              },
        })
        return response.data.data;
    } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
    }
}