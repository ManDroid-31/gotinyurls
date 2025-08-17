// src/components/ProtectedRoute.jsx
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import { logout } from "../store/userSlice";

export default function ProtectedRoute({ children }) {
  const [loading, setLoading] = useState(true);
  const [isValid, setIsValid] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const verifyToken = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setIsValid(false);
        setLoading(false);
        return;
      }

      try {

        const res = await axios.get(
          import.meta.env.VITE_BACKEND_URL + "/api/auth/verify",
          { headers: { Authorization: `Bearer ${token}` } }
        );

        if (res.data.valid) {
          setIsValid(true);
        } else {
          dispatch(logout());
          setIsValid(false);
        }
      } catch (err) {
        console.log(err);
        dispatch(logout());
        setIsValid(false);
      } finally {
        setLoading(false);
      }
    };

    verifyToken();
  }, [dispatch]);

  if (loading) return <p>Loading...</p>;
  if (!isValid) return <Navigate to="/login" replace />;

  return children;
}
