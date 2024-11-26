import axios from "axios";

// Ensure TypeScript knows about Vite's environment variables
interface ImportMetaEnv {
  readonly VITE_SERVER_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

//const baseURL = "http://127.0.0.1:8000/api"; // Use import.meta.env for Vite
 const baseURL = import.meta.env.VITE_SERVER_URL;  // Use import.meta.env for Vite
export const api = axios.create({
  baseURL,
});
// console.log(baseURL, "baseURL");

let AxiosCreator = axios.create({ baseURL });

AxiosCreator.interceptors.request.use((config) => {
  return config;
});

AxiosCreator.interceptors.response.use(
  (res) => {
    return res;
  },
  (err) => {
    if (err?.response?.status === 401) {
      console.log("401 err : ", err);
    }

    throw err?.response;
  }
);

export default AxiosCreator;
