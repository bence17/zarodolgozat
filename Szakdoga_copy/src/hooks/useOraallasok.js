import useSWR from "swr";
import useAxios from "./useAxios";

const useOraAllasok = () => {
  const axios = useAxios();
  const fetcher = (url) => axios.get(url).then((res) => res.data);
  const { data, error, mutate } = useSWR(`/oraAllasok?novekvo=true`, fetcher);

  return {
    data,
    error,
    isLoading: !error && !data,
    mutate,
  };
};

export default useOraAllasok;
