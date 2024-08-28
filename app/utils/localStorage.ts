// utils/localStorage.ts
export const LOCAL_STORAGE_KEY = "mockProducts";
export const loadFromLocalStorage = () => {
  try {
    const serializedData = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (serializedData === null) {
      return undefined;
    }
    return JSON.parse(serializedData);
  } catch (err) {
    console.error("Could not load from localStorage", err);
    return undefined;
  }
};

export const saveToLocalStorage = (data: any) => {
  try {
    const serializedData = JSON.stringify(data);
    localStorage.setItem(LOCAL_STORAGE_KEY, serializedData);
  } catch (err) {
    console.error("Could not save to localStorage", err);
  }
};
