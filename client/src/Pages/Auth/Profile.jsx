import { useEffect, useState } from 'react';

export const Profile = () => {
    const [user, setUser] = useState({});

    const { id } = JSON.parse(localStorage.getItem('user'));

    useEffect(() => {
        console.log(id);
    }, []);

    return <div>Profile</div>;
};
