// import axios from 'axios';

// // Cấu hình axios instance
// const api = axios.create({
//   baseURL: "https://680fa31e67c5abddd1961651.mockapi.io",
//   timeout: 5000,
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// const api1 = axios.create({
//   baseURL: "https://67fe36003da09811b17817be.mockapi.io/api/v1",
//   timeout: 5000,
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// // API mock
// export const getNews = () => api.get("/News");
// export const getReviews = () => api1.get("/Review");
// export const getAccount = () => api1.get("/Account");
// export const getAccountById = (userId) => api1.get(`/Account/${userId}`);
// export const getBooks = () => api.get("/book");
// export const putData = (endpoint, data) => api.put(endpoint, data);
// export const postData = (endpoint, data) => api.post(endpoint, data);
// export const patchData = (endpoint, data) => api.patch(endpoint, data);

// Api github
export const getChapterContent = async (bookId, chapterNumber) => {
  const githubBaseUrl = 'https://raw.githubusercontent.com/Haophamkha/dataBooks/master/';
  const chapterUrl = `${githubBaseUrl}book${bookId}/chapter${chapterNumber}.txt`;

  try {
    const response = await axios.get(chapterUrl);

    if (response.status === 200) {
      const content = response.data;
      const lines = content.split('\n');
      const titleLine = lines[0].trim();
      const isTitleLine = titleLine.startsWith('# Tên chương:');
      const title = isTitleLine
        ? titleLine.replace('# Tên chương:', '').trim()
        : `Chương ${chapterNumber}`;
      const body = isTitleLine
        ? lines.slice(1).join('\n').trim()
        : content.trim(); 

      return {
        bookId,
        chapterNumber,
        title,
        content: body,
      };
    } else {
      throw new Error("Không thể tải chương sách");
    }
  } catch (error) {
    console.error(error);
    return {
      bookId,
      chapterNumber,
      title: `Chương ${chapterNumber}`,
      content: '',
      error: 'Có lỗi xảy ra khi tải chương sách',
    };
  }
};

export const getChapter = (bookId, chapterNumber) => getChapterContent(bookId, chapterNumber);

// export default api;


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
  export const getBooks = () => api.get("/book");
  export const putData = (endpoint, data) => api.put(endpoint, data);

  export const postData = (endpoint, data) => api.post(endpoint, data);

  export const patchData = (endpoint, data) => api.patch(endpoint, data);
  // Có thể tạo thêm post/put/delete nếu cần
  // export const postSomething = (data) => api.post("/something", data);
  
  export default api;