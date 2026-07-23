import React, { useState, useRef } from 'react';
import ResumeForm from '../components/ResumeForm';
import PlainTemplate from '../components/templates/PlainTemplate';
import ColoredTemplate from '../components/templates/ColoredTemplate';
import MinimalTemplate from '../components/templates/MinimalTemplate';
import ElegantTemplate from '../components/templates/ElegantTemplate';
import AuthModal from '../components/AuthModal';
import HistoryModal from '../components/HistoryModal';
import html2pdf from 'html2pdf.js';
import { Download, LogOut, History, User, FileText, ArrowLeft } from 'lucide-react';
import supabase from '../supabaseClient';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import '../App.css'; 

const initialData = {
  personalInfo: {
    fullName: '',
    jobTitle: '',
    email: '',
    phone: '',
    address: '',
    socialPlatform: 'LinkedIn',
    socialLink: '',
    summary: '',
  },
  education: [],
  experience: [],
  practicalExperience: [],
  certifications: [],
  skills: '',
  languages: '',
  customDetails: []
};

function ClassicBuilder() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  
  const [resumeData, setResumeData] = useState(initialData);
  const [template, setTemplate] = useState('plain');
  
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showHistoryModal, setShowHistoryModal] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  
  const componentRef = useRef();

  const handlePrint = async () => {
    if (!user) {
      setShowAuthModal(true);
      return;
    }

    try {
      // Append metadata builderType for V2
      const dataToSave = {
        ...resumeData,
        metadata: { builderType: 'classic' }
      };
      
      const { error } = await supabase.rpc('save_resume_rate_limited', {
        p_data: dataToSave,
        p_template: template
      });

      if (error) {
        if (error.message.includes('Rate limit exceeded')) {
          alert('You have reached the maximum download limit (100 times per 15 minutes). Please try again later.');
          return;
        } else {
          throw error;
        }
      }
    } catch (err) {
      console.error('Error auto-saving to history:', err);
    }

    const element = componentRef.current;
    if (!element) return;
    
    const opt = {
      margin:       0,
      filename:     `${resumeData.personalInfo.fullName || 'Resume'}_Classic.pdf`,
      image:        { type: 'jpeg', quality: 0.98 },
      html2canvas:  { scale: 2, useCORS: true, scrollY: 0 }, 
      jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' },
      pagebreak:    { mode: 'avoid-all' }
    };

    html2pdf().set(opt).from(element).save();
  };

  return (
    <>
      <header className="app-header">
        <div className="header-left">
          <button className="btn-icon" onClick={() => navigate('/dashboard')} style={{ color: 'white', marginRight: '1rem' }}>
            <ArrowLeft size={20} />
          </button>
          <div className="header-logo">
            <FileText size={20} color="white" />
          </div>
          <h1 className="header-title">Classic Builder</h1>
        </div>
        <div className="header-right">
          <select 
            value={template} 
            onChange={(e) => setTemplate(e.target.value)}
            className="header-select"
          >
            <option value="plain">Classic Plain</option>
          </select>
          <button className="btn btn-primary" onClick={handlePrint}>
            <Download size={16} /> Download PDF
          </button>
          {user ? (
            <div className="profile-dropdown-container">
              <button 
                className="btn btn-outline profile-btn" 
                onClick={() => setShowProfileMenu(!showProfileMenu)}
              >
                <User size={16} /> Profile
              </button>
              {showProfileMenu && (
                <div className="profile-dropdown-menu">
                  <button className="dropdown-item" onClick={() => { setShowProfileMenu(false); setShowHistoryModal(true); }}>
                    <History size={16} /> History
                  </button>
                  <button className="dropdown-item danger" onClick={() => { setShowProfileMenu(false); signOut(); }}>
                    <LogOut size={16} /> Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button className="btn btn-outline" onClick={() => setShowAuthModal(true)}>
              <User size={16} /> Sign In
            </button>
          )}
        </div>
      </header>

      <div className="app-container">
        <div className="sidebar">
          <div style={{ marginBottom: '1.5rem' }}>
            <p style={{ color: 'var(--text-muted)' }}>Build your resume section by section with full manual control.</p>
          </div>
          <ResumeForm data={resumeData} onChange={setResumeData} />
        </div>

        <div className="preview-section">          
          <div className="template-wrapper">
            <div className="template-container" ref={componentRef}>
              {template === 'colored' && <ColoredTemplate data={resumeData} />}
              {template === 'plain' && <PlainTemplate data={resumeData} />}
              {template === 'minimal' && <MinimalTemplate data={resumeData} />}
              {template === 'elegant' && <ElegantTemplate data={resumeData} />}
            </div>
          </div>
        </div>
      </div>

      <AuthModal 
        isOpen={showAuthModal} 
        onClose={() => setShowAuthModal(false)} 
        onAuthSuccess={() => setShowAuthModal(false)}
      />
      
      <HistoryModal
        isOpen={showHistoryModal}
        onClose={() => setShowHistoryModal(false)}
        user={user}
        onLoadResume={(data, tmpl) => {
          setResumeData(data);
          setTemplate(tmpl);
        }}
      />
    </>
  );
}

export default ClassicBuilder;
