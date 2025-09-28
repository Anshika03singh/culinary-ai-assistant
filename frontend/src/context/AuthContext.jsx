import React, { createContext, useState, useContext, useEffect } from 'react';
import api from '../api';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

const getInitialState = (key) => {
    try {
        const item = localStorage.getItem(key);
        if (item && item !== 'undefined' && item !== '[object Object]') {
            return JSON.parse(item);
        }
    } catch (error) {
        console.error("Failed to parse from localStorage", error);
    }
    return null;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => getInitialState('user'));
    const [token, setToken] = useState(() => localStorage.getItem('token'));
    // New state to control the modal's visibility
    const [isModalOpen, setIsModalOpen] = useState(false); 

    useEffect(() => {
        if (token) {
            localStorage.setItem('token', token);
            api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        } else {
            localStorage.removeItem('token');
            delete api.defaults.headers.common['Authorization'];
        }

        if (user) {
            localStorage.setItem('user', JSON.stringify(user));
        } else {
            localStorage.removeItem('user');
        }
    }, [token, user]);

    const login = async (email, password) => {
        const { data } = await api.post('/auth/login', { email, password });
        setToken(data.token);
        setUser(data.user);
        setIsModalOpen(false); // Close modal on successful login
    };

    const register = async (name, email, password) => {
        await api.post('/auth/register', { name, email, password });
    };

    const logout = () => {
        setToken(null);
        setUser(null);
    };

    // New functions to be shared across the app
    const openAuthModal = () => setIsModalOpen(true);
    const closeAuthModal = () => setIsModalOpen(false);

    // The value object that will be provided to all components
    const value = {
        user,
        token,
        login,
        register,
        logout,
        isModalOpen,
        openAuthModal,
        closeAuthModal
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

