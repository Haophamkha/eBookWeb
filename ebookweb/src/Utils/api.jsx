import axios from 'axios';
// Cấu hình axios instance
const api = axios.create({
    // baseURL: "https://ebookstore.free.beeceptor.com", 
    baseURL: "http://localhost:3001",
    timeout: 5000,
    headers: {
      "Content-Type": "application/json",
    },
  });
  

  export const getNews = () => api.get("/news");
  export const getReviews = () => api.get("/reviews");
  export const getAccount = () => api.get("/accounts");
  export const getAccountById = (userId) => api.get(`/accounts/${userId}`);
  export const getBooks = () => api.get("/books");
  export const putData = (endpoint, data) => api.put(endpoint, data);

  export const postData = (endpoint, data) => api.post(endpoint, data);

  export const patchData = (endpoint, data) => api.patch(endpoint, data);
  // Có thể tạo thêm post/put/delete nếu cần
  // export const postSomething = (data) => api.post("/something", data);
  
  export default api;
