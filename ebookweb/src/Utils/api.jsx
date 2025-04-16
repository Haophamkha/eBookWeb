import axios from 'axios';
// Cấu hình axios instance
const api = axios.create({
    baseURL: "https://ebookstore.free.beeceptor.com", 
    timeout: 5000,
    headers: {
      "Content-Type": "application/json",
    },
  });
  

  export const getNews = () => api.get("/news");
  export const getReviews = () => api.get("/review");
  export const getAccount = () => api.get("/account");
  
  // Có thể tạo thêm post/put/delete nếu cần
  // export const postSomething = (data) => api.post("/something", data);
  
  export default api;
