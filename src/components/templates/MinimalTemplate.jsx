import React from 'react';
import './MinimalTemplate.css';

const MinimalTemplate = ({ data }) => {
  const { personalInfo, education, experience, practicalExperience, certifications, skills, languages, customDetails } = data;

  const skillArray = skills ? skills.split(',').map(s => s.trim()).filter(Boolean) : [];
  const langArray = languages ? languages.split(',').map(l => l.trim()).filter(Boolean) : [];

  return (
    <div className="minimal-template">
      <header className="minimal-header">
        <h1 className="minimal-name">{personalInfo.fullName || 'Your Name'}</h1>
        {personalInfo.jobTitle && <h2 className="minimal-job-title">{personalInfo.jobTitle}</h2>}
        
        <div className="minimal-contact">
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>{personalInfo.phone}</span>}
          {personalInfo.address && <span>{personalInfo.address}</span>}
          {personalInfo.socialLink && <span>{personalInfo.socialPlatform}: {personalInfo.socialLink}</span>}
        </div>
      </header>

      {personalInfo.summary && (
        <section className="minimal-section">
          <p className="minimal-summary">{personalInfo.summary}</p>
        </section>
      )}

      {experience && experience.length > 0 && (
        <section className="minimal-section">
          <h3 className="minimal-section-title">Experience</h3>
          {experience.map(exp => (
            <div key={exp.id} className="minimal-item">
              <div className="minimal-item-header">
                <div className="minimal-role">{exp.role || 'Role'}</div>
                <div className="minimal-date">{exp.duration || 'Duration'}</div>
              </div>
              <div className="minimal-company">{exp.company || 'Company Name'}</div>
              <p className="minimal-desc">{exp.description}</p>
            </div>
          ))}
        </section>
      )}

      {practicalExperience && practicalExperience.length > 0 && (
        <section className="minimal-section">
          <h3 className="minimal-section-title">Projects</h3>
          {practicalExperience.map(exp => (
            <div key={exp.id} className="minimal-item">
              <div className="minimal-item-header">
                <div className="minimal-role">{exp.project || 'Project Name'}</div>
                <div className="minimal-date">{exp.duration || 'Duration'}</div>
              </div>
              <div className="minimal-company">{exp.role || 'Role'}</div>
              <p className="minimal-desc">{exp.description}</p>
            </div>
          ))}
        </section>
      )}

      {education && education.length > 0 && (
        <section className="minimal-section">
          <h3 className="minimal-section-title">Education</h3>
          {education.map(edu => (
            <div key={edu.id} className="minimal-item">
              <div className="minimal-item-header">
                <div className="minimal-role">{edu.degree || 'Degree'}</div>
                <div className="minimal-date">{edu.year || 'Year'}</div>
              </div>
              <div className="minimal-company">{edu.school || 'School Name'}</div>
            </div>
          ))}
        </section>
      )}

      {(skillArray.length > 0 || langArray.length > 0 || (certifications && certifications.length > 0) || (customDetails && customDetails.length > 0)) && (
        <section className="minimal-section minimal-grid-section">
          {skillArray.length > 0 && (
            <div className="minimal-grid-block">
              <h3 className="minimal-section-title">Skills</h3>
              <div className="minimal-tags">
                {skillArray.map((skill, i) => <span key={i} className="minimal-tag">{skill}</span>)}
              </div>
            </div>
          )}

          {langArray.length > 0 && (
            <div className="minimal-grid-block">
              <h3 className="minimal-section-title">Languages</h3>
              <div className="minimal-tags">
                {langArray.map((lang, i) => <span key={i} className="minimal-tag">{lang}</span>)}
              </div>
            </div>
          )}

          {certifications && certifications.length > 0 && (
            <div className="minimal-grid-block">
              <h3 className="minimal-section-title">Certifications</h3>
              {certifications.map(cert => (
                <div key={cert.id} className="minimal-cert-item">
                  <span className="minimal-cert-name">{cert.name}</span>
                  <span className="minimal-cert-issuer">{cert.issuer} ({cert.year})</span>
                </div>
              ))}
            </div>
          )}

          {customDetails && customDetails.length > 0 && customDetails.map((detail, index) => (
            detail.label && detail.value ? (
              <div key={detail.id || index} className="minimal-grid-block">
                <h3 className="minimal-section-title">{detail.label}</h3>
                <p className="minimal-desc">{detail.value}</p>
              </div>
            ) : null
          ))}
        </section>
      )}
    </div>
  );
};

export default MinimalTemplate;
