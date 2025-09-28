import React from 'react';
import { useAuth } from '../context/AuthContext';
import styles from './ProfilePage.module.css'; // This line imports the styles

const ProfilePage = () => {
    const { user } = useAuth();

    if (!user) {
        return <p>Please log in to view your profile.</p>;
    }

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Profile</h1>
            <div className={styles.userInfo}>
                <p><strong>Name:</strong> {user.name}</p>
                <p><strong>Email:</strong> {user.email}</p>
            </div>
             {/* We will add dietary preferences here later */}
        </div>
    );
};

export default ProfilePage;