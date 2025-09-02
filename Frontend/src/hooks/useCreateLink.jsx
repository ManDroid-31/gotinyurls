import { useState } from "react";
import axios from "axios";

export function useCreateLink() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const createLink = async (payload) => {
    setLoading(true);
    setError(null);

    try {
      let res = await axios.post(
        import.meta.env.VITE_BACKEND_URL + "/api/url/shorten",
        { payload: payload },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );

      if (res.status !== 201) {
        throw new Error("Failed to create link");
      }

      return await res.data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { createLink, loading, error };
}
