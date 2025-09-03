import React from "react";
import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useCallback } from "react";

const useGetAnalytics = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  const getAnalytics = useCallback(async (startDate, endDate, selectedUrl) => {
    setLoading(true);
    setError(null);

    try {
      const res = await axios.get(
        import.meta.env.VITE_BACKEND_URL + "/api/url/analytics",
        {
          params: {
            email: localStorage.getItem("email"),
            startDate,
            endDate,
            selectedUrl,
          },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      return await res.data;

      //   dispatch(setUrls(res.data.urls));
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return { getAnalytics, loading, error };
};

export default useGetAnalytics;
