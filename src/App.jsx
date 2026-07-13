import { useState, useRef, useEffect } from 'react';
import ResumeForm from './components/ResumeForm';
import PlainTemplate from './components/templates/PlainTemplate';
import ColoredTemplate from './components/templates/ColoredTemplate';
import MinimalTemplate from './components/templates/MinimalTemplate';
import ElegantTemplate from './components/templates/ElegantTemplate';
import AuthModal from './components/AuthModal';
import HistoryModal from './components/HistoryModal';
import html2pdf from 'html2pdf.js';
import { Download, LogOut, History, User, FileText } from 'lucide-react';
import supabase from './supabaseClient';
import './App.css'; 

// ==========================================
// INITIAL DATA STRUCTURE
// This defines the default empty state for a new resume.
// ==========================================
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

function App() {
  // Main state holding the entire resume data structure
  const [resumeData, setResumeData] = useState(initialData);
  
  // State for the selected template style ('colored' or 'plain')
  const [template, setTemplate] = useState('colored');
  
  // Authentication states
  const [user, setUser] = useState(null);
  
  // Modal visibility states
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showHistoryModal, setShowHistoryModal] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  
  // Reference to the DOM element that we will convert to PDF
  const componentRef = useRef();

  // ==========================================
  // COMPONENT LIFECYCLE & AUTHENTICATION
  // ==========================================
  
  // Run once when the component mounts to check if the user is already logged in
  useEffect(() => {
    // Check active sessions and sets the user
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    // Listen for changes on auth state (e.g. user signs in or out)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      const currentUser = session?.user ?? null;
      setUser(currentUser);
      
      // If the user logs out, reset the form to the initial placeholder data
      if (!currentUser) {
        setResumeData(initialData);
      }
    });

    // Cleanup subscription on unmount
    return () => subscription.unsubscribe();
  }, []);

  // Handle signing out the user
  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

  // ==========================================
  // PDF GENERATION & SAVING
  // ==========================================
  
  // Handle generating and downloading the PDF
  const handlePrint = async () => {
    // Require user to be logged in before they can download
    if (!user) {
      setShowAuthModal(true);
      return;
    }

    // Auto-save the current resume to the user's history in Supabase using the rate-limited RPC
    try {
      const { error } = await supabase.rpc('save_resume_rate_limited', {
        p_data: resumeData,
        p_template: template
      });

      if (error) {
        if (error.message.includes('Rate limit exceeded')) {
          alert('You have reached the maximum download limit (100 times per 15 minutes). Please try again later.');
          return; // Stop the PDF generation
        } else {
          throw error;
        }
      }
    } catch (err) {
      console.error('Error auto-saving to history:', err);
      // We don't block the download for generic errors to not ruin user experience
    }

    // Grab the DOM element containing the resume template
    const element = componentRef.current;
    if (!element) return;
    
    // Configure html2pdf settings for high quality A4 output
    const opt = {
      margin:       0,
      filename:     `${resumeData.personalInfo.fullName || 'Resume'}_Resume.pdf`,
      image:        { type: 'jpeg', quality: 0.98 },
      html2canvas:  { scale: 2, useCORS: true, scrollY: 0 }, 
      jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' },
      pagebreak:    { mode: 'avoid-all' }
    };

    // Generate and save the PDF
    html2pdf().set(opt).from(element).save();
  };

  return (
    <>
      {/* Top Header Bar */}
      <header className="app-header">
        <div className="header-left">
          <div className="header-logo">
            <FileText size={20} color="white" />
          </div>
          <h1 className="header-title">Resume Builder</h1>
        </div>
        <div className="header-right">
          <select 
            value={template} 
            onChange={(e) => setTemplate(e.target.value)}
            className="header-select"
          >
            <option value="colored">Modern Colored</option>
            <option value="plain">Classic Plain</option>
            <option value="minimal">Minimalist</option>
            <option value="elegant">Elegant Dark</option>
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
                  <button className="dropdown-item danger" onClick={() => { setShowProfileMenu(false); handleSignOut(); }}>
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

      {/* ========================================== */}
      {/* MAIN APP LAYOUT (SPLIT VIEW) */}
      {/* ========================================== */}
      <div className="app-container">
        {/* Left Side: Form Input Area */}
        <div className="sidebar">
          <div style={{ marginBottom: '1.5rem' }}>
            <p style={{ color: 'var(--text-muted)' }}>Fill in your details to generate a professional resume.</p>
          </div>
          <ResumeForm data={resumeData} onChange={setResumeData} />
        </div>

        {/* Right Side: Live PDF Preview Area */}
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

      {/* ========================================== */}
      {/* OVERLAY MODALS (Authentication & History) */}
      {/* ========================================== */}
      <AuthModal 
        isOpen={showAuthModal} 
        onClose={() => setShowAuthModal(false)} 
        onAuthSuccess={(userData) => {
          setShowAuthModal(false);
          setUser(userData);
        }}
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

export default App;
