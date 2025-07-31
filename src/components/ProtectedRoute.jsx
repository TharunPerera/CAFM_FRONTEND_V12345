// import { useContext, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { AuthContext } from "../context/AuthContext";

// const ProtectedRoute = ({ children }) => {
//   const { user } = useContext(AuthContext);
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (!user) {
//       navigate("/login", { replace: true });
//     }
//   }, [user, navigate]);

//   return user ? children : null;
// };

// export default ProtectedRoute;

import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const ProtectedRoute = ({ children, requiredPermission }) => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login", { replace: true });
    } else if (
      requiredPermission &&
      !user.permissions.includes(requiredPermission)
    ) {
      navigate("/unauthorized", { replace: true });
    }
  }, [user, requiredPermission, navigate]);

  return user ? children : null;
};

export default ProtectedRoute;
