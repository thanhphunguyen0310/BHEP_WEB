import apiClient from "./index";

export const getHighRateDoctor = async () => {
  try {
    const response = await apiClient.get("/User/Doctors");
    const doctors = response.data.data.items;
    const highRateDoctors = doctors.filter(doctors => doctors.rate >= 4.5);
    return highRateDoctors
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export const getDoctor = async (pageIndex, pageSize) => {
  try {
    const response = await apiClient.get("/User/Doctors", {
      params: {
        pageIndex,
        pageSize,
      },
    });
    return response.data.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export const getDoctorDetail = async (id) => {
  try {
    const response = await apiClient.get(`/User/${id}`)
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export const getScheduleByDate = async (date) => {
  try {
    const response = await apiClient.get(`/Schedule/date/${date}`);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching schedule:", error);
    throw error;
  }
};

export const createDoctorSchedule = async (employeeId, schedules) => {
  try {
      const schedule = await apiClient.post(`/Schedule`, {
          employeeId: employeeId,
          schedules: schedules
      });
      return schedule;
      } catch (error) {
          throw new Error(error.message);
  }
};

export const getDoctorSchedule = async (employeeId) => {
  try {
      const schedule = await apiClient.get(`/Schedule/employee/${employeeId}`);
      return schedule.data.data.weekSchedule;
  } catch (error) {
      throw new Error(error.message);
  }
}
