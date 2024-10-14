import React, { useEffect, useState } from 'react';
import { getBooks, deleteBook } from './BookService';
import BookForm from './BookForm';
import 'bootstrap/dist/css/bootstrap.min.css'; 

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [editBook, setEditBook] = useState(null);

  useEffect(() => {
    const fetchBooks = async () => {
      const data = await getBooks();
      setBooks(data);
    };
    
    fetchBooks();
  }, []);

  const handleDelete = async (id) => {
    const isConfirmed = window.confirm('Are you sure you want to delete this book?');
    
    if (isConfirmed) {
      await deleteBook(id);
      setBooks(books.filter(book => book._id !== id));
    }
  };
  

  const handleEdit = (book) => {
    setEditBook(book);
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Book List</h1>
      <BookForm editBook={editBook} setEditBook={setEditBook} setBooks={setBooks} />
      
      <table className="table table-striped mt-4">
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Category</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {books.map(book => (
            <tr key={book._id}>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>{book.category}</td>
              <td>${book.price.toFixed(2)}</td>
              <td>
                <button className="btn btn-warning btn-sm me-2" onClick={() => handleEdit(book)}>Edit</button>
                <button className="btn btn-danger btn-sm" onClick={() => handleDelete(book._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BookList;
