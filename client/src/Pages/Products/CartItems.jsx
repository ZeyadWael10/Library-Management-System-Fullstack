import { useBookContext } from "../../context/bookContext";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import ProductItem from "./ProductItem";
import { useUserContext } from "../../context/userContext";

const CartItems = () => {
  const { fetchBooks, books } = useBookContext();
  const { userBorrowedBooks, setUserBorrowedBooks } = useUserContext();

  useEffect(() => {
    fetchBooks();
  }, []);

  const renderedBooks = books
    ?.filter((book) => {
      return book.isBorrowed === true && userBorrowedBooks.includes(book._id);
    })
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
        <h1 className="my-4">Borrowed Books</h1>
        <Link to="/products" className="btn btn-outline-success">
          All Books{" "}
        </Link>
      </div>

      <div className="row gy-4">
        {renderedBooks.length ? (
          renderedBooks
        ) : (
          <p>There is no borrowed books</p>
        )}
      </div>
    </div>
  );
};

export default CartItems;
