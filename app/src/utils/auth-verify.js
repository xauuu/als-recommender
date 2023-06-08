import { useDispatch } from "react-redux";
import { withRouter } from "react-router-dom";
import { logout } from "../store/features/userSlice.js";
import { parseJwt } from "./helper";
import { logout as userLogout } from "./../apis/auth";

const AuthVerifyComponent = ({ history }) => {
  const dispatch = useDispatch();

  history.listen(async () => {
    if (localStorage.getItem("user")) {
      const user = JSON.parse(localStorage.getItem("user"));
      if (user) {
        const decodedJwt = parseJwt(user.access_token);
        if (decodedJwt.exp * 1000 < Date.now()) {
          await userLogout();
          dispatch(logout());
        }
      }
    }
  });
  return <div></div>;
};

export default withRouter(AuthVerifyComponent);
