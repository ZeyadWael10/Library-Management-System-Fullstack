import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddProducts = () => {
    const [images, setImages] = useState([]);
    const [imagesPrvw, setImagesPrvw] = useState([]);

    const [uploadPic, setuploadPic] = useState(false);

    const navigate = useNavigate();

    const token = localStorage.getItem('token');

    const uploadPics = async (bookId) => {
        try {
            const formData = new FormData();

            for (let i = 0; i < images.length; i++) {
                formData.append('image', images[i]);

                const a = URL.createObjectURL(images[i]);
            }

            const { data } = await axios.patch(
                `http://localhost:3000/api/v1/book/addBookPics/${bookId}`,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            return data;
        } catch (error) {}
    };

    const handleUploadFile = (e) => {
        setImages(e.target.files);

        let b = [];
        for (let i = 0; i < e.target.files.length; i++) {
            const a = URL.createObjectURL(e.target.files[i]);

            b.push(a);
        }

        setImagesPrvw((prev) => [...b]);
    };

    // * ************************************
    const [book, setBook] = useState({
        name: '',
        author: '',
    });

    // Add Book
    const addBook = async (e) => {
        const { data } = await axios.post(
            'http://localhost:3000/api/v1/book/addbook',
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
        setBook({
            ...book,
            [event.target.name]: event.target.value,
        });
    };
    const handleSubmit = async (event) => {
        event.preventDefault();

        const data = await addBook();
        const { Book } = await data;
        if (Book) {
            setuploadPic(true);
            const data = await uploadPics(Book._id);

            navigate('/products');
        }
    };

    return (
        <form className="login-form" onSubmit={handleSubmit}>
            <h2 className="my-4">Add Book</h2>

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
                />
            </div>
            {/* <!-- Email input --> */}
            <div className="form-outline mb-3">
                <label className="form-label" htmlFor="form2Example1">
                    Add images
                </label>
                <input
                    type="file"
                    multiple
                    name="image"
                    onChange={handleUploadFile}
                />
            </div>

            {/* <!-- Submit button --> */}
            <button className="btn btn-primary btn-block mb-4">
                Add Book{' '}
            </button>

            {uploadPic && (
                <p className="alert alert-success py-2">
                    Adding book, please wait{' '}
                </p>
            )}

            {imagesPrvw.length > 0 && (
                <>
                    <h5>Selected Images</h5>
                    <ul className="chooseImage">
                        {imagesPrvw.map((image, index) => (
                            <li key={index}>
                                <img src={image} alt="" className="img" />
                            </li>
                        ))}
                    </ul>
                </>
            )}
        </form>
    );
};

export default AddProducts;
