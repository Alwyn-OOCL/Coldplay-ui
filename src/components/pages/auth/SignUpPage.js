import React, {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import './Auth.css';
import {register} from "../../../api/authApi";
import {useAuth} from "../../../contexts/AuthContext";

export default function SignUpPage() {

    const navigate = useNavigate();
    const {setToken} = useAuth();

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        agreeToTerms: false
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle signup logic here
        register(formData).then((response) => {
            setToken(response.data);
        }).finally(() => {
            navigate('/login');
        });
    };

    const handleChange = (e) => {
        const {name, value, type, checked} = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    return (
        <div className="auth-card">
            <h2>Sign Up</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <input
                        type="text"
                        name="name"
                        placeholder="Name"
                        value={formData.name}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group checkbox">
                    <label>
                        <input
                            type="checkbox"
                            name="agreeToTerms"
                            checked={formData.agreeToTerms}
                            onChange={handleChange}
                        />
                        <span>
              I agree to the <Link to="/terms" className="terms-link">Terms & Conditions</Link>
            </span>
                    </label>
                </div>
                <button type="submit" className="auth-submit signup">
                    Sign Up
                </button>
            </form>
        </div>
    );
}

