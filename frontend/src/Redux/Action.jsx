import axios from "axios";
import { useDispatch } from "react-redux";
import { LOGIN_SUCCESS,LOGIN_FAILURE } from "./actiontype";

const dispatch = useDispatch();

export const loginuser = async(data)=>{
    const response = await axios.post("http://localhost:3000/user/login")
}