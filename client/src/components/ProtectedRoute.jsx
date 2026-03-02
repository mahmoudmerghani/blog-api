import { useAuth } from "../contexts/authContext";
import Loading from "./Loading/Loading"
import Error from "./Error/Error";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
    const { user, isLoading, error, getUser } = useAuth();

    if (isLoading) {
        return <Loading />;
    }

    if (error) {
        return <Error error={error} onTryAgain={getUser}/>
    }

    if (!user) {
        return <Navigate to={"/admin/login"} replace/>
    }

    return children;
}
