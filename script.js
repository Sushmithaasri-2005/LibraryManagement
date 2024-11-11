const API_URL = "http://127.0.0.1:8000";

// Helper function to make API requests
async function apiRequest(endpoint, method = "GET", data = null) {
    const options = {
        method,
        headers: { "Content-Type": "application/json" },
    };
    if (data) options.body = JSON.stringify(data);
    const response = await fetch(`${API_URL}${endpoint}`, options);
    return response.json();
}

// CRUD functions for Authors
async function insertAuthor() {
    const name = document.getElementById('author-name').value;
    const bio = document.getElementById('author-bio').value;
    await apiRequest('/authors/', 'POST', { name, bio });
    alert("Author added successfully!");
    selectAuthors();
}

async function updateAuthor() {
    const author_id = document.getElementById('update-author-id').value;
    const name = document.getElementById('update-author-name').value;
    const bio = document.getElementById('update-author-bio').value;
    await apiRequest(`/authors/${author_id}`, 'PUT', { name, bio });
    alert("Author updated successfully!");
    selectAuthors();
}

async function deleteAuthor() {
    const author_id = document.getElementById('delete-author-id').value;
    await apiRequest(`/authors/${author_id}`, 'DELETE');
    alert("Author deleted successfully!");
    selectAuthors();
}

async function selectAuthors() {
    const authors = await apiRequest('/authors/');
    const table = createTable(authors, ['author_id', 'name', 'bio']);
    document.getElementById('authors-result').innerHTML = table;
}

// CRUD functions for Books
async function insertBook() {
    const title = document.getElementById('book-title').value;
    const author_id = document.getElementById('book-author-id').value;
    const published_year = document.getElementById('book-year').value;
    const genre = document.getElementById('book-genre').value;
    await apiRequest('/books/', 'POST', { title, author_id, published_year, genre });
    alert("Book added successfully!");
    selectBooks();
}

async function updateBook() {
    const book_id = document.getElementById('update-book-id').value;
    const title = document.getElementById('update-book-title').value;
    const author_id = document.getElementById('update-book-author-id').value;
    const published_year = document.getElementById('update-book-year').value;
    const genre = document.getElementById('update-book-genre').value;
    await apiRequest(`/books/${book_id}`, 'PUT', { title, author_id, published_year, genre });
    alert("Book updated successfully!");
    selectBooks();
}

async function deleteBook() {
    const book_id = document.getElementById('delete-book-id').value;
    await apiRequest(`/books/${book_id}`, 'DELETE');
    alert("Book deleted successfully!");
    selectBooks();
}

async function selectBooks() {
    const books = await apiRequest('/books/');
    const table = createTable(books, ['book_id', 'title', 'author_id', 'published_year', 'genre']);
    document.getElementById('books-result').innerHTML = table;
}

// CRUD functions for Borrowers
async function insertBorrower() {
    const name = document.getElementById('borrower-name').value;
    const email = document.getElementById('borrower-email').value;
    const phone = document.getElementById('borrower-phone').value;
    await apiRequest('/borrowers/', 'POST', { name, email, phone });
    alert("Borrower added successfully!");
    selectBorrowers();
}

async function updateBorrower() {
    const borrower_id = document.getElementById('update-borrower-id').value;
    const name = document.getElementById('update-borrower-name').value;
    const email = document.getElementById('update-borrower-email').value;
    const phone = document.getElementById('update-borrower-phone').value;
    await apiRequest(`/borrowers/${borrower_id}`, 'PUT', { name, email, phone });
    alert("Borrower updated successfully!");
    selectBorrowers();
}

async function deleteBorrower() {
    const borrower_id = document.getElementById('delete-borrower-id').value;
    await apiRequest(`/borrowers/${borrower_id}`, 'DELETE');
    alert("Borrower deleted successfully!");
    selectBorrowers();
}

async function selectBorrowers() {
    const borrowers = await apiRequest('/borrowers/');
    const table = createTable(borrowers, ['borrower_id', 'name', 'email', 'phone']);
    document.getElementById('borrowers-result').innerHTML = table;
}

// CRUD functions for Transactions
async function insertTransaction() {
    const book_id = document.getElementById('transaction-book-id').value;
    const borrower_id = document.getElementById('transaction-borrower-id').value;
    const borrow_date = document.getElementById('transaction-borrow-date').value;
    const return_date = document.getElementById('transaction-return-date').value;
    await apiRequest('/transactions/', 'POST', { book_id, borrower_id, borrow_date, return_date });
    alert("Transaction added successfully!");
    selectTransactions();
}

async function updateTransaction() {
    const transaction_id = document.getElementById('update-transaction-id').value;
    const book_id = document.getElementById('update-transaction-book-id').value;
    const borrower_id = document.getElementById('update-transaction-borrower-id').value;
    const borrow_date = document.getElementById('update-transaction-borrow-date').value;
    const return_date = document.getElementById('update-transaction-return-date').value;
    await apiRequest(`/transactions/${transaction_id}`, 'PUT', { book_id, borrower_id, borrow_date, return_date });
    alert("Transaction updated successfully!");
    selectTransactions();
}

async function deleteTransaction() {
    const transaction_id = document.getElementById('delete-transaction-id').value;
    await apiRequest(`/transactions/${transaction_id}`, 'DELETE');
    alert("Transaction deleted successfully!");
    selectTransactions();
}

async function selectTransactions() {
    const transactions = await apiRequest('/transactions/');
    const table = createTable(transactions, ['transaction_id', 'book_id', 'borrower_id', 'borrow_date', 'return_date']);
    document.getElementById('transactions-result').innerHTML = table;
}

// Helper function to create an HTML table from data
function createTable(data, columns) {
    let table = '<table><thead><tr>';
    columns.forEach(col => table += `<th>${col.replace('_', ' ').toUpperCase()}</th>`);
    table += '</tr></thead><tbody>';
    data.forEach(row => {
        table += '<tr>';
        columns.forEach(col => table += `<td>${row[col] || ''}</td>`);
        table += '</tr>';
    });
    table += '</tbody></table>';
    return table;
}
