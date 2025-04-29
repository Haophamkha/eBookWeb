import axios from 'axios';

// Cấu hình axios instance
const api = axios.create({
  baseURL: "https://680fa31e67c5abddd1961651.mockapi.io",
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

const api1 = axios.create({
  baseURL: "https://67fe36003da09811b17817be.mockapi.io/api/v1",
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: false,
});

export const getNews = () => api.get("/News");
export const getReviews = () => api1.get("/Review");
export const getAccount = () => api1.get("/Account");
export const getAccountById = (userId) => api1.get(`/Account/${userId}`);
export const getBooks = () => api.get("/book");


// Hàm lấy giỏ hàng từ API và sau đó lấy thông tin chi tiết của các sách
export const getCartItemsFromAPI = async (userId) => {
  try {
    // Gọi API lấy thông tin tài khoản của người dùng
    const response = await api1.get(`/Account/${userId}`);
    
    if (response.status === 200) {
      // Lấy giỏ hàng từ thông tin tài khoản
      const cartItems = response.data.cart || [];  // Giả sử "cart" là trường chứa giỏ hàng của người dùng
      
      if (cartItems.length === 0) {
        console.log("Giỏ hàng trống.");
        return { data: [] };
      }
      
      // Lấy thông tin chi tiết của từng cuốn sách trong giỏ hàng
      const booksDetails = await Promise.all(cartItems.map((bookId) => getBookDetails(bookId)));
      
      // Lọc các sách có thông tin hợp lệ
      const validBooks = booksDetails.filter((book) => book !== null);
      
      return { data: validBooks };  // Trả về thông tin sách
    } else {
      console.error("Không thể lấy thông tin tài khoản");
      return { data: [] }; // Trả về giỏ hàng rỗng nếu có lỗi
    }
  } catch (error) {
    console.error("Lỗi khi lấy giỏ hàng từ API:", error);
    return { data: [] }; // Trả về giỏ hàng rỗng nếu có lỗi
  }
};

// Hàm lấy danh sách sách đã mua từ API
export const getPurchasedBooksFromAPI = async (userId) => {
  try {
    // Gọi API lấy thông tin tài khoản của người dùng
    const response = await api1.get(`/Account/${userId}`);
    
    if (response.status === 200) {
      // Lấy danh sách sách đã mua từ thông tin tài khoản
      const purchasedBooks = response.data.purchasedBooks || [];  // Giả sử "purchasedBooks" là trường chứa danh sách sách đã mua
      
      if (purchasedBooks.length === 0) {
        console.log("Bộ sưu tập sách trống.");
        return { data: [] };
      }
      
      // Lấy thông tin chi tiết của từng cuốn sách trong purchasedBooks
      const booksDetails = await Promise.all(purchasedBooks.map((bookId) => getBookDetails(bookId)));
      
      // Lọc các sách có thông tin hợp lệ
      const validBooks = booksDetails.filter((book) => book !== null);
      
      return { data: validBooks };  // Trả về thông tin sách
    } else {
      console.error("Không thể lấy thông tin tài khoản");
      return { data: [] }; // Trả về danh sách rỗng nếu có lỗi
    }
  } catch (error) {
    console.error("Lỗi khi lấy danh sách sách đã mua từ API:", error);
    return { data: [] }; // Trả về danh sách rỗng nếu có lỗi
  }
};

// Lấy chi tiết sách
export const getBookDetails = async (bookId) => {
  try {
    // Lấy tất cả sách từ API
    const response = await api.get("/book");

    // Kiểm tra nếu response trả về thành công
    if (response.status === 200) {
      // Tìm cuốn sách có id trùng với bookId
      const book = response.data.find((b) => b.id === Number(bookId));

      if (book) {
        return book;  // Trả về sách nếu tìm thấy
      } else {
        console.error("Không tìm thấy sách với id:", bookId);
        return null;
      }
    } else {
      console.error("Không thể lấy danh sách sách");
      return null;
    }
  } catch (error) {
    console.error("Lỗi khi lấy thông tin sách:", error);
    return null;
  }
};

export const putData = (endpoint, data) => api.put(endpoint, data);
export const postData = (endpoint, data) => api.post(endpoint, data);
export const patchData = (endpoint, data) => api.patch(endpoint, data);

export const putData1 = (endpoint, data) => api1.put(endpoint, data);
export const postData1 = (endpoint, data) => api1.post(endpoint, data);
export const patchData1 = (endpoint, data) => api1.patch(endpoint, data);

export const getChapterContent = async (bookId, chapterNumber) => {
  const chapterUrl = `/databooks/book${bookId}/chapter${chapterNumber}.txt`;

  try {
    console.log(`Đang tải: ${chapterUrl}`);
    const response = await fetch(chapterUrl, {
      headers: {
        Accept: 'text/plain',
      },
    });

    if (!response.ok) {
      console.warn(`Chương ${chapterNumber} không tồn tại: ${response.status}`);
      return null;
    }

    const content = await response.text();
    console.log(`Nội dung chương ${chapterNumber}:`, content.slice(0, 100)); // Log 100 ký tự đầu

    if (
      content.includes('<!doctype html') ||
      content.includes('<html') ||
      content.trim().length === 0
    ) {
      console.warn(`Nội dung chương ${chapterNumber} không hợp lệ (HTML hoặc rỗng)`);
      return null;
    }

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
  } catch (error) {
    console.warn(`Không tìm thấy chương ${chapterNumber}:`, error.message);
    return null;
  }
};
export const getChapter = (bookId, chapterNumber) => getChapterContent(bookId, chapterNumber);

const api2 = axios.create({
  baseURL: "https://6811254d3ac96f7119a3bbf0.mockapi.io",
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

export const getComments = (bookId) => {
  return api2.get(`/Comment/${bookId}`)
    .then(response => {
      // Chỉ lấy phần comments, bỏ qua các trường khác
      if (response.data && response.data.comments) {
        return response.data.comments; // Trả về mảng comments
      } else {
        return []; 
      }
    })
    .catch(error => {
      console.error("Lỗi khi lấy bình luận:", error);
      return []; 
    });
};



export const postComment = async (bookId, commentData) => {
  try {
    // Thử lấy dữ liệu hiện tại của tài nguyên Comment cho bookId
    let currentData = null;
    try {
      const response = await api2.get(`/Comment/${bookId}`);
      currentData = response.data;
    } catch (error) {
      if (error.response && error.response.status === 404) {
        // Tài nguyên không tồn tại, tạo mới với cấu trúc chính xác
        console.log(`Tài nguyên /Comment/${bookId} không tồn tại, tạo mới...`);
        const newResource = {
          id: bookId,
          comments: [],
        };
        await api2.post(`/Comment`, newResource); // Tạo tài nguyên mới
        currentData = newResource; // Cập nhật currentData
      } else {
        throw error; 
      }
    }

    // Đảm bảo currentData chỉ chứa id và comments
    const sanitizedData = {
      id: currentData.id,
      comments: currentData.comments || [],
    };

    // Thêm bình luận mới vào mảng comments
    const updatedComments = [...sanitizedData.comments, commentData];

    const updateResponse = await api2.put(`/Comment/${bookId}`, {
      id: bookId,
      comments: updatedComments,
    });

    return updateResponse.data; 
  } catch (error) {
    console.error("Lỗi khi thêm bình luận:", error);
    throw error; 
  }
};


export default api;