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
      description: description,
      note: note,
      symptoms: symptoms,
    });
    console.log(appointment.data)
    return appointment.data;
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

export const getAllAppointment = async () => {
  try {
    const response = await apiClient.get(`/Appointment`);
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
}

export const getAppointmentByUserId = async (id) => {
  try {
    const response = await apiClient.get(`/User/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
}

export const getAppointmentById = async (id) => {
  try {
    const response = await apiClient.get(`/Appointment/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
}

export const updateAppointment = async ({id, date, time, price, note, status, symptoms}) => {
  try {
    const response = await apiClient.put(`/Appointment/${id}`,
      {
        id: id,
        date: date,
        time: time,
        price: price,
        note: note,
        status: status,
        symptoms: symptoms
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
}

export const cancelAppointment = async (id) => {
  try {
    const response = await apiClient.delete(`/Appointment/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
}