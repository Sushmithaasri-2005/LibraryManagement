from fastapi import FastAPI, HTTPException
import mysql.connector
from pydantic import BaseModel
from datetime import date
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Enable CORS for frontend access
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Update to specific frontend URL if needed
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Database connection setup
db = mysql.connector.connect(
    host="localhost",
    user="root",
    password="Sushmi2005@",
    database="library_management"
)

# Models for each table
class Book(BaseModel):
    title: str
    author_id: int
    published_year: int
    genre: str

class Author(BaseModel):
    name: str
    bio: str = None

class Borrower(BaseModel):
    name: str
    email: str
    phone: str

class Transaction(BaseModel):
    book_id: int
    borrower_id: int
    borrow_date: date
    return_date: date = None

# CRUD operations for Books
@app.post("/books/")
def add_book(book: Book):
    cursor = db.cursor()
    sql = "INSERT INTO Books (title, author_id, published_year, genre) VALUES (%s, %s, %s, %s)"
    cursor.execute(sql, (book.title, book.author_id, book.published_year, book.genre))
    db.commit()
    return {"message": "Book added successfully"}

@app.get("/books/")
def get_books():
    cursor = db.cursor(dictionary=True)
    cursor.execute("SELECT * FROM Books")
    return cursor.fetchall()

@app.put("/books/{book_id}")
def update_book(book_id: int, book: Book):
    cursor = db.cursor()
    sql = "UPDATE Books SET title = %s, author_id = %s, published_year = %s, genre = %s WHERE book_id = %s"
    cursor.execute(sql, (book.title, book.author_id, book.published_year, book.genre, book_id))
    db.commit()
    return {"message": "Book updated successfully"}

@app.delete("/books/{book_id}")
def delete_book(book_id: int):
    cursor = db.cursor()
    cursor.execute("DELETE FROM Books WHERE book_id = %s", (book_id,))
    db.commit()
    return {"message": "Book deleted successfully"}

# CRUD operations for Authors
@app.post("/authors/")
def add_author(author: Author):
    cursor = db.cursor()
    sql = "INSERT INTO Authors (name, bio) VALUES (%s, %s)"
    cursor.execute(sql, (author.name, author.bio))
    db.commit()
    return {"message": "Author added successfully"}

@app.get("/authors/")
def get_authors():
    cursor = db.cursor(dictionary=True)
    cursor.execute("SELECT * FROM Authors")
    return cursor.fetchall()

@app.put("/authors/{author_id}")
def update_author(author_id: int, author: Author):
    cursor = db.cursor()
    sql = "UPDATE Authors SET name = %s, bio = %s WHERE author_id = %s"
    cursor.execute(sql, (author.name, author.bio, author_id))
    db.commit()
    return {"message": "Author updated successfully"}

@app.delete("/authors/{author_id}")
def delete_author(author_id: int):
    cursor = db.cursor()
    cursor.execute("DELETE FROM Authors WHERE author_id = %s", (author_id,))
    db.commit()
    return {"message": "Author deleted successfully"}

# CRUD operations for Borrowers
@app.post("/borrowers/")
def add_borrower(borrower: Borrower):
    cursor = db.cursor()
    sql = "INSERT INTO Borrowers (name, email, phone) VALUES (%s, %s, %s)"
    cursor.execute(sql, (borrower.name, borrower.email, borrower.phone))
    db.commit()
    return {"message": "Borrower added successfully"}

@app.get("/borrowers/")
def get_borrowers():
    cursor = db.cursor(dictionary=True)
    cursor.execute("SELECT * FROM Borrowers")
    return cursor.fetchall()

@app.put("/borrowers/{borrower_id}")
def update_borrower(borrower_id: int, borrower: Borrower):
    cursor = db.cursor()
    sql = "UPDATE Borrowers SET name = %s, email = %s, phone = %s WHERE borrower_id = %s"
    cursor.execute(sql, (borrower.name, borrower.email, borrower.phone, borrower_id))
    db.commit()
    return {"message": "Borrower updated successfully"}

@app.delete("/borrowers/{borrower_id}")
def delete_borrower(borrower_id: int):
    cursor = db.cursor()
    cursor.execute("DELETE FROM Borrowers WHERE borrower_id = %s", (borrower_id,))
    db.commit()
    return {"message": "Borrower deleted successfully"}

# CRUD operations for Transactions
@app.post("/transactions/")
def add_transaction(transaction: Transaction):
    cursor = db.cursor()
    sql = "INSERT INTO Transactions (book_id, borrower_id, borrow_date, return_date) VALUES (%s, %s, %s, %s)"
    cursor.execute(sql, (transaction.book_id, transaction.borrower_id, transaction.borrow_date, transaction.return_date))
    db.commit()
    return {"message": "Transaction added successfully"}

@app.get("/transactions/")
def get_transactions():
    cursor = db.cursor(dictionary=True)
    cursor.execute("SELECT * FROM Transactions")
    return cursor.fetchall()

@app.put("/transactions/{transaction_id}")
def update_transaction(transaction_id: int, transaction: Transaction):
    cursor = db.cursor()
    sql = "UPDATE Transactions SET book_id = %s, borrower_id = %s, borrow_date = %s, return_date = %s WHERE transaction_id = %s"
    cursor.execute(sql, (transaction.book_id, transaction.borrower_id, transaction.borrow_date, transaction.return_date, transaction_id))
    db.commit()
    return {"message": "Transaction updated successfully"}

@app.delete("/transactions/{transaction_id}")
def delete_transaction(transaction_id: int):
    cursor = db.cursor()
    cursor.execute("DELETE FROM Transactions WHERE transaction_id = %s", (transaction_id,))
    db.commit()
    return {"message": "Transaction deleted successfully"}
