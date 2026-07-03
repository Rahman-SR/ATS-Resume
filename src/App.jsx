import { useState, useRef, useEffect } from 'react';
import ResumeForm from './components/ResumeForm';
import PlainTemplate from './components/templates/PlainTemplate';
import ColoredTemplate from './components/templates/ColoredTemplate';
import AuthModal from './components/AuthModal';
import HistoryModal from './components/HistoryModal';
import html2pdf from 'html2pdf.js';
import { Download, LayoutTemplate, LogOut, History } from 'lucide-react';
import supabase from './supabaseClient';
import './App.css'; 

const initialData = {
  personalInfo: {
    fullName: 'John Doe',
    email: 'john@example.com',
    phone: '(555) 123-4567',
    address: 'New York, NY',
    summary: 'A passionate professional looking for new opportunities to leverage my skills and experience.',
  },
  education: [
    { id: '1', school: 'University of Technology', degree: 'B.S. Computer Science', year: '2020' }
  ],
  experience: [
    { id: '1', company: 'Tech Corp', role: 'Software Engineer', duration: '2021 - Present', description: 'Developed modern web applications using React and Node.js.' }
  ],
  practicalExperience: [
    { id: '1', project: 'Open Source E-commerce', role: 'Contributor', duration: '2022', description: 'Implemented payment gateway integration.' }
  ],
  certifications: [
    { id: '1', name: 'AWS Certified Solutions Architect', issuer: 'Amazon Web Services', year: '2022' }
  ],
  skills: 'React, JavaScript, HTML, CSS, Supabase',
  languages: 'English (Native), Spanish (Intermediate)'
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
  
  // Reference to the DOM element that we will convert to PDF
  const componentRef = useRef();

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

  // Handle generating and downloading the PDF
  const handlePrint = async () => {
    // Require user to be logged in before they can download
    if (!user) {
      setShowAuthModal(true);
      return;
    }

    // Auto-save the current resume to the user's history in Supabase
    try {
      await supabase
        .from('resumes')
        .insert([
          {
            user_id: user.id,
            data: resumeData,
            template: template,
          }
        ]);
    } catch (err) {
      console.error('Error auto-saving to history:', err);
    }

    // Grab the DOM element containing the resume template
    const element = componentRef.current;
    if (!element) return;
    
    // Configure html2pdf settings for high quality A4 output
    const opt = {
      margin:       [0, 0, 0, 0], // Top, Left, Bottom, Right margins
      filename:     `${resumeData.personalInfo.fullName || 'Resume'}_Resume.pdf`,
      image:        { type: 'jpeg', quality: 0.98 },
      html2canvas:  { scale: 2, useCORS: true }, // scale: 2 ensures high-res text
      jsPDF:        { unit: 'in', format: 'a4', orientation: 'portrait' }
    };

    // Generate and save the PDF
    html2pdf().set(opt).from(element).save();
  };

  return (
    <div className="app-container">
      <div className="sidebar">
        <div style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <h1 style={{ color: 'var(--primary-blue)', marginBottom: '0.5rem' }}>Resume Builder</h1>
            <p style={{ color: 'var(--text-muted)' }}>Fill in your details to generate a professional resume.</p>
          </div>
          {user ? (
            <div style={{ display: 'flex', gap: '0.5rem', flexDirection: 'column' }}>
              <button className="btn btn-outline" onClick={() => setShowHistoryModal(true)} style={{ fontSize: '0.8rem', padding: '0.4rem 0.8rem' }}>
                <History size={14} /> History
              </button>
              <button className="btn btn-outline" onClick={handleSignOut} style={{ fontSize: '0.8rem', padding: '0.4rem 0.8rem' }}>
                <LogOut size={14} /> Sign Out
              </button>
            </div>
          ) : (
            <button className="btn btn-outline" onClick={() => setShowAuthModal(true)} style={{ fontSize: '0.8rem', padding: '0.4rem 0.8rem' }}>
              Sign In
            </button>
          )}
        </div>
        <ResumeForm data={resumeData} onChange={setResumeData} />
      </div>

      <div className="preview-section">
        <div className="preview-controls">
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <LayoutTemplate size={20} color="var(--primary-blue)" />
            <select 
              value={template} 
              onChange={(e) => setTemplate(e.target.value)}
              style={{
                padding: '0.5rem',
                borderRadius: '6px',
                border: '1px solid var(--border-color)',
                fontFamily: 'Inter'
              }}
            >
              <option value="colored">Modern Colored (Blue & White)</option>
              <option value="plain">Classic Plain</option>
            </select>
          </div>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <button className="btn btn-primary" onClick={handlePrint}>
              <Download size={18} />
              Download PDF
            </button>
          </div>
        </div>

        <div className="template-wrapper">
          <div className="template-container" ref={componentRef}>
            {template === 'colored' ? (
               <ColoredTemplate data={resumeData} />
            ) : (
               <PlainTemplate data={resumeData} />
            )}
          </div>
        </div>
      </div>

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
    </div>
  );
}

export default App;
