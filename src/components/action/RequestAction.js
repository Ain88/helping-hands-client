import axios from "axios";

// For common config
axios.defaults.headers.post["Content-Type"] = "application/json";

const mainAxios = axios.create({
    baseURL: 'https://help-van.herokuapp.com/requests'
});

const customAxios = axios.create({
    baseURL: 'https://help-van.herokuapp.com/enrollments'
});


export {
  mainAxios,
  customAxios
};
