import React, { useState } from 'react';
import supabase from '../supabaseClient';
import { X } from 'lucide-react';
import './AuthModal.css';

const AuthModal = ({ isOpen, onClose, onAuthSuccess }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  // Handle the form submission for both Sign Up and Sign In
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccessMsg(null);
    setLoading(true);

    try {
      if (isSignUp) {
        // Attempt to create a new user account
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
        });
        if (error) throw error;
        
        // If email confirmation is enabled, session will be null
        if (data.session) {
          onAuthSuccess(data.user);
        } else {
          setSuccessMsg('Success! Please check your email for a confirmation link.');
        }
      } else {
        // Attempt to sign in an existing user
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        
        // If login is successful, pass the user object to the parent component
        if (data.user) {
          onAuthSuccess(data.user);
        }
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}><X size={20} /></button>
        
        <h2>{isSignUp ? 'Create an Account' : 'Sign In'}</h2>
        <p className="modal-subtitle">
          {isSignUp ? 'Sign up to download your resume.' : 'Sign in to download your resume.'}
        </p>

        {error && <div className="modal-error">{error}</div>}
        {successMsg && <div className="modal-success">{successMsg}</div>}

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Email</label>
            <input 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
              placeholder="you@example.com"
            />
          </div>
          <div className="input-group">
            <label>Password</label>
            <input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
              placeholder="********"
            />
          </div>
          <button type="submit" className="btn btn-primary full-width" disabled={loading}>
            {loading ? 'Processing...' : (isSignUp ? 'Sign Up' : 'Sign In')}
          </button>
        </form>

        <div className="modal-toggle">
          {isSignUp ? "Already have an account? " : "Don't have an account? "}
          <button className="text-link" onClick={() => setIsSignUp(!isSignUp)}>
            {isSignUp ? 'Sign In' : 'Sign Up'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
