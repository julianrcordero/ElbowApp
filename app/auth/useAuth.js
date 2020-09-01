import { useContext } from "react";
import jwtDecode from "jwt-decode";

import AuthContext from "./context";
import authStorage from "./storage";
import authApi from "../api/auth";

export default useAuth = () => {
  const { user, setUser } = useContext(AuthContext);

  const logIn = (idToken, accessToken) => {
    const user = jwtDecode(idToken);
    setUser(user);
    authStorage.storeAccessToken(accessToken);
    authStorage.storeIdToken(idToken);
  };

  const logOut = async () => {
    const accessToken = await authStorage.getAccessToken();
    const result = await authApi.signout(accessToken);
    result.ok
      ? console.log("Successfully signed out via Cognito")
      : console.log("Couldn't sign out via Cognito");

    setUser(null);
    authStorage.removeIdToken();
    authStorage.removeAccessToken();
  };

  return { user, logIn, logOut };
};
