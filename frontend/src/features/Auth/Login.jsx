// src/features/Auth/Login.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Login.module.css'; // Import CSS Module

// Import Google icon from React Icons (assuming you have it installed)
// If not installed: npm install react-icons
import { FcGoogle } from 'react-icons/fc';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleLogin = (e) => {
        e.preventDefault();
        // Implement your login logic here
        console.log('Attempting to log in with:', { email, password });
        // For now, just a dummy alert
        alert('Login functionality not yet implemented for email/password.');
    };

    const handleGoogleLogin = () => {
        // Implement Google login logic here
        console.log('Attempting to log in with Google');
        // For now, just a dummy alert
        alert('Google login not yet implemented.');
    };

    return (
        <div className={styles.loginContainer}>
            {/* Background image is set via CSS, referencing the /public folder */}
            <div className={styles.loginCard}>
                <h1 className={styles.title}>
                    Log in | <span className={styles.edition}>PrimeSoft Account</span>
                </h1>
                <p className={styles.subtitle}>
                    Access your PrimeSoft services and projects.
                </p>

                {/* Continue with Google Button */}
                <button
                    className={styles.googleLoginBtn}
                    onClick={handleGoogleLogin}
                >
                    <FcGoogle className={styles.googleIcon} />
                    Continue with Google
                </button>

                <div className={styles.divider}>
                    <span>Or</span>
                </div>

                {/* Email/Password Form */}
                <form onSubmit={handleLogin} className={styles.loginForm}>
                    <div className={styles.inputGroup}>
                        <label htmlFor="email" className={styles.label}>
                            Email Address
                        </label>
                        <input
                            type="email"
                            id="email"
                            className={styles.inputField}
                            placeholder="your@email.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className={styles.inputGroup}>
                        <label htmlFor="password" className={styles.label}>
                            Password
                        </label>
                        <div className={styles.passwordInputWrapper}>
                            <input
                                type={showPassword ? 'text' : 'password'}
                                id="password"
                                className={styles.inputField}
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <button
                                type="button"
                                className={styles.togglePassword}
                                onClick={() => setShowPassword(!showPassword)}
                                aria-label={showPassword ? 'Hide password' : 'Show password'}
                            >
                                {/* Simple eye icon, you can replace with react-icons if desired */}
                                {showPassword ? '🙈' : '👁️'} 
                            </button>
                        </div>
                        <Link to="/forgot-password" className={styles.forgotPassword}>
                            Forgot password?
                        </Link>
                    </div>

                    <button type="submit" className={styles.loginButton}>
                        Log In
                    </button>
                </form>

                <p className={styles.signupText}>
                    Don't have an account?{' '}
                    <Link to="/signup" className={styles.signupLink}>
                        Sign up
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Login;