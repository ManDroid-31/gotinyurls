// src/components/ProtectedRoute.jsx
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";

export default function ProtectedRoute({ children }) {
  const [loading, setLoading] = useState(true);
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    const verifyToken = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setIsValid(false);
        setLoading(false);
        <Navigate to="/login" />;
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
          <Navigate to="/login" />;
          setIsValid(false);
        }
      } catch (err) {
        console.log(err);
        <Navigate to="/login" />;
        setIsValid(false);
      } finally {
        setLoading(false);
      }
    };

    verifyToken();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (!isValid) return <Navigate to="/login" replace />;

  return children;
}
