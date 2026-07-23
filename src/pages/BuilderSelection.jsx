import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Zap, Settings, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import AuthModal from '../components/AuthModal';
import './BuilderSelection.css';

export default function BuilderSelection() {
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [pendingRoute, setPendingRoute] = useState(null);

  const handleSelect = (route) => {
    if (user) {
      navigate(route);
    } else {
      setPendingRoute(route);
      setShowAuthModal(true);
    }
  };

  const handleAuthSuccess = () => {
    setShowAuthModal(false);
    if (pendingRoute) {
      navigate(pendingRoute);
    } else {
      navigate('/dashboard');
    }
  };

  return (
    <div className="selection-page">
      <div className="selection-header">
        <button className="btn-icon" onClick={() => navigate('/')}>
          <ArrowLeft size={24} />
        </button>
        <h2>Choose Your Experience</h2>
        <p>How would you like to build your resume?</p>
      </div>

      <div className="selection-cards">
        {/* Quick Builder Card */}
        <div className="select-card premium" onClick={() => handleSelect('/build/quick')}>
          <div className="card-badge">⭐ Recommended</div>
          <div className="select-icon"><Zap size={40} /></div>
          <h3>Quick Builder</h3>
          <p className="select-subtitle">Create a professional resume in minutes.</p>
          
          <ul className="select-features">
            <li><CheckCircle2 size={18} color="var(--primary-blue)" /> ATS Friendly</li>
            <li><CheckCircle2 size={18} color="var(--primary-blue)" /> Professional Templates</li>
            <li><CheckCircle2 size={18} color="var(--primary-blue)" /> Replace Sample Content</li>
            <li><CheckCircle2 size={18} color="var(--primary-blue)" /> Live Preview</li>
            <li><CheckCircle2 size={18} color="var(--primary-blue)" /> Easy Editing</li>
          </ul>

          <button className="btn btn-primary full-width">Start Quick Builder</button>
        </div>

        {/* Classic Builder Card */}
        <div className="select-card" onClick={() => handleSelect('/build/classic')}>
          <div className="select-icon"><Settings size={40} color="var(--text-muted)" /></div>
          <h3>Classic Builder</h3>
          <p className="select-subtitle">Build your resume from scratch.</p>
          
          <ul className="select-features">
            <li><CheckCircle2 size={18} color="var(--text-muted)" /> Full Control</li>
            <li><CheckCircle2 size={18} color="var(--text-muted)" /> Flexible Sections</li>
            <li><CheckCircle2 size={18} color="var(--text-muted)" /> Manual Editing</li>
            <li><CheckCircle2 size={18} color="var(--text-muted)" /> Advanced Customization</li>
          </ul>

          <button className="btn btn-outline full-width">Start Classic Builder</button>
        </div>
      </div>

      <AuthModal 
        isOpen={showAuthModal} 
        onClose={() => setShowAuthModal(false)} 
        onAuthSuccess={handleAuthSuccess}
      />
    </div>
  );
}
