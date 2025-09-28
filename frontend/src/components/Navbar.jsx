import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import styles from './Navbar.module.css';

const Navbar = () => {
    const auth = useAuth();

    // It's good practice to wait for the context to be ready
    if (!auth) {
        return null;
    }

    const { user, logout, openAuthModal } = auth;

    return (
        <nav className={styles.navbar}>
            <Link to="/" className={styles.brand}>
                Culinary AI
            </Link>
            <div className={styles.navLinks}>
                {user ? (
                    <>
                        <Link to="/profile" className={styles.navLink}>
                            {user.name}'s Profile
                        </Link>
                        <button onClick={logout} className={styles.navButton}>
                            Logout
                        </button>
                    </>
                ) : (
                    // This button now calls the global function to open the modal
                    <button onClick={openAuthModal} className={styles.navButton}>
                        Login / Sign Up
                    </button>
                )}
            </div>
        </nav>
        // The <AuthModal/> component has been moved to App.jsx
    );
};

export default Navbar;

