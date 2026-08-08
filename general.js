const axios = require('axios');

const BASE_URL = 'http://localhost:5000';

// Task 10: Get all books – using async/await with Axios
async function getAllBooks() {
    try {
        const response = await axios.get(`${BASE_URL}/`);
        console.log("All books:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error fetching all books:", error.message);
    }
}

// Task 11: Search by ISBN – using Promises with Axios
function getBookByISBN(isbn) {
    return axios.get(`${BASE_URL}/isbn/${isbn}`)
        .then(response => {
            console.log(`Book with ISBN ${isbn}:`, response.data);
            return response.data;
        })
        .catch(error => {
            console.error(`Error fetching book with ISBN ${isbn}:`, error.message);
        });
}

// Task 12: Search by Author – using async/await with Axios
async function getBooksByAuthor(author) {
    try {
        const response = await axios.get(`${BASE_URL}/author/${encodeURIComponent(author)}`);
        console.log(`Books by ${author}:`, response.data);
        return response.data;
    } catch (error) {
        console.error(`Error fetching books by ${author}:`, error.message);
    }
}

// Task 13: Search by Title – using async/await with Axios
async function getBooksByTitle(title) {
    try {
        const response = await axios.get(`${BASE_URL}/title/${encodeURIComponent(title)}`);
        console.log(`Books with title ${title}:`, response.data);
        return response.data;
    } catch (error) {
        console.error(`Error fetching books with title ${title}:`, error.message);
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
