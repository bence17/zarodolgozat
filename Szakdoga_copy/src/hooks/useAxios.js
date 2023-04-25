import { useEffect } from "react";
import axios from "../lib/axios";
import { useNavigate } from "react-router";

const useAxios = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const responseIntercept = axios.interceptors.response.use(
      (response) => response,
      async (error) => {
        // Unauthorized
        if (error.response.status === 401) {
          navigate("/login");
        }

        return Promise.reject(error);
      }
    );

    return () => {
      axios.interceptors.response.eject(responseIntercept);
    };
  }, [location.pathname]);

  return axios;
};

export default useAxios;
