import Cookies from "js-cookie";
import { useMemo } from "react";

const useUser = () => {
  const userCookie = Cookies.get("user");

  const user = useMemo(() => {
    if (userCookie) {
      return JSON.parse(userCookie.slice(2));
    }
  }, [userCookie]);

  return { user, deleteUserCookie };
};

export default useUser;

function deleteUserCookie() {
  Cookies.remove("user");
}
