import axios from "axios";
import { createContext, useContext, useState } from "react";

let BookContext = createContext();

export default function BookContextProvider({ children }) {
  const [books, setBooks] = useState([]);

  const token = localStorage.getItem("token");

  const fetchBooks = async () => {
    try {
      const { data } = await axios.get("http://localhost:3000/api/v1/book", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setBooks(data.Books);
    } catch (error) {}
  };

  const addBook = async (book) => {
    const { data } = await axios.post(
      "http://localhost:3000/api/v1/book/addbook",
      book,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return data;
  };

  const getBookDetails = async (bookId) => {
    const { data } = await axios.get(
      `http://localhost:3000/api/v1/book/id/${bookId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return data?.Books;
  };

  //   * Update book
  const updateBook = async (bookId, updates) => {
    const { data } = await axios.post(
      `http://localhost:3000/api/v1/book/updatebook/${bookId}`,
      updates,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return data;
  };

  const deleteBook = async (id) => {
    try {
      const res = await axios.delete(
        `http://localhost:3000/api/v1/book/deletebook/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return true;
    } catch {
      return false;
    }
  };

  return (
    <BookContext.Provider
      value={{
        fetchBooks,
        addBook,
        getBookDetails,
        updateBook,
        deleteBook,
        books,
      }}
    >
      {children}
    </BookContext.Provider>
  );
}

export const useBookContext = () => useContext(BookContext);
