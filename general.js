const axios = require('axios');

const BASE_URL = 'http://localhost:5000';

// Helper: phân loại lỗi axios theo status code thay vì chỉ đọc error.message chung chung
function handleAxiosError(error, context) {
    if (error.response) {
        // Server có phản hồi nhưng status != 2xx
        if (error.response.status === 404) {
            console.warn(`${context}: Không tìm thấy dữ liệu (404) — ${error.response.data?.message || 'Not found'}`);
        } else {
            console.error(`${context}: Server trả lỗi ${error.response.status} — ${error.response.data?.message || error.response.statusText}`);
        }
    } else if (error.request) {
        // Request đã gửi nhưng không nhận được response (server chưa chạy, network lỗi...)
        console.error(`${context}: Không kết nối được tới server. Kiểm tra server (index.js) đã chạy ở ${BASE_URL} chưa.`);
    } else {
        // Lỗi khi setup request
        console.error(`${context}: Lỗi khi tạo request — ${error.message}`);
    }
    return null;
}

// Task 10: Get all books – using async/await with Axios
async function getAllBooks() {
    try {
        const response = await axios.get(`${BASE_URL}/`);
        console.log("All books:", response.data);
        return response.data;
    } catch (error) {
        return handleAxiosError(error, "getAllBooks");
    }
}

// Task 11: Search by ISBN – using Promises with Axios
function getBookByISBN(isbn) {
    return axios.get(`${BASE_URL}/isbn/${isbn}`)
        .then(response => {
            console.log(`Book with ISBN ${isbn}:`, response.data);
            return response.data;
        })
        .catch(error => handleAxiosError(error, `getBookByISBN(${isbn})`));
}

// Task 12: Search by Author – using async/await with Axios
async function getBooksByAuthor(author) {
    try {
        const response = await axios.get(`${BASE_URL}/author/${encodeURIComponent(author)}`);
        console.log(`Books by ${author}:`, response.data);
        return response.data;
    } catch (error) {
        return handleAxiosError(error, `getBooksByAuthor(${author})`);
    }
}

// Task 13: Search by Title – using async/await with Axios
async function getBooksByTitle(title) {
    try {
        const response = await axios.get(`${BASE_URL}/title/${encodeURIComponent(title)}`);
        console.log(`Books with title ${title}:`, response.data);
        return response.data;
    } catch (error) {
        return handleAxiosError(error, `getBooksByTitle(${title})`);
    }
}

// Demo calls — chạy: node general.js (đảm bảo server (index.js) đang chạy ở port 5000)
(async () => {
    await getAllBooks();
    await getBookByISBN(1);
    await getBooksByAuthor("Chinua Achebe");
    await getBooksByTitle("Fairy tales");
})();

module.exports = {
    getAllBooks,
    getBookByISBN,
    getBooksByAuthor,
    getBooksByTitle
};