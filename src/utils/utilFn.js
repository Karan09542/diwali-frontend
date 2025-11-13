import {jwtDecode} from "jwt-decode"
import Cookies from "js-cookie"
export const isLoggedIn =  ()=> {
    const token = Cookies.get("token");
    const isAuthenticated = !!token;
    if(!isAuthenticated) return false;
    else return true;
}