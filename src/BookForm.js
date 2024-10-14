import React, { useEffect, useState } from 'react';
import { createBook, updateBook } from './BookService';
import 'bootstrap/dist/css/bootstrap.min.css'; 

const BookForm = ({ editBook, setEditBook, setBooks }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    author: '',
    price: '',
    category: 'Adventure', 
  });

  useEffect(() => {
    if (editBook) {
      setFormData(editBook);
    } else {
      setFormData({
        title: '',
        description: '',
        author: '',
        price: '',
        category: 'Adventure',
      });
    }
  }, [editBook]);

  const handleChange = (e) => {
    
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editBook) {
      const updatedBook = await updateBook(editBook._id, formData);
      setBooks(prev => prev.map(b => (b._id === updatedBook._id ? updatedBook : b)));
      setEditBook(null);
    } else {
      const newBook = await createBook(formData);
      setBooks(prev => [...prev, newBook]);
    }
    setFormData({ title: '', description: '', author: '', price: '', category: 'Adventure' });
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <div className="mb-3">
        <label className="form-label">Title</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="form-control"
          placeholder="Enter book title"
          required
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Description</label>
        <input
          type="text"
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="form-control"
          placeholder="Enter book description"
          required
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Author</label>
        <input
          type="text"
          name="author"
          value={formData.author}
          onChange={handleChange}
          className="form-control"
          placeholder="Enter author name"
          required
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Price</label>
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          className="form-control"
          placeholder="Enter book price"
          required
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Category</label>
        <select name="category" value={formData.category} onChange={handleChange} className="form-select">
          <option value="Adventure">Adventure</option>
          <option value="Classics">Classics</option>
          <option value="Crime">Crime</option>
          <option value="Fantasy">Fantasy</option>
        </select>
      </div>
      <button type="submit" className="btn btn-primary">
        {editBook ? 'Update' : 'Create'}
      </button>
    </form>
  );
};

export default BookForm;
