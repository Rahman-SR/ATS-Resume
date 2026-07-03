import React from 'react';
import './ResumeForm.css';
import { Plus, Trash2 } from 'lucide-react';

const ResumeForm = ({ data, onChange }) => {
  
  // Handler for all personal information fields
  const handlePersonalInfoChange = (e) => {
    const { name, value } = e.target;
    // We create a new object spreading the old data, but update the specific field inside personalInfo
    onChange({
      ...data,
      personalInfo: { ...data.personalInfo, [name]: value }
    });
  };

  // --- Education Handlers ---
  const handleEducationChange = (index, e) => {
    const { name, value } = e.target;
    const newEducation = [...data.education];
    newEducation[index][name] = value;
    onChange({ ...data, education: newEducation });
  };
  
  // Adds a new empty education block with a unique ID
  const addEducation = () => {
    onChange({ ...data, education: [...data.education, { id: Date.now().toString(), school: '', degree: '', year: '' }] });
  };
  
  // Removes a specific education block by its index in the array
  const removeEducation = (index) => {
    const newEducation = data.education.filter((_, i) => i !== index);
    onChange({ ...data, education: newEducation });
  };

  // Experience
  const handleExperienceChange = (index, e) => {
    const { name, value } = e.target;
    const newExperience = [...data.experience];
    newExperience[index][name] = value;
    onChange({ ...data, experience: newExperience });
  };
  const addExperience = () => {
    onChange({ ...data, experience: [...data.experience, { id: Date.now().toString(), company: '', role: '', duration: '', description: '' }] });
  };
  const removeExperience = (index) => {
    const newExperience = data.experience.filter((_, i) => i !== index);
    onChange({ ...data, experience: newExperience });
  };

  // Practical Experience
  const handlePracticalExperienceChange = (index, e) => {
    const { name, value } = e.target;
    const newPracExp = [...(data.practicalExperience || [])];
    newPracExp[index][name] = value;
    onChange({ ...data, practicalExperience: newPracExp });
  };
  const addPracticalExperience = () => {
    onChange({ ...data, practicalExperience: [...(data.practicalExperience || []), { id: Date.now().toString(), project: '', role: '', duration: '', description: '' }] });
  };
  const removePracticalExperience = (index) => {
    const newPracExp = (data.practicalExperience || []).filter((_, i) => i !== index);
    onChange({ ...data, practicalExperience: newPracExp });
  };

  // Certifications
  const handleCertificationChange = (index, e) => {
    const { name, value } = e.target;
    const newCerts = [...(data.certifications || [])];
    newCerts[index][name] = value;
    onChange({ ...data, certifications: newCerts });
  };
  const addCertification = () => {
    onChange({ ...data, certifications: [...(data.certifications || []), { id: Date.now().toString(), name: '', issuer: '', year: '' }] });
  };
  const removeCertification = (index) => {
    const newCerts = (data.certifications || []).filter((_, i) => i !== index);
    onChange({ ...data, certifications: newCerts });
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
      {/* Personal Info Section */}
      <div className="form-section">
        <h2>Personal Information</h2>
        <div className="input-group">
          <label>Full Name</label>
          <input type="text" name="fullName" value={data.personalInfo.fullName} onChange={handlePersonalInfoChange} />
        </div>
        <div className="form-row">
          <div className="input-group">
            <label>Email</label>
            <input type="email" name="email" value={data.personalInfo.email} onChange={handlePersonalInfoChange} />
          </div>
          <div className="input-group">
            <label>Phone</label>
            <input type="text" name="phone" value={data.personalInfo.phone} onChange={handlePersonalInfoChange} />
          </div>
        </div>
        <div className="input-group">
          <label>Address</label>
          <input type="text" name="address" value={data.personalInfo.address} onChange={handlePersonalInfoChange} />
        </div>
        <div className="input-group">
          <label>Professional Summary</label>
          <textarea name="summary" value={data.personalInfo.summary} onChange={handlePersonalInfoChange} rows="3" />
        </div>
      </div>

      {/* Experience Section */}
      <div className="form-section">
        <h2>Experience</h2>
        {data.experience.map((exp, index) => (
          <div key={exp.id} className="item-card">
            <div className="item-card-header">
              <h3>Job {index + 1}</h3>
              <button className="btn-icon danger" onClick={() => removeExperience(index)}>
                <Trash2 size={16} />
              </button>
            </div>
            <div className="form-row">
              <div className="input-group">
                <label>Company</label>
                <input type="text" name="company" value={exp.company} onChange={(e) => handleExperienceChange(index, e)} />
              </div>
              <div className="input-group">
                <label>Role</label>
                <input type="text" name="role" value={exp.role} onChange={(e) => handleExperienceChange(index, e)} />
              </div>
            </div>
            <div className="input-group">
              <label>Duration (e.g. 2020 - Present)</label>
              <input type="text" name="duration" value={exp.duration} onChange={(e) => handleExperienceChange(index, e)} />
            </div>
            <div className="input-group">
              <label>Description</label>
              <textarea name="description" value={exp.description} onChange={(e) => handleExperienceChange(index, e)} rows="2" />
            </div>
          </div>
        ))}
        <button className="btn btn-outline full-width" onClick={addExperience}>
          <Plus size={16} /> Add Experience
        </button>
      </div>

      {/* Practical Experience Section */}
      <div className="form-section">
        <h2>Practical Experience / Projects</h2>
        {(data.practicalExperience || []).map((exp, index) => (
          <div key={exp.id} className="item-card">
            <div className="item-card-header">
              <h3>Project {index + 1}</h3>
              <button className="btn-icon danger" onClick={() => removePracticalExperience(index)}>
                <Trash2 size={16} />
              </button>
            </div>
            <div className="form-row">
              <div className="input-group">
                <label>Project Name</label>
                <input type="text" name="project" value={exp.project} onChange={(e) => handlePracticalExperienceChange(index, e)} />
              </div>
              <div className="input-group">
                <label>Your Role</label>
                <input type="text" name="role" value={exp.role} onChange={(e) => handlePracticalExperienceChange(index, e)} />
              </div>
            </div>
            <div className="input-group">
              <label>Duration</label>
              <input type="text" name="duration" value={exp.duration} onChange={(e) => handlePracticalExperienceChange(index, e)} />
            </div>
            <div className="input-group">
              <label>Description</label>
              <textarea name="description" value={exp.description} onChange={(e) => handlePracticalExperienceChange(index, e)} rows="2" />
            </div>
          </div>
        ))}
        <button className="btn btn-outline full-width" onClick={addPracticalExperience}>
          <Plus size={16} /> Add Practical Exp
        </button>
      </div>

      {/* Education Section */}
      <div className="form-section">
        <h2>Education</h2>
        {data.education.map((edu, index) => (
          <div key={edu.id} className="item-card">
            <div className="item-card-header">
              <h3>Education {index + 1}</h3>
              <button className="btn-icon danger" onClick={() => removeEducation(index)}>
                <Trash2 size={16} />
              </button>
            </div>
            <div className="input-group">
              <label>School / University</label>
              <input type="text" name="school" value={edu.school} onChange={(e) => handleEducationChange(index, e)} />
            </div>
            <div className="form-row">
              <div className="input-group">
                <label>Degree</label>
                <input type="text" name="degree" value={edu.degree} onChange={(e) => handleEducationChange(index, e)} />
              </div>
              <div className="input-group">
                <label>Year</label>
                <input type="text" name="year" value={edu.year} onChange={(e) => handleEducationChange(index, e)} />
              </div>
            </div>
          </div>
        ))}
        <button className="btn btn-outline full-width" onClick={addEducation}>
          <Plus size={16} /> Add Education
        </button>
      </div>

      {/* Certifications Section */}
      <div className="form-section">
        <h2>Certifications</h2>
        {(data.certifications || []).map((cert, index) => (
          <div key={cert.id} className="item-card">
            <div className="item-card-header">
              <h3>Certification {index + 1}</h3>
              <button className="btn-icon danger" onClick={() => removeCertification(index)}>
                <Trash2 size={16} />
              </button>
            </div>
            <div className="input-group">
              <label>Certification Name</label>
              <input type="text" name="name" value={cert.name} onChange={(e) => handleCertificationChange(index, e)} />
            </div>
            <div className="form-row">
              <div className="input-group">
                <label>Issuer</label>
                <input type="text" name="issuer" value={cert.issuer} onChange={(e) => handleCertificationChange(index, e)} />
              </div>
              <div className="input-group">
                <label>Year</label>
                <input type="text" name="year" value={cert.year} onChange={(e) => handleCertificationChange(index, e)} />
              </div>
            </div>
          </div>
        ))}
        <button className="btn btn-outline full-width" onClick={addCertification}>
          <Plus size={16} /> Add Certification
        </button>
      </div>

      {/* Skills & Languages Section */}
      <div className="form-section">
        <h2>Additional Information</h2>
        <div className="input-group">
          <label>Skills (Comma separated)</label>
          <input type="text" value={data.skills} onChange={handleSkillsChange} />
        </div>
        <div className="input-group">
          <label>Languages (Comma separated)</label>
          <input type="text" value={data.languages || ''} onChange={handleLanguagesChange} />
        </div>
      </div>
    </div>
  );
};

export default ResumeForm;
