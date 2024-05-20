import { useNavigate } from "react-router-dom";
import useAuth from "./UseAuth";
import { useEffect } from "react";
import Spinner from "src/views/spinner/Spinner";

const GuestGuard = ({ children }: any) => {
  const { isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      navigate("/", { replace: true });
    }
  }, [isAuthenticated, isLoading, navigate]);

  return isLoading ? <Spinner /> : children; // 如果正在加载，则显示加载指示器
};
export default GuestGuard;
