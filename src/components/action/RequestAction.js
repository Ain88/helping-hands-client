import axios from "axios";

// For common config
axios.defaults.headers.post["Content-Type"] = "application/json";

const mainAxios = axios.create({
    baseURL: 'http://localhost:3000/requests'
});

const customAxios = axios.create({
    baseURL: 'http://localhost:3000/enrollments'
});


export {
  mainAxios,
  customAxios
};
