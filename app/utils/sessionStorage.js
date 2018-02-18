const getItem = (key) => {
  return window.sessionStorage.getItem(key);
};

const setItem = (key, value) => {
  window.sessionStorage.setItem(key, value);
};

const removeItem = (key) => {
  window.sessionStorage.removeItem(key);
};

const sessionStorage = {
  getItem,
  setItem,
  removeItem,
};

export default sessionStorage;
