import { Navigate } from "react-router-dom";
import useAuthVerify from "@/hooks/useAuthVerify";

export default function ProtectedRoute({ children }) {
  const { loading, isValid } = useAuthVerify();

  if (loading) return <p>Loading...</p>;
  if (!isValid) return <Navigate to="/login" replace />;

  return children;
}
