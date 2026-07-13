import React, { useState } from 'react';
import './ResumeForm.css';
import { Plus, Trash2, ChevronDown, ChevronUp } from 'lucide-react';

const ResumeForm = ({ data, onChange }) => {

  // Track which sections are collapsed (Personal Info is always open)
  const [collapsed, setCollapsed] = useState({});

  const toggleSection = (section) => {
    setCollapsed(prev => ({ ...prev, [section]: !prev[section] }));
  };

  // Handler for all personal information fields
  const handlePersonalInfoChange = (e) => {
    let { name, value } = e.target;
    
    // Restrict phone to numbers only and max 10 digits
    if (name === 'phone') {
      value = value.replace(/\D/g, '').slice(0, 10);
    }

    onChange({
      ...data,
      personalInfo: { ...data.personalInfo, [name]: value }
    });
  };

  // --- Generic Array Handlers ---
  const handleArrayChange = (field, index, e) => {
    const { name, value } = e.target;
    const newArr = [...(data[field] || [])];
    newArr[index][name] = value;
    onChange({ ...data, [field]: newArr });
  };

  const addArrayItem = (field, emptyItemShape) => {
    onChange({ 
      ...data, 
      [field]: [...(data[field] || []), { id: Date.now().toString(), ...emptyItemShape }] 
    });
  };

  const removeArrayItem = (field, index) => {
    const newArr = (data[field] || []).filter((_, i) => i !== index);
    onChange({ ...data, [field]: newArr });
  };

  // --- Skills & Languages Handlers ---
  const handleSkillsChange = (e) => {
    onChange({ ...data, skills: e.target.value });
  };
  const handleLanguagesChange = (e) => {
    onChange({ ...data, languages: e.target.value });
  };

  return (
    <div className="resume-form">
      {/* Personal Info Section — Always Open */}
      <div className="form-section">
        <h2>Personal Information</h2>
        <div className="form-row">
          <div className="input-group">
            <label>Full Name</label>
            <input type="text" name="fullName" value={data.personalInfo.fullName} onChange={handlePersonalInfoChange} />
          </div>
          <div className="input-group">
            <label>Job Title</label>
            <input type="text" name="jobTitle" value={data.personalInfo.jobTitle || ''} onChange={handlePersonalInfoChange} />
          </div>
        </div>
        <div className="form-row">
          <div className="input-group">
            <label>Email</label>
            <input type="email" name="email" value={data.personalInfo.email} onChange={handlePersonalInfoChange} />
          </div>
          <div className="input-group">
            <label>Phone</label>
            <input type="tel" name="phone" value={data.personalInfo.phone} onChange={handlePersonalInfoChange} maxLength="10" placeholder="10-digit number" />
          </div>
        </div>
        <div className="input-group">
          <label>Address</label>
          <input type="text" name="address" value={data.personalInfo.address} onChange={handlePersonalInfoChange} />
        </div>
        <div className="form-row">
          <div className="input-group" style={{ flex: '0.4' }}>
            <label>Social Profile</label>
            <select name="socialPlatform" value={data.personalInfo.socialPlatform || 'LinkedIn'} onChange={handlePersonalInfoChange}>
              <option value="LinkedIn">LinkedIn</option>
              <option value="GitHub">GitHub</option>
              <option value="Indeed">Indeed</option>
              <option value="Naukri">Naukri</option>
            </select>
          </div>
          <div className="input-group" style={{ flex: '0.6' }}>
            <label>Profile Link / Username</label>
            <input type="text" name="socialLink" value={data.personalInfo.socialLink || ''} onChange={handlePersonalInfoChange} placeholder="e.g. linkedin.com/in/johndoe" />
          </div>
        </div>
        <div className="input-group">
          <label>Professional Summary</label>
          <textarea name="summary" value={data.personalInfo.summary} onChange={handlePersonalInfoChange} rows="3" />
        </div>
      </div>

      {/* Experience Section — Collapsible */}
      <div className="form-section">
        <div className="section-header" onClick={() => toggleSection('experience')}>
          <h2>Experience</h2>
          <span className="section-toggle-icon">
            {collapsed.experience ? <ChevronDown size={20} /> : <ChevronUp size={20} />}
          </span>
        </div>
        <div className={`section-body ${collapsed.experience ? 'collapsed' : ''}`}>
          {data.experience.map((exp, index) => (
            <div key={exp.id} className="item-card">
              <div className="item-card-header">
                <h3>Job {index + 1}</h3>
                <button className="btn-icon danger" onClick={() => removeArrayItem('experience', index)}>
                  <Trash2 size={16} />
                </button>
              </div>
              <div className="form-row">
                <div className="input-group">
                  <label>Company</label>
                  <input type="text" name="company" value={exp.company} onChange={(e) => handleArrayChange('experience', index, e)} />
                </div>
                <div className="input-group">
                  <label>Role</label>
                  <input type="text" name="role" value={exp.role} onChange={(e) => handleArrayChange('experience', index, e)} />
                </div>
              </div>
              <div className="input-group">
                <label>Duration (e.g. 2020 - Present)</label>
                <input type="text" name="duration" value={exp.duration} onChange={(e) => handleArrayChange('experience', index, e)} />
              </div>
              <div className="input-group">
                <label>Description</label>
                <textarea name="description" value={exp.description} onChange={(e) => handleArrayChange('experience', index, e)} rows="2" />
              </div>
            </div>
          ))}
          <button className="btn btn-outline full-width" onClick={() => addArrayItem('experience', { company: '', role: '', duration: '', description: '' })}>
            <Plus size={16} /> Add Experience
          </button>
        </div>
      </div>

      {/* Practical Experience Section — Collapsible */}
      <div className="form-section">
        <div className="section-header" onClick={() => toggleSection('practical')}>
          <h2>Practical Experience / Projects</h2>
          <span className="section-toggle-icon">
            {collapsed.practical ? <ChevronDown size={20} /> : <ChevronUp size={20} />}
          </span>
        </div>
        <div className={`section-body ${collapsed.practical ? 'collapsed' : ''}`}>
          {(data.practicalExperience || []).map((exp, index) => (
            <div key={exp.id} className="item-card">
              <div className="item-card-header">
                <h3>Project {index + 1}</h3>
                <button className="btn-icon danger" onClick={() => removeArrayItem('practicalExperience', index)}>
                  <Trash2 size={16} />
                </button>
              </div>
              <div className="form-row">
                <div className="input-group">
                  <label>Project Name</label>
                  <input type="text" name="project" value={exp.project} onChange={(e) => handleArrayChange('practicalExperience', index, e)} />
                </div>
                <div className="input-group">
                  <label>Your Role</label>
                  <input type="text" name="role" value={exp.role} onChange={(e) => handleArrayChange('practicalExperience', index, e)} />
                </div>
              </div>
              <div className="input-group">
                <label>Duration</label>
                <input type="text" name="duration" value={exp.duration} onChange={(e) => handleArrayChange('practicalExperience', index, e)} />
              </div>
              <div className="input-group">
                <label>Description</label>
                <textarea name="description" value={exp.description} onChange={(e) => handleArrayChange('practicalExperience', index, e)} rows="2" />
              </div>
            </div>
          ))}
          <button className="btn btn-outline full-width" onClick={() => addArrayItem('practicalExperience', { project: '', role: '', duration: '', description: '' })}>
            <Plus size={16} /> Add Practical Exp
          </button>
        </div>
      </div>

      {/* Education Section — Collapsible */}
      <div className="form-section">
        <div className="section-header" onClick={() => toggleSection('education')}>
          <h2>Education</h2>
          <span className="section-toggle-icon">
            {collapsed.education ? <ChevronDown size={20} /> : <ChevronUp size={20} />}
          </span>
        </div>
        <div className={`section-body ${collapsed.education ? 'collapsed' : ''}`}>
          {data.education.map((edu, index) => (
            <div key={edu.id} className="item-card">
              <div className="item-card-header">
                <h3>Education {index + 1}</h3>
                <button className="btn-icon danger" onClick={() => removeArrayItem('education', index)}>
                  <Trash2 size={16} />
                </button>
              </div>
              <div className="input-group">
                <label>School / University</label>
                <input type="text" name="school" value={edu.school} onChange={(e) => handleArrayChange('education', index, e)} />
              </div>
              <div className="form-row">
                <div className="input-group">
                  <label>Degree</label>
                  <input type="text" name="degree" value={edu.degree} onChange={(e) => handleArrayChange('education', index, e)} />
                </div>
                <div className="input-group">
                  <label>Year</label>
                  <input type="text" name="year" value={edu.year} onChange={(e) => handleArrayChange('education', index, e)} />
                </div>
              </div>
            </div>
          ))}
          <button className="btn btn-outline full-width" onClick={() => addArrayItem('education', { school: '', degree: '', year: '' })}>
            <Plus size={16} /> Add Education
          </button>
        </div>
      </div>

      {/* Certifications Section — Collapsible */}
      <div className="form-section">
        <div className="section-header" onClick={() => toggleSection('certifications')}>
          <h2>Certifications</h2>
          <span className="section-toggle-icon">
            {collapsed.certifications ? <ChevronDown size={20} /> : <ChevronUp size={20} />}
          </span>
        </div>
        <div className={`section-body ${collapsed.certifications ? 'collapsed' : ''}`}>
          {(data.certifications || []).map((cert, index) => (
            <div key={cert.id} className="item-card">
              <div className="item-card-header">
                <h3>Certification {index + 1}</h3>
                <button className="btn-icon danger" onClick={() => removeArrayItem('certifications', index)}>
                  <Trash2 size={16} />
                </button>
              </div>
              <div className="input-group">
                <label>Certification Name</label>
                <input type="text" name="name" value={cert.name} onChange={(e) => handleArrayChange('certifications', index, e)} />
              </div>
              <div className="form-row">
                <div className="input-group">
                  <label>Issuer</label>
                  <input type="text" name="issuer" value={cert.issuer} onChange={(e) => handleArrayChange('certifications', index, e)} />
                </div>
                <div className="input-group">
                  <label>Year</label>
                  <input type="text" name="year" value={cert.year} onChange={(e) => handleArrayChange('certifications', index, e)} />
                </div>
              </div>
            </div>
          ))}
          <button className="btn btn-outline full-width" onClick={() => addArrayItem('certifications', { name: '', issuer: '', year: '' })}>
            <Plus size={16} /> Add Certification
          </button>
        </div>
      </div>

      {/* Additional Information Section — Collapsible */}
      <div className="form-section">
        <div className="section-header" onClick={() => toggleSection('additional')}>
          <h2>Additional Information</h2>
          <span className="section-toggle-icon">
            {collapsed.additional ? <ChevronDown size={20} /> : <ChevronUp size={20} />}
          </span>
        </div>
        <div className={`section-body ${collapsed.additional ? 'collapsed' : ''}`}>
          <div className="input-group">
            <label>Skills (Comma separated)</label>
            <input type="text" value={data.skills} onChange={handleSkillsChange} />
          </div>
          <div className="input-group">
            <label>Languages (Comma separated)</label>
            <input type="text" value={data.languages || ''} onChange={handleLanguagesChange} />
          </div>

          {/* Custom Detail Fields */}
          {(data.customDetails || []).map((detail, index) => (
            <div key={detail.id} className="item-card">
              <div className="item-card-header">
                <h3>Custom Detail {index + 1}</h3>
                <button className="btn-icon danger" onClick={() => removeArrayItem('customDetails', index)}>
                  <Trash2 size={16} />
                </button>
              </div>
              <div className="input-group">
                <label>Label (e.g. "Hobbies", "Portfolio")</label>
                <input type="text" name="label" value={detail.label} onChange={(e) => handleArrayChange('customDetails', index, e)} />
              </div>
              <div className="input-group">
                <label>Value</label>
                <input type="text" name="value" value={detail.value} onChange={(e) => handleArrayChange('customDetails', index, e)} />
              </div>
            </div>
          ))}
          <button className="btn btn-outline full-width" onClick={() => addArrayItem('customDetails', { label: '', value: '' })}>
            <Plus size={16} /> Add New Detail
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResumeForm;
