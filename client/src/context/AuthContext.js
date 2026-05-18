import { createContext, useEffect, useState } from 'react';

export const AuthContext = createContext();

export function AuthProvider({ children }) {

    const [user, setUser] = useState(null);

    useEffect(() => {

        const token = localStorage.getItem('token');
        const login = localStorage.getItem('login');

        if (token && login) {
            setUser({ login });
        }

    }, []);

    const loginUser = (token, login) => {

        localStorage.setItem('token', token);
        localStorage.setItem('login', login);

        setUser({ login });
    };

    const logoutUser = () => {

        localStorage.removeItem('token');
        localStorage.removeItem('login');

        setUser(null);
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                loginUser,
                logoutUser
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}