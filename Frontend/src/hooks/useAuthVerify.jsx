import { useEffect, useState } from "react";
import axios from "axios";

export default function useAuthVerify() {
  const [loading, setLoading] = useState(true);
  const [isValid, setIsValid] = useState(false);

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
          `${import.meta.env.VITE_BACKEND_URL}/api/auth/verify`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        setIsValid(res.data.valid);
      } catch (err) {
        console.error("Token verification failed:", err);
        setIsValid(false);
      } finally {
        setLoading(false);
      }
    };

    verifyToken();
  }, []);

  return { loading, isValid };
}
