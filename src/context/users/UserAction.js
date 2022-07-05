import axios from "axios";
const BASE_URL = process.env.REACT_APP_BASE_URL;

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

// Login ,register,logout and authentication
export const logoutUser = async () => {
  try {
    const res = await axiosInstance.get("/auth/logout");
    return res.data;
  } catch (err) {
    return { success: false, data: {} };
  }
};

export const loginUser = async (email, password) => {
  try {
    const res = await axiosInstance.post("/auth/login", {
      email: email,
      password: password,
    });
    return res.data;
  } catch (err) {
    console.log(err.response);
    return err.response.data;
  }
};

export const registerUser = async (
  firstName,
  lastName,
  email,
  phone,
  aadhar,
  password
) => {
  try {
    const res = await axiosInstance.post("/auth/register", {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
      phone: phone,
      aadhar: aadhar,
    });
    return res.data;
  } catch (err) {
    console.log(err.response);
    return err.response.data;
  }
};

export const authenticate = async () => {
  try {
    const res = await axiosInstance.get("/auth/authenticate");
    return res.data;
  } catch (err) {
    console.log(err.response);
    return err.response.data;
  }
};

export const getUser = async () => {
  try {
    const res = await axiosInstance.get("/auth/me");
    return res.data;
  } catch (err) {
    console.log(err.response);
    return err.response.data;
  }
};

export const updateUser = async (firstName, lastName, email, phone, aadhar) => {
  try {
    const res = await axiosInstance.put("/auth/me", {
      firstName: firstName,
      lastName: lastName,
      email: email,
      phone: phone,
      aadhar: aadhar,
    });
    return res.data;
  } catch (err) {
    console.log(err.response);
    return err.response.data;
  }
};

//getting all
export const getAll = async (searchTarget) => {
  try {
    const citiesResponse = await axiosInstance.get(
      `/all/cities?sort=name&search=${searchTarget}`
    );
    const campsResponse = await axiosInstance.get(
      `/all/camps?sort=name&search=${searchTarget}`
    );
    return {
      success: true,
      data: { cities: citiesResponse.data, camps: campsResponse.data },
      role: campsResponse.data.role,
    };
  } catch (err) {
    console.log(err.response);
    return err.response.data;
  }
};

//getting cities
export const getCities = async (searchTarget) => {
  try {
    const res = await axiosInstance.get(
      `/cities?sort=name&search=${searchTarget}`
    );
    return res.data;
  } catch (err) {
    console.log(err.response);
    return err.response.data;
  }
};

//getting city
export const getCity = async (id) => {
  try {
    const res = await axiosInstance.get(`/cities/${id}`);
    return res.data;
  } catch (err) {
    console.log(err.response);
    return err.response.data;
  }
};

//getting all the camps in a city
export const getCamps = async (searchTarget, cityId) => {
  try {
    const res = await axiosInstance.get(
      `/cities/${cityId}/camps?sort=name&search=${searchTarget}`
    );
    return res.data;
  } catch (err) {
    console.log(err.response);
    return err.response.data;
  }
};

//getting one camp
export const getCamp = async (cityId, campId) => {
  try {
    const res = await axiosInstance.get(`/cities/${cityId}/camps/${campId}`);
    return res.data;
  } catch (err) {
    console.log(err.response);
    return err.response.data;
  }
};

//getting all slots in the camp
export const getSlots = async (cityId, campId) => {
  try {
    const res = await axiosInstance.get(
      `/cities/${cityId}/camps/${campId}/slots`
    );
    return res.data;
  } catch (err) {
    console.log(err.response);
    return err.response.data;
  }
};

//Booking and slot
export const bookSlot = async (cityId, campId, slotId, userId) => {
  try {
    const res = await axiosInstance.put(
      `/cities/${cityId}/camps/${campId}/slots/${slotId}/book`,
      { userId }
    );
    return res.data;
  } catch (err) {
    console.log(err.response);
    return err.response.data;
  }
};
