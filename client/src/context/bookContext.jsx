import { createContext, useContext, useState } from 'react';

let BookContext = createContext();

export default function BookContextProvider({ children }) {
    const [books, setBooks] = useState([]);

    const fetchBooks = async () => {
        try {
            const { data } = await axios.get(
                'http://localhost:3000/api/v1/book',
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setBooks(data.Books);
        } catch (error) {}
    };

    return <BookContext.Provider value={{}}>{children}</BookContext.Provider>;
}

export const useBookContext = () => useContext(BookContext);
