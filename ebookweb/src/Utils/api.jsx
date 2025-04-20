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
  export const getBooks = () => api.get("/books");
  // Có thể tạo thêm post/put/delete nếu cần
  // export const postSomething = (data) => api.post("/something", data);
  
  export default api;
