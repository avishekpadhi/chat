import axios from "axios";
import axiosInstance from "./axiosInstance";

export const loginUser = async (email, password) => {
  try {
    const response = await axiosInstance.post("/api/auth", {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    console.error("Error during login:", error);
    throw new Error("Invalid email or password");
  }
};

export const registerUser = async (name, email, password) => {
  try {
    const response = await axiosInstance.post("/api/user", {
      name,
      email,
      password,
    });
    return response;
  } catch (error) {
    console.error(error);
  }
};

export const searchUsers = async (searchValue, token) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axiosInstance.get(
      `/api/user?search=${searchValue}`,
      config
    );

    console.log(data);

    return data;
  } catch (error) {
    throw error;
  }
};

export const findOrCreateChat = async (userId, token) => {
  try {
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axiosInstance.post(`/api/chat`, { userId }, config);

    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
