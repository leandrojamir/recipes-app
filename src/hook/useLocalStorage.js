import { useState } from 'react';

const useLocalStorage = (key, obj) => {
  const [storageObj, setStorageObj] = useState(() => {
    if (typeof window === 'undefined') {
      return obj;
    }
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : obj;
    } catch (error) {
      console.log(error);
      return obj;
    }
  });

  const salveObj = (value) => {
    const objLocalStorage = value instanceof Function ? value(storageObj) : value;
    setStorageObj(objLocalStorage);
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(key, JSON.stringify(objLocalStorage));
    }
  };
  return [storageObj, salveObj];
};

export default useLocalStorage;
