import React from 'react';
import { useAuth } from '../context/AuthContext';
import styles from './HomePage.module.css';
import { ChefHat } from 'lucide-react';
import UploadIngredients from '../components/UploadIngredients'; // Import the new component

const HomePage = () => {
    const auth = useAuth();
    if (!auth) return null; 

    const { user, openAuthModal } = auth;

    return (
        <div className={styles.container}>
            {user ? (
                // If the user is logged in, show the upload component
                <UploadIngredients />
            ) : (
                // If they are logged out, show the hero section
                <div className={styles.hero}>
                    <h1 className={styles.title}>Welcome to Culinary AI</h1>
                    <p className={styles.subtitle}>
                        Turn the ingredients you have into delicious meals you'll love.
                    </p>
                    <button className={styles.ctaButton} onClick={openAuthModal}>
                        <ChefHat size={20} />
                        <span>Get Started</span>
                    </button>
                </div>
            )}
        </div>
    );
};

export default HomePage;