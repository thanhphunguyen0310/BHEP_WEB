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

export const getDevice = async (pageIndex, pageSize) => {
    try {
        const response = await apiClient.get(`/Product`,{
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

export const getService = async (pageIndex, pageSize) => {
    try {
        const response = await apiClient.get(`/Service`,{
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