import React, { useState, useEffect } from 'react';
import { Lock, Mail, Eye, EyeOff } from 'lucide-react';

const LoginOverlay = ({ onLogin }) => {
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState(false);
    const numBars = 50;

    useEffect(() => {
        let activeBars = 0;
        const interval = setInterval(() => {
            const bars = document.querySelectorAll('.auth-bar');
            if (bars.length === 0) return;

            bars[activeBars % numBars].classList.add('active');

            if (activeBars > 8) {
                bars[(activeBars - 8) % numBars].classList.remove('active');
            }

            activeBars++;
        }, 100);

        return () => clearInterval(interval);
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (password === 'Admin123') {
            onLogin();
        } else {
            setError(true);
            setTimeout(() => setError(false), 2000);
        }
    };

    return (
        <div className="login-overlay-full">
            <div className="auth-container">
                <div className="circle-container">
                    {[...Array(numBars)].map((_, i) => (
                        <div
                            key={i}
                            className="auth-bar"
                            style={{
                                transform: `rotate(${(360 / numBars) * i}deg) translateY(-150px)`
                            }}
                        />
                    ))}
                </div>

                <div className="login-auth-box">
                    <h2>Admin Login</h2>

                    <form onSubmit={handleSubmit}>
                        <div className="auth-input-group">
                            <input
                                type="email"
                                placeholder="Email"
                                defaultValue="admin@invoice.tool"
                                readOnly
                            />
                            <span className="auth-input-icon">
                                <Mail size={18} />
                            </span>
                        </div>

                        <div className="auth-input-group">
                            <input
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Password"
                                className={error ? 'error' : ''}
                                required
                                autoFocus
                            />
                            <span
                                className="auth-input-icon cursor-pointer pointer-events-auto"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? <EyeOff size={18} /> : <Lock size={18} />}
                            </span>
                        </div>

                        <button type="submit" className="login-auth-btn mt-4">
                            LOGIN
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default LoginOverlay;
