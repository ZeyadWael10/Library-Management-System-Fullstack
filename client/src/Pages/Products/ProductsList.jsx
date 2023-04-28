import { useEffect } from "react";
import ProductItem from "./ProductItem";
import { Link } from "react-router-dom";
import { useBookContext } from "../../context/bookContext";

const BooksList = () => {
  const { fetchBooks, books } = useBookContext();

  useEffect(() => {
    fetchBooks();
  }, []);

  const renderedBooks = books?.map((book) => (
    <ProductItem
      key={book._id}
      imgSrc={book.BookPictures[0]}
      title={book.name}
      author={book.author}
      borrowed={book.isBorrowed}
      id={book._id}
    />
  ));

  return (
    <div className="pt-2 pb-4 container">
      <div className="d-flex align-items-center justify-content-between">
        <h1 className="my-4">Books List</h1>
        <Link to="/products/addBook" className="btn btn-outline-success">
          Add Book{" "}
        </Link>
      </div>

      <div className="row gy-4">
        {books.length ? renderedBooks : <p>there is no books, add first one</p>}
      </div>
    </div>
  );
};

export default BooksList;
