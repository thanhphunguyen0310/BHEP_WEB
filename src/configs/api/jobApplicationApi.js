import apiClient from "."; "./index.js";

export const getAllJobApplication = async (pageIndex, pageSize) => {
    try {
        const response = await apiClient.get(`/JobApplication`,{
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

export const getJobApplicationById = async (JobApplicationId) => {
    try {
        const response = await apiClient.get(`/JobApplication/${JobApplicationId}`)
        return response.data;
    } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
    }
}

export const updateJobApplicationStatus = async (JobApplicationId, status) => {
    try {
        const response = await apiClient.put(`/JobApplication/${JobApplicationId}/Status`, status)
        return response.data;
    } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
    }
}