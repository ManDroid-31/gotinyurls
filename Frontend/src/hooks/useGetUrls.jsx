import React from "react";
import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUrls } from "@/store/urlsSlice";
import { useCallback } from "react";

const useGetUrls = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  const getUrl = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await axios.get(
        import.meta.env.VITE_BACKEND_URL + "/api/url/user-urls",
        {
          params: { email: localStorage.getItem("email") },
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );

      console.log(res.data);

      dispatch(setUrls(res.data.urls));
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [dispatch]);

  return { getUrl, loading, error };
};

export default useGetUrls;
