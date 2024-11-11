# LibraryManagement
A full-stack web application for managing a library, built with FastAPI for the backend and HTML, CSS, and JavaScript for the frontend. This application supports CRUD operations for managing authors, books, borrowers, and transactions, with a MySQL database backend.

Table of Contents
1.Features
2.Tech Stack
3.Setup Instructions
4.Database Setup
5.Project Structure
6.Usage
7.API Endpoints

1.Features
Authors: Add, update, view, and delete authors.
Books: Manage books, including title, author, published year, and genre.
Borrowers: Track library members and manage their contact details.
Transactions: Record and manage borrowing transactions, including borrow and return dates.

2.Tech Stack
Backend: FastAPI, MySQL
Frontend: HTML, CSS, JavaScript (Fetch API for API calls)
Database: MySQL

3.Setup Instructions
a)Clone the repository:
git clone https://github.com/your-username/library-management-system.git
cd library-management-system
b)Create and activate a virtual environment:
python -m venv myenv
source myenv/bin/activate   # On Windows, use `myenv\Scripts\activate`
c)Install dependencies:
pip install fastapi mysql-connector-python uvicorn
d)Set up the MySQL database:
Ensure MySQL is installed and running on your local machine.
Create a database named library_management.
Update the database credentials in main.py
db = mysql.connector.connect(
    host="localhost",
    user="root",          # your MySQL username
    password="password",  # your MySQL password
    database="library_management"
)
e)Run the FastAPI backend:
uvicorn main:app --reload
The backend will be available at http://127.0.0.1:8000
f)Serve the frontend: Open index.html in your browser, or serve it using a static file server if needed.

4.Database Setup
Create tables in MySQL for Authors, Books, Borrowers, and Transactions
-- Authors table
CREATE TABLE Authors (
    author_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    bio TEXT
);

-- Books table
CREATE TABLE Books (
    book_id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    author_id INT,
    published_year INT,
    genre VARCHAR(100),
    FOREIGN KEY (author_id) REFERENCES Authors(author_id)
);

-- Borrowers table
CREATE TABLE Borrowers (
    borrower_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255),
    phone VARCHAR(15)
);

-- Transactions table
CREATE TABLE Transactions (
    transaction_id INT AUTO_INCREMENT PRIMARY KEY,
    book_id INT,
    borrower_id INT,
    borrow_date DATE,
    return_date DATE,
    FOREIGN KEY (book_id) REFERENCES Books(book_id),
    FOREIGN KEY (borrower_id) REFERENCES Borrowers(borrower_id)
);

5.Project Structure
library-management-system/
├── backend/
│   └── main.py                 # FastAPI backend code
├── frontend/
│   ├── index.html              # Main HTML file
│   ├── app.js                  # JavaScript for CRUD operations
│   └── styles.css              # CSS file for styling
└── README.md                   # Project documentation

6.Usage 
Open index.html in your browser to access the frontend interface.
Navigate through the sections (Authors, Books, Borrowers, Transactions) using the navigation menu.
Perform CRUD operations in each section:
Authors: Add, update, delete, or view authors.
Books: Add, update, delete, or view books.
Borrowers: Add, update, delete, or view borrowers.
Transactions: Add, update, delete, or view borrowing transactions.

7.API Endpoints
Each endpoint corresponds to CRUD operations for the Authors, Books, Borrowers, and Transactions tables.

Authors
GET /authors/: Retrieve all authors
POST /authors/: Add a new author
PUT /authors/{author_id}: Update author information
DELETE /authors/{author_id}: Delete an author

Books
GET /books/: Retrieve all books
POST /books/: Add a new book
PUT /books/{book_id}: Update book information
DELETE /books/{book_id}: Delete a book

Borrowers
GET /borrowers/: Retrieve all borrowers
POST /borrowers/: Add a new borrower
PUT /borrowers/{borrower_id}: Update borrower information
DELETE /borrowers/{borrower_id}: Delete a borrower

Transactions
GET /transactions/: Retrieve all transactions
POST /transactions/: Add a new transaction
PUT /transactions/{transaction_id}: Update transaction details
DELETE /transactions/{transaction_id}: Delete a transaction

