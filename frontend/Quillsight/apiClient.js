import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'hhttps://quillsight.onrender.com', // Replace with your backend URL
  withCredentials: true,
});

export default apiClient;
