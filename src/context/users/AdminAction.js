import axios from "axios";
const BASE_URL = process.env.REACT_APP_BASE_URL;

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

//Creating a city
export const createCity = async (city) => {
  try {
    const res = await axiosInstance.post("/cities", city);
    return res.data;
  } catch (err) {
    console.log(err.response);
    return err.response.data;
  }
};

//Update city
export const updateCity = async (cityId, city) => {
  try {
    const res = await axiosInstance.put(`/cities/${cityId}`, city);
    return res.data;
  } catch (err) {
    console.log(err.response);
    return err.response.data;
  }
};

//Creating a camp
export const createCamp = async (cityId, camp) => {
  try {
    const res = await axiosInstance.post(`/cities/${cityId}/camps`, camp);
    return res.data;
  } catch (err) {
    console.log(err.response);
    return err.response.data;
  }
};

//Editing camp details
export const updateCamp = async (cityId, campId, camp) => {
  try {
    const res = await axiosInstance.put(
      `/cities/${cityId}/camps/${campId}`,
      camp
    );
    return res.data;
  } catch (err) {
    console.log(err.response);
    return err.response.data;
  }
};

//Crating a slot
export const createSlot = async (cityId, campId, slot) => {
  try {
    const res = await axiosInstance.post(
      `/cities/${cityId}/camps/${campId}/slots`,
      slot
    );
    return res.data;
  } catch (err) {
    console.log(err.response);
    return err.response.data;
  }
};

//Getting all requests

export const getRequests = async (slotId) => {
  try {
    const res = await axiosInstance.get(`${slotId}/requests`);
    return res.data;
  } catch (err) {
    console.log(err.response);
    return err.response.data;
  }
};

//Accept Slot

export const acceptRequest = async (slotId, requestId) => {
  try {
    const res = await axiosInstance.delete(`/${slotId}/requests/${requestId}`);
    return res.data;
  } catch (err) {
    console.log(err.response);
    return err.response.data;
  }
};

//Getting stats

export const getStatsInCity = async (cityId) => {
  try {
    const res = await axiosInstance.get(`/cities/${cityId}/stats`);
    return res.data;
  } catch (err) {
    console.log(err.response);
    return err.response.data;
  }
};
