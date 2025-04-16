import axios from "axios";
import { LOGIN, LOGIN_FAILURE } from "./ActionType";

export const loginUser = (data) => async (dispatch) => {
  try {
    const res = await axios.post("http://localhost:8000/user/login", data, {
      withCredentials: true,
    });

    const { email, name, avatar, token } = res.data;

    dispatch({
      type: LOGIN,
      payload: { email, name, avatar, token }
    });

  } catch (err) {
    dispatch({
      type: LOGIN_FAILURE,
      payload: { error: "Invalid email or password" }
    });
  }
};
