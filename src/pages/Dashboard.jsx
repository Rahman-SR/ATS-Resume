import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import supabase from '../supabaseClient';
import { useAuth } from '../contexts/AuthContext';
import { FileText, Edit2, Copy, Download, Trash2, ArrowLeft, LogOut, User } from 'lucide-react';
import html2pdf from 'html2pdf.js';
import './Dashboard.css';

// Components required to invisibly generate PDF
import PlainTemplate from '../components/templates/PlainTemplate';
import ColoredTemplate from '../components/templates/ColoredTemplate';
import MinimalTemplate from '../components/templates/MinimalTemplate';
import ElegantTemplate from '../components/templates/ElegantTemplate';
import { createRoot } from 'react-dom/client';

export default function Dashboard() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate('/');
      return;
    }
    fetchHistory();
  }, [user]);

  const fetchHistory = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('resumes')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(5); // Only latest 5
        
      if (error) throw error;
      setResumes(data || []);
    } catch (err) {
      console.error('Error fetching history:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (resume) => {
    // If it has a quick builder type, navigate to quick builder, else classic builder
    const builderType = resume.data?.metadata?.builderType === 'quick' ? 'quick' : 'classic';
    // For V2 we would ideally load this into state. 
    // Wait, the Quick/Classic builders currently initialize from a blank state. We need a way to pass this data to them.
    // The easiest way without rewriting the context is localStorage or React Router state.
    navigate(`/build/${builderType}`, { state: { resumeId: resume.id, resumeData: resume.data, template: resume.template } });
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this resume?')) return;
    try {
      const { error } = await supabase.from('resumes').delete().eq('id', id);
      if (error) throw error;
      setResumes(resumes.filter(h => h.id !== id));
    } catch (err) {
      alert('Error deleting resume: ' + err.message);
    }
  };

  const handleDuplicate = async (resume) => {
    try {
      const duplicatedData = { ...resume.data };
      if (duplicatedData.personalInfo) {
        duplicatedData.personalInfo.fullName = `${duplicatedData.personalInfo.fullName || 'Copy'} (Copy)`;
      }
      
      const { error } = await supabase.rpc('save_resume_rate_limited', {
        p_data: duplicatedData,
        p_template: resume.template
      });
      
      if (error) throw error;
      fetchHistory(); // refresh
    } catch (err) {
      console.error('Error duplicating:', err);
    }
  };

  const handleDownload = (resume) => {
    // We need to render the correct template off-screen and download it
    const container = document.createElement('div');
    container.style.position = 'absolute';
    container.style.left = '-9999px';
    document.body.appendChild(container);
    
    const root = createRoot(container);
    
    let TemplateComponent = ColoredTemplate;
    if (resume.template === 'plain') TemplateComponent = PlainTemplate;
    if (resume.template === 'minimal') TemplateComponent = MinimalTemplate;
    if (resume.template === 'elegant') TemplateComponent = ElegantTemplate;

    root.render(
      <div className="template-wrapper" style={{ margin: 0, padding: 0 }}>
        <div className="template-container" style={{ width: '210mm', minHeight: '297mm', background: 'white' }}>
          <TemplateComponent data={resume.data} />
        </div>
      </div>
    );

    setTimeout(() => {
      const opt = {
        margin:       0,
        filename:     `${resume.data?.personalInfo?.fullName || 'Resume'}_Download.pdf`,
        image:        { type: 'jpeg', quality: 0.98 },
        html2canvas:  { scale: 2, useCORS: true, scrollY: 0 }, 
        jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' },
        pagebreak:    { mode: 'avoid-all' }
      };

      html2pdf().set(opt).from(container.firstChild).save().then(() => {
        root.unmount();
        document.body.removeChild(container);
      });
    }, 1000);
  };

  return (
    <div className="dashboard-page">
      <nav className="dashboard-nav">
        <div className="nav-logo" onClick={() => navigate('/')} style={{cursor: 'pointer'}}>
          <div className="logo-icon"><FileText size={20} color="white" /></div>
          <span>Dashboard</span>
        </div>
        <div className="nav-actions">
          <button className="btn btn-primary" onClick={() => navigate('/builder-selection')}>+ Create New</button>
          <button className="btn btn-outline danger" onClick={() => { signOut(); navigate('/'); }}>
            <LogOut size={16} /> Sign Out
          </button>
        </div>
      </nav>

      <main className="dashboard-content">
        <div className="dashboard-header">
          <h2>Welcome back{user?.email ? `, ${user.email.split('@')[0]}` : ''}</h2>
          <p>Manage your latest resumes and continue building your career.</p>
        </div>

        <section className="resume-grid-section">
          <div className="section-header-inline">
            <h3>Recent Resumes</h3>
            <span>Showing latest {resumes.length}</span>
          </div>

          {loading ? (
            <p>Loading your history...</p>
          ) : resumes.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon"><FileText size={48} color="var(--border-color)"/></div>
              <h3>No resumes found</h3>
              <p>You haven't created any resumes yet.</p>
              <button className="btn btn-primary" onClick={() => navigate('/builder-selection')} style={{marginTop: '1rem'}}>
                Create Your First Resume
              </button>
            </div>
          ) : (
            <div className="resume-grid">
              {resumes.map(resume => {
                const builderType = resume.data?.metadata?.builderType === 'quick' ? 'Quick Builder' : 'Classic Builder';
                const name = resume.data?.personalInfo?.fullName || 'Untitled Resume';
                const date = new Date(resume.created_at).toLocaleDateString();
                
                return (
                  <div key={resume.id} className="resume-card">
                    <div className="resume-card-preview">
                      <FileText size={64} color="var(--border-color)" />
                      <div className="builder-badge">{builderType}</div>
                    </div>
                    <div className="resume-card-body">
                      <h4>{name}</h4>
                      <p className="resume-meta">Template: {resume.template} &bull; {date}</p>
                      
                      <div className="resume-actions">
                        <button className="action-btn" onClick={() => handleEdit(resume)} title="Edit">
                          <Edit2 size={16} />
                        </button>
                        <button className="action-btn" onClick={() => handleDuplicate(resume)} title="Duplicate">
                          <Copy size={16} />
                        </button>
                        <button className="action-btn" onClick={() => handleDownload(resume)} title="Download">
                          <Download size={16} />
                        </button>
                        <button className="action-btn danger" onClick={() => handleDelete(resume.id)} title="Delete">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
