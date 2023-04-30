import { Link, useNavigate } from "react-router-dom";
import { useBookContext } from "../../context/bookContext";
import axios from "axios";
import { useState } from "react";
import { useUserContext } from "../../context/userContext";
import { successNotification } from "../../tostify";

const ProductItem = ({ imgSrc, title, author, borrowed, id }) => {
  const navigate = useNavigate();
  const { isAdmin, userBorrowedBooks, setUserBorrowedBooks } = useUserContext();
  const { deleteBook } = useBookContext();
  const { books, setBooks } = useBookContext();

  const token = localStorage.getItem("token");

  const [openBorrow, setOpenBorrow] = useState(false);
  const [borrowedPeriod, setBorrowedPeriod] = useState("");

  const handleDeleteBook = async () => {
    const deleted = await deleteBook(id);
    if (deleted) {
      successNotification(`Book deleted successfully, please wait..`);

      setTimeout(() => {
        navigate(0);
      }, 3000);
    }
  };

  const handleBorrowBook = async () => {
    const { data } = await axios.put(
      `http://localhost:3000/api/v1/book/borrowbook/${id}`,
      { BorrowedPeriod: +borrowedPeriod },
      {
        headers: {
          Authorization: `LBMS__${token}`,
        },
      }
    );

    if (data.message === "Book Borrowed Successfully") {
      successNotification(`${data.message}, please wait...`);

      setUserBorrowedBooks([...userBorrowedBooks, id]);

      const newBooks = books.filter((book) => book._id !== id);

      setBooks(newBooks);
    }
  };

  const handleReturnBook = async () => {
    const { data } = await axios.put(
      `http://localhost:3000/api/v1/book/returnbook/${id}`,
      {},
      {
        headers: {
          Authorization: `LBMS__${token}`,
        },
      }
    );

    if (data.message === "Book Returned Successfully") {
      successNotification(`${data.message}, please wait...`);

      const returnedBook = userBorrowedBooks.filter((book) => book !== id);

      setUserBorrowedBooks(returnedBook);

      console.log(userBorrowedBooks);

      console.log(returnedBook);
    }
  };

  return (
    <div className="col-lg-3 col-md-4 col-sm-6">
      <div className="card shadow-sm border-0 product">
        <div className="product-img">
          <img className="w-100 " src={imgSrc || "/book.jpeg"} alt="product" />
        </div>
        <div className="card-body">
          <h3 className="h5 fw-semibold mb-0">{title}</h3>
          <p className=" mt-0 text-success">{author}</p>
          <div className="cta">
            {!isAdmin ? (
              !borrowed ? (
                <div className="">
                  {openBorrow && (
                    <input
                      type="text"
                      onChange={(e) => setBorrowedPeriod(e.target.value)}
                      value={borrowedPeriod}
                      placeholder="borrow in days"
                      className="form-control"
                    />
                  )}

                  {openBorrow ? (
                    <div className="d-flex gap-2">
                      <button
                        onClick={handleBorrowBook}
                        className="btn d-block btn-warning  my-2 flex-grow-1"
                      >
                        Borrow
                      </button>
                      <button
                        onClick={() => setOpenBorrow(false)}
                        className="btn d-block btn-outline-danger  my-2"
                      >
                        X
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => setOpenBorrow(true)}
                      className="btn d-block btn-warning w-100 my-2"
                    >
                      Get This Book
                    </button>
                  )}
                </div>
              ) : (
                <button
                  onClick={handleReturnBook}
                  className="btn d-block btn-outline-success w-100 my-2"
                >
                  Return
                </button>
              )
            ) : (
              <div className="d-flex gap-2">
                <Link
                  to={`/products/updateBook/${id}`}
                  className="btn d-block btn-info w-100 my-2"
                >
                  update
                </Link>
                {!borrowed && (
                  <button
                    onClick={handleDeleteBook}
                    className="btn d-block btn-danger w-100 my-2"
                  >
                    Delete
                  </button>
                )}
              </div>
            )}
          </div>
        </div>

        {borrowed && (
          <span className="bg-info px-2 py-1 position-absolute end-0">
            Borrowed
          </span>
        )}
      </div>
    </div>
  );
};

export default ProductItem;
