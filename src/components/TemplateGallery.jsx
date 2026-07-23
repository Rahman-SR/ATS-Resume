import React, { useState } from 'react';
import { Eye, CheckCircle2, Star } from 'lucide-react';
import './TemplateGallery.css';

const TEMPLATES = [
  { id: 'professional-blue', name: 'Professional Blue', category: 'Professional', ats: true, recommended: true },
  { id: 'modern-slate', name: 'Modern Slate', category: 'Modern', ats: true, recommended: false },
  { id: 'fresh-start', name: 'Fresh Start', category: 'Student', ats: false, recommended: false },
  { id: 'technical-focus', name: 'Technical Focus', category: 'Technical', ats: true, recommended: true },
  { id: 'executive-navy', name: 'Executive Navy', category: 'Executive', ats: true, recommended: false },
  { id: 'classic-ats', name: 'Classic ATS', category: 'ATS', ats: true, recommended: true },
  { id: 'elegant-gray', name: 'Elegant Gray', category: 'Minimal', ats: true, recommended: false },
  { id: 'minimal-white', name: 'Minimal White', category: 'Minimal', ats: true, recommended: false },
  { id: 'corporate-blue', name: 'Corporate Blue', category: 'Corporate', ats: true, recommended: false },
  { id: 'professional-black', name: 'Professional Black', category: 'Professional', ats: true, recommended: false },
];

export default function TemplateGallery({ onSelectTemplate }) {
  const [filter, setFilter] = useState('All');
  
  const categories = ['All', 'Professional', 'Modern', 'Minimal', 'Executive', 'Technical', 'Student', 'ATS', 'Corporate'];
  
  const filteredTemplates = filter === 'All' 
    ? TEMPLATES 
    : TEMPLATES.filter(t => t.category === filter);

  return (
    <div className="template-gallery">
      <div className="gallery-header">
        <h2>Choose a Template</h2>
        <p>Select a professionally designed template to get started.</p>
        
        <div className="category-filters">
          {categories.map(cat => (
            <button 
              key={cat}
              className={`filter-btn ${filter === cat ? 'active' : ''}`}
              onClick={() => setFilter(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="gallery-grid">
        {filteredTemplates.map(template => (
          <div key={template.id} className="template-card">
            <div className="template-preview-img">
              {template.recommended && <div className="rec-badge"><Star size={12}/> Recommended</div>}
              {/* Placeholder for template thumbnail */}
              <div className="thumbnail-placeholder">
                <span className="text-muted">Preview</span>
              </div>
              
              <div className="preview-overlay">
                <button className="btn btn-outline preview-btn">
                  <Eye size={16} /> Preview
                </button>
              </div>
            </div>
            
            <div className="template-info">
              <div className="template-title-row">
                <h3>{template.name}</h3>
                {template.ats && <span className="ats-badge" title="ATS Friendly"><CheckCircle2 size={14}/> ATS</span>}
              </div>
              <span className="category-label">{template.category}</span>
              
              <button className="btn btn-primary full-width mt-3" onClick={() => onSelectTemplate(template.id)}>
                Use Template
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
