import { useEffect } from "react";
import ProductItem from "./ProductItem";
import { Link } from "react-router-dom";
import { useBookContext } from "../../context/bookContext";
import { useUserContext } from "../../context/userContext";

const BooksList = () => {
  const { fetchBooks, books } = useBookContext();
  const { isAdmin, userBorrowedBooks } = useUserContext();

  useEffect(() => {
    fetchBooks();
  }, []);

  const renderedBooks = books
    ?.filter((book) => book.isBorrowed !== true || isAdmin === true)
    .map((book) => (
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
        {isAdmin ? (
          <Link to="/products/addBook" className="btn btn-outline-success">
            Add Book{" "}
          </Link>
        ) : (
          <Link
            to="/products/cart-items"
            className="btn btn-outline-success position-relative"
          >
            Your Cart{" "}
            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-primary">
              {userBorrowedBooks.length}
            </span>
          </Link>
        )}
      </div>

      <div className="row gy-4">
        {renderedBooks.length ? renderedBooks : <p>There is no books.</p>}
      </div>
    </div>
  );
};

export default BooksList;
