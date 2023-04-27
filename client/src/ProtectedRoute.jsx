import { useUserContext } from './context/userContext';
import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ children }) {
    const { getUserFromLocalStorage } = useUserContext();

    if (!getUserFromLocalStorage()) return <Navigate to="/login" />;

    return children;
}
