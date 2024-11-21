import { createContext, useState, useContext, useEffect } from "react";
import { registerRequest, loginRequest, verifyTokenRequest } from "../api/auth";
import Cookies from "js-cookie";

export const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within a AuthProvider");
    }
    return context;
};


export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [errors, setErrors] = useState([]);
    const [loading, setLoading] = useState(true);
  
    // clear errors after 5 seconds
    useEffect(() => {
      if (errors.length > 0) {
        const timer = setTimeout(() => {
          setErrors([]);
        }, 5000);
        return () => clearTimeout(timer);
      }
    }, [errors]);
  
    const signup = async (user) => {
      try {
        const res = await registerRequest(user);
        if (res.status === 200) {
          console.log(res.data);
          setUser(res.data);
          setIsAuthenticated(true);
        }
      } catch (error) {
        //console.log(error.response.data);
        setErrors(error.response.data);
      }
    };
  
    const signin = async (user) => {
      try {
        const res = await loginRequest(user);
        console.log(res);
        setUser(res.data);
        setIsAuthenticated(true);
      } catch (error) {
        if (Array.isArray(error.response.data)) {
          return setErrors(error.response.data);
        }
        //console.log(error);
        setErrors([error.response.data.message]);
      }
    };

    const logout = () => {
      Cookies.remove("token");
      setUser(null);
      setIsAuthenticated(false);
    };

    useEffect(() => {
      async function checkLogin() {
        const cookies = Cookies.get();

        if (!cookies.token) {
          setIsAuthenticated(false);
          setLoading(false);
          setUser(null);
          return;
        }

        try {
          const res = await verifyTokenRequest(cookies.token);
          //console.log(res);
          if (!res.data) { setIsAuthenticated(false);
            setLoading(false);
            return
          }
          setIsAuthenticated(true);
          setUser(res.data);
          setLoading(false);
        } catch (error) {
          setIsAuthenticated(false);
          setLoading(false);
          setUser(null);
        }
      };
      checkLogin();
    }, []);
   


    return (
      <AuthContext.Provider
        value={{
            signup,
            user,
            signin,
            logout,
            isAuthenticated,
            errors,
            loading,
        }}
      >
        {children}
      </AuthContext.Provider>
    );
};

//export default AuthContext;

  