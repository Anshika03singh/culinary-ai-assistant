    import React, { useState } from 'react';
    import { useAuth } from '../context/AuthContext';
    import styles from './AuthModal.module.css';

    const AuthModal = ({ isOpen, onClose }) => {
        const [isLoginView, setIsLoginView] = useState(true);
        const [name, setName] = useState('');
        const [email, setEmail] = useState('');
        const [password, setPassword] = useState('');
        const [error, setError] = useState('');
        const { login, register } = useAuth();

        const handleSubmit = async (e) => {
            e.preventDefault();
            setError('');
            try {
                if (isLoginView) {
                    await login(email, password);
                } else {
                    await register(name, email, password);
                    // After successful registration, switch to login view
                    setIsLoginView(true);
                }
                onClose(); // Close the modal on success
            } catch (err) {
                const errorMessage = err.response?.data?.msg || 'An error occurred. Please try again.';
                setError(errorMessage);
            }
        };

        if (!isOpen) return null;

        return (
            <div className={styles.overlay} onClick={onClose}>
                <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                    <h2>{isLoginView ? 'Login' : 'Sign Up'}</h2>
                    <form onSubmit={handleSubmit}>
                        {error && <p className={styles.error}>{error}</p>}
                        {!isLoginView && (
                            <input
                                type="text"
                                placeholder="Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        )}
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <button type="submit" className={styles.submitButton}>
                            {isLoginView ? 'Login' : 'Create Account'}
                        </button>
                    </form>
                    <button
                        onClick={() => {
                            setIsLoginView(!isLoginView);
                            setError(''); // Clear error when switching views
                        }}
                        className={styles.toggleButton}
                    >
                        {isLoginView ? 'Need an account? Sign Up' : 'Have an account? Login'}
                    </button>
                </div>
            </div>
        );
    };

    // This is the line that was likely missing
    export default AuthModal;
    