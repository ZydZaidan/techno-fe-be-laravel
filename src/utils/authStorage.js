// src/utils/authStorage.js

export const getStoredToken = () => {
  return localStorage.getItem("token") || sessionStorage.getItem("token");
};

export const getStoredUser = () => {
  const user = localStorage.getItem("user") || sessionStorage.getItem("user");
  if (!user) return null;
  try {
    return JSON.parse(user);
  } catch (e) {
    console.error("Gagal parse user storage:", e);
    return null;
  }
};

export const clearAuthStorage = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  sessionStorage.removeItem("token");
  sessionStorage.removeItem("user");
};