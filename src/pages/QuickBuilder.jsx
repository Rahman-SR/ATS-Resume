import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import TemplateGallery from '../components/TemplateGallery';
import ResumeForm from '../components/ResumeForm';
import PlainTemplate from '../components/templates/PlainTemplate';
import ColoredTemplate from '../components/templates/ColoredTemplate';
import MinimalTemplate from '../components/templates/MinimalTemplate';
import ElegantTemplate from '../components/templates/ElegantTemplate';
import AuthModal from '../components/AuthModal';
import html2pdf from 'html2pdf.js';
import { Download, ArrowLeft, CheckCircle2, FileText } from 'lucide-react';
import supabase from '../supabaseClient';
import { useAuth } from '../contexts/AuthContext';
import { quickBuilderSampleData } from '../utils/sampleData';
import '../App.css'; // reusing editor layout

// Quick Builder maps new 10 template IDs to our existing 4 underlying templates for now
// until Phase 8 when we actually build out all 10 distinct CSS variants.
const getUnderlyingTemplate = (templateId) => {
  if (['professional-blue', 'corporate-blue'].includes(templateId)) return 'colored';
  if (['modern-slate', 'executive-navy', 'professional-black'].includes(templateId)) return 'elegant';
  if (['elegant-gray', 'minimal-white', 'fresh-start', 'technical-focus'].includes(templateId)) return 'minimal';
  return 'plain';
};

export default function QuickBuilder() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  // State
  const [step, setStep] = useState(1); // 1 = Gallery, 2 = Editor
  const [templateId, setTemplateId] = useState(null);
  const [resumeData, setResumeData] = useState(quickBuilderSampleData);
  const [showAuthModal, setShowAuthModal] = useState(false);
  
  const componentRef = useRef();

  // If we came from the Dashboard Edit button, load that data instead
  useEffect(() => {
    if (location.state?.resumeData) {
      setResumeData(location.state.resumeData);
      setTemplateId(location.state.template);
      setStep(2); // Skip gallery
    }
  }, [location.state]);

  const handleTemplateSelect = (id) => {
    setTemplateId(id);
    setStep(2); // Move to editor
  };

  const handlePrint = async () => {
    if (!user) {
      setShowAuthModal(true);
      return;
    }

    try {
      const dataToSave = {
        ...resumeData,
        metadata: { builderType: 'quick' }
      };
      
      const { error } = await supabase.rpc('save_resume_rate_limited', {
        p_data: dataToSave,
        p_template: templateId
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
      filename:     `${resumeData.personalInfo.fullName || 'Resume'}_Quick.pdf`,
      image:        { type: 'jpeg', quality: 0.98 },
      html2canvas:  { scale: 2, useCORS: true, scrollY: 0 }, 
      jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' },
      pagebreak:    { mode: 'avoid-all' }
    };

    html2pdf().set(opt).from(element).save();
  };

  // Render Template Gallery Step
  if (step === 1) {
    return (
      <div style={{minHeight: '100vh', backgroundColor: 'var(--bg-gray)'}}>
        <div style={{padding: '1.5rem 2rem', background: 'white', borderBottom: '1px solid var(--border-color)', display: 'flex', alignItems: 'center'}}>
          <button className="btn-icon" onClick={() => navigate('/builder-selection')} style={{marginRight: '1rem'}}>
            <ArrowLeft size={24} />
          </button>
          <h2 style={{fontFamily: 'var(--font-heading)'}}>Quick Builder <span style={{fontSize: '1rem', color: 'var(--text-muted)', fontWeight: 400}}>Step 1 of 2</span></h2>
        </div>
        <TemplateGallery onSelectTemplate={handleTemplateSelect} />
      </div>
    );
  }

  // Render Editor Step
  const mappedTemplate = getUnderlyingTemplate(templateId);

  return (
    <>
      <header className="app-header">
        <div className="header-left">
          <button className="btn-icon" onClick={() => setStep(1)} style={{ color: 'white', marginRight: '1rem' }} title="Back to Templates">
            <ArrowLeft size={20} />
          </button>
          <div className="header-logo">
            <FileText size={20} color="white" />
          </div>
          <h1 className="header-title">Quick Builder</h1>
        </div>
        <div className="header-right">
          <div style={{display: 'flex', alignItems: 'center', marginRight: '1rem', color: 'var(--text-muted)'}}>
            <CheckCircle2 size={16} style={{marginRight: '0.25rem', color: '#10b981'}}/> Auto-saving
          </div>
          <button className="btn btn-primary" onClick={handlePrint}>
            <Download size={16} /> Download PDF
          </button>
        </div>
      </header>

      <div className="app-container">
        <div className="sidebar" style={{ backgroundColor: '#f8fafc' }}>
          <div style={{ marginBottom: '1.5rem', padding: '1rem', background: '#eff6ff', borderRadius: '8px', border: '1px solid #bfdbfe' }}>
            <h3 style={{color: '#1d4ed8', fontSize: '1rem', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem'}}><Zap size={16}/> Quick Edit Mode</h3>
            <p style={{ color: '#1e40af', fontSize: '0.875rem' }}>We've pre-filled this template with professional sample content. Simply edit the fields below to match your experience.</p>
          </div>
          <ResumeForm data={resumeData} onChange={setResumeData} />
        </div>

        <div className="preview-section">          
          <div className="template-wrapper">
            <div className="template-container" ref={componentRef}>
              {mappedTemplate === 'colored' && <ColoredTemplate data={resumeData} />}
              {mappedTemplate === 'plain' && <PlainTemplate data={resumeData} />}
              {mappedTemplate === 'minimal' && <MinimalTemplate data={resumeData} />}
              {mappedTemplate === 'elegant' && <ElegantTemplate data={resumeData} />}
            </div>
          </div>
        </div>
      </div>

      <AuthModal 
        isOpen={showAuthModal} 
        onClose={() => setShowAuthModal(false)} 
        onAuthSuccess={() => setShowAuthModal(false)}
      />
    </>
  );
}
