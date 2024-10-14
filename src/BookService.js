import axios from 'axios';

const API_URL = 'http://localhost:5000/books';

export const getBooks = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching books:', error);
    throw error; // Rethrow the error to handle it where this function is called
  }
};

export const getBook = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching book with ID ${id}:`, error);
    throw error;
  }
};

export const createBook = async (book) => {
  try {
    const response = await axios.post(API_URL, book);
    return response.data;
  } catch (error) {
    console.error('Error creating book:', error);
    throw error;
  }
};

export const updateBook = async (id, book) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, book);
    return response.data;
  } catch (error) {
    console.error(`Error updating book with ID ${id}:`, error);
    throw error;
  }
};

export const deleteBook = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting book with ID ${id}:`, error);
    throw error;
  }
};
