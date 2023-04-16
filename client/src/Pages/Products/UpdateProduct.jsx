import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const UpdateProduct = () => {
    const { bookId } = useParams();
    const [book, setBook] = useState({
        name: '',
        author: '',
    });
    const navigate = useNavigate();

    const token = localStorage.getItem('token');

    const getBookDetails = () => {
        axios
            .get(`http://localhost:3000/api/v1/book/id/${bookId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((res) => {
                const { name, author } = res.data.Books;
                console.log(name, author);
                setBook({ ...book, name, author });
            });
    };

    useEffect(() => {
        getBookDetails();
    }, []);

    // update Book
    const updateBook = async (e) => {
        const { data } = await axios.post(
            `http://localhost:3000/api/v1/book/updatebook/${bookId}`,
            book,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        return data;
    };

    // Handle form
    const handleChange = (event) => {
        console.log(book);
        setBook({
            ...book,
            [event.target.name]: event.target.value,
        });
    };
    const handleSubmit = async (event) => {
        event.preventDefault();

        const data = await updateBook();
        if (data) {
            navigate('/products');
        }
    };

    return (
        <form className="login-form" onSubmit={handleSubmit}>
            <h2 className="my-4">Update Book</h2>

            {/* <!-- name input --> */}
            <div className="form-outline mb-3">
                <label className="form-label" htmlFor="form2Example2">
                    Book Name
                </label>
                <input
                    onChange={handleChange}
                    type="text"
                    id="form2Example2"
                    name="name"
                    className="form-control"
                    value={book.name}
                />
            </div>

            {/* <!-- Email input --> */}
            <div className="form-outline mb-3">
                <label className="form-label" htmlFor="form2Example1">
                    Author
                </label>
                <input
                    onChange={handleChange}
                    type="text"
                    name="author"
                    id="form2Example1"
                    className="form-control"
                    value={book.author}
                />
            </div>

            {/* <!-- Submit button --> */}
            <button className="btn btn-primary btn-block mb-4">
                Update Book{' '}
            </button>
        </form>
    );
};

export default UpdateProduct;
