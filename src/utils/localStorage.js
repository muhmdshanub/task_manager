// utils/localStorage.js
export const setLocalStorage = async (key, value) => {
    return new Promise((resolve) => {
      localStorage.setItem(key, JSON.stringify(value));
      resolve();
    });
  };
  
  export const getLocalStorage = async (key) => {
    return new Promise((resolve) => {
      const value = localStorage.getItem(key);
      resolve(value ? JSON.parse(value) : []);
    });
  };
  