import React, { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const userData = sessionStorage.getItem('token');

        if (userData) {
            try {
                const decodeUser = jwtDecode(userData);
                console.log("Decoded token:", decodeUser); 

                if (decodeUser.profile) {
                    decodeUser.profile = decodeUser.profile; 
                }
                
                setUser(decodeUser);
            } catch (error) {
                console.error("Error decoding token:", error);
                sessionStorage.removeItem('token');
            }
        }
    }, []);

    const logout = () => {
        sessionStorage.removeItem('token');
        setUser(null);
        navigate("/");
        window.location.reload(); 
    };

    return (
        <AuthContext.Provider value={{ user, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export { AuthProvider, AuthContext };
