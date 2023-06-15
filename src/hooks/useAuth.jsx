import { useContext } from "react";
import AuthContext from "../context/AuteProvider";

const useAuth = () => {
    return useContext(AuthContext)
}

export default useAuth;