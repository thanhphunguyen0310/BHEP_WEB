import apiClient from "./index";

export const makeAppointment = async (
  customerId,
  employeeId,
  date,
  time,
  price,
  description,
  note,
  symptoms
) => {
  try {
    const appointment = await apiClient.post(`/Appointment`, {
      customerId: customerId,
      employeeId: employeeId,
      date: date,
      time: time,
      price: price,
      description: "string",
      note: note,
      symptoms: symptoms,
    });
    return appointment;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getSymptom = async () => {
  try {
    const response = await apiClient.get(`/Symptom`);
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const makePayment = async (userId, price) => {
  try {
    const payment = await apiClient.post(`/Payment`, {
      userId: userId,
      amount: price,
    });
    return payment;
  } catch (error) {
    throw new Error(error.message);
  }
}

export const getPaymentStatus = async (id) => {
  try {
    const response = await apiClient.get(`/Payment/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
}