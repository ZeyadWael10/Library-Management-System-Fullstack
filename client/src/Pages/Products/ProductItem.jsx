import { Link, useNavigate } from "react-router-dom";
import { useBookContext } from "../../context/bookContext";

const ProductItem = ({ imgSrc, title, author, borrowed, id }) => {
  const navigate = useNavigate();
  const { deleteBook } = useBookContext();

  const handleDeleteBook = async () => {
    const deleted = await deleteBook(id);
    if (deleted) navigate(0);
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
            <button className="btn d-block btn-outline-info w-100 my-2">
              Details
            </button>
            <button className="btn d-block btn-success w-100 my-2">
              Add to cart
            </button>
            <div className="d-flex gap-2">
              <Link
                to={`/products/updateBook/${id}`}
                className="btn d-block btn-info w-100 my-2"
              >
                update
              </Link>
              <button
                onClick={handleDeleteBook}
                className="btn d-block btn-danger w-100 my-2"
              >
                Delete
              </button>
            </div>
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
