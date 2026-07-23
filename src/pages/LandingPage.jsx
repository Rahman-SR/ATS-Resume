import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, CheckCircle2, Zap, Layout, FileText, Star, Rocket, Settings, Shield, Award } from 'lucide-react';
import './LandingPage.css';

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="landing-page">
      {/* Navbar */}
      <nav className="landing-nav">
        <div className="nav-logo">
          <div className="logo-icon"><FileText size={20} color="white" /></div>
          <span>ResumeBuilder</span>
        </div>
        <div className="nav-links">
          <a href="#features">Features</a>
          <a href="#comparison">Compare</a>
          <a href="#roadmap">Coming Soon</a>
        </div>
        <div className="nav-actions">
          <button className="btn btn-outline" onClick={() => navigate('/dashboard')}>Login</button>
          <button className="btn btn-primary" onClick={() => navigate('/builder-selection')}>Get Started</button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <div className="badge">⭐ Premium Resume Builder V2</div>
          <h1 className="hero-title">
            Build a Resume<br/>
            <span className="text-gradient">That Gets You Hired Faster</span>
          </h1>
          <p className="hero-subtitle">
            Create professional, ATS-friendly resumes in minutes. Choose between our blazing fast Quick Builder or take full control with the Classic Editor.
          </p>
          <div className="hero-cta">
            <button className="btn btn-primary btn-lg" onClick={() => navigate('/builder-selection')}>
              Create New Resume <ArrowRight size={18} />
            </button>
          </div>
          <div className="hero-stats">
            <div className="stat">
              <span className="stat-num">10+</span>
              <span className="stat-label">ATS Templates</span>
            </div>
            <div className="stat">
              <span className="stat-num">100%</span>
              <span className="stat-label">Free to Try</span>
            </div>
          </div>
        </div>
        <div className="hero-visual">
          <div className="resume-mockup">
            <div className="mockup-header"></div>
            <div className="mockup-body">
              <div className="mockup-line w-3-4"></div>
              <div className="mockup-line w-full"></div>
              <div className="mockup-line w-5-6"></div>
              <div className="mockup-line w-full mt-4"></div>
              <div className="mockup-line w-5-6"></div>
            </div>
          </div>
          {/* Floating Elements */}
          <div className="floating-card card-1">
            <CheckCircle2 color="var(--primary-blue)" size={24} /> ATS Optimized
          </div>
          <div className="floating-card card-2">
            <Star color="#f59e0b" size={24} /> Land Interviews
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="features-section">
        <div className="section-header">
          <h2>Why Choose Our Builder?</h2>
          <p>Everything you need to land your dream job.</p>
        </div>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon"><Zap size={24} /></div>
            <h3>Lightning Fast</h3>
            <p>Our new Quick Builder generates a professional resume in minutes using pre-written sample content.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon"><Layout size={24} /></div>
            <h3>Perfect Layouts</h3>
            <p>Meticulously calculated A4 pages. No more awkward page breaks or text overflow.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon"><Shield size={24} /></div>
            <h3>Secure & Private</h3>
            <p>Your data is securely stored in our cloud history. Access and edit your past resumes anytime.</p>
          </div>
        </div>
      </section>

      {/* Builder Comparison */}
      <section id="comparison" className="comparison-section">
        <div className="section-header">
          <h2>Two Ways to Build</h2>
          <p>Choose the experience that fits your style.</p>
        </div>
        <div className="comparison-cards">
          <div className="compare-card premium">
            <div className="compare-header">
              <div className="compare-icon"><Zap size={32} /></div>
              <h3>Quick Builder ⭐</h3>
              <p>For those who want a resume fast.</p>
            </div>
            <ul className="compare-list">
              <li><CheckCircle2 size={16} color="var(--primary-blue)" /> Choose template first</li>
              <li><CheckCircle2 size={16} color="var(--primary-blue)" /> Pre-written sample content</li>
              <li><CheckCircle2 size={16} color="var(--primary-blue)" /> Guided replacement</li>
              <li><CheckCircle2 size={16} color="var(--primary-blue)" /> Done in 5 minutes</li>
            </ul>
          </div>
          <div className="compare-card">
            <div className="compare-header">
              <div className="compare-icon"><Settings size={32} /></div>
              <h3>Classic Builder</h3>
              <p>For those who want total control.</p>
            </div>
            <ul className="compare-list">
              <li><CheckCircle2 size={16} color="var(--text-muted)" /> Build from scratch</li>
              <li><CheckCircle2 size={16} color="var(--text-muted)" /> Flexible sections</li>
              <li><CheckCircle2 size={16} color="var(--text-muted)" /> Manual data entry</li>
              <li><CheckCircle2 size={16} color="var(--text-muted)" /> Live side-by-side preview</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Roadmap / Coming Soon */}
      <section id="roadmap" className="roadmap-section">
        <div className="section-header">
          <h2>Coming Soon</h2>
          <p>We are constantly upgrading our platform. Here is what's next.</p>
        </div>
        <div className="roadmap-grid">
          <div className="roadmap-item"><Rocket size={18}/> AI Resume Writer</div>
          <div className="roadmap-item"><Rocket size={18}/> Cover Letter Generator</div>
          <div className="roadmap-item"><Rocket size={18}/> AI ATS Score Analysis</div>
          <div className="roadmap-item"><Rocket size={18}/> AI Grammar Fix</div>
          <div className="roadmap-item"><Rocket size={18}/> LinkedIn Optimizer</div>
          <div className="roadmap-item"><Rocket size={18}/> Multiple Languages</div>
        </div>
      </section>

      {/* Footer */}
      <footer className="landing-footer">
        <div className="footer-content">
          <div className="footer-logo">
            <FileText size={20} color="white" /> ResumeBuilder
          </div>
          <p>&copy; 2026 Resume Builder SaaS. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
