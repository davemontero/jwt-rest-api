import { Navigate, Outlet } from 'react-router-dom'

const ProtectedRoute = ({
    isAllowed,
    redirectPath = '/',
    children,
  }) => {
      console.log(localStorage.getItem("jwt"))
    if (!isAllowed) {
        console.log("HERE")
      return <Navigate to={redirectPath} replace />;
    }
  
    return children ? children : <Outlet />;
  };

export default ProtectedRoute