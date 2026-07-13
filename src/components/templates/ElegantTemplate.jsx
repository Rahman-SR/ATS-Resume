import React from 'react';
import './ElegantTemplate.css';

const ElegantTemplate = ({ data }) => {
  const { personalInfo, education, experience, practicalExperience, certifications, skills, languages, customDetails } = data;

  const skillArray = skills ? skills.split(',').map(s => s.trim()).filter(Boolean) : [];
  const langArray = languages ? languages.split(',').map(l => l.trim()).filter(Boolean) : [];

  return (
    <div className="elegant-template">
      {/* Top Banner */}
      <header className="elegant-header">
        <div className="elegant-header-content">
          <div className="elegant-header-left">
            <h1 className="elegant-name">{personalInfo.fullName || 'Your Name'}</h1>
            {personalInfo.jobTitle && <h2 className="elegant-job-title">{personalInfo.jobTitle}</h2>}
          </div>
          <div className="elegant-header-right">
            {personalInfo.email && <div>{personalInfo.email}</div>}
            {personalInfo.phone && <div>{personalInfo.phone}</div>}
            {personalInfo.address && <div>{personalInfo.address}</div>}
            {personalInfo.socialLink && <div>{personalInfo.socialPlatform}: {personalInfo.socialLink}</div>}
          </div>
        </div>
      </header>

      <div className="elegant-body">
        {/* Left Column for Main Content */}
        <div className="elegant-main-column">
          {personalInfo.summary && (
            <section className="elegant-section">
              <h3 className="elegant-section-title">Professional Summary</h3>
              <p className="elegant-text">{personalInfo.summary}</p>
            </section>
          )}

          {experience && experience.length > 0 && (
            <section className="elegant-section">
              <h3 className="elegant-section-title">Experience</h3>
              {experience.map(exp => (
                <div key={exp.id} className="elegant-item">
                  <div className="elegant-item-header">
                    <div className="elegant-role">{exp.role || 'Role'}</div>
                    <div className="elegant-date">{exp.duration || 'Duration'}</div>
                  </div>
                  <div className="elegant-company">{exp.company || 'Company Name'}</div>
                  <p className="elegant-text">{exp.description}</p>
                </div>
              ))}
            </section>
          )}

          {practicalExperience && practicalExperience.length > 0 && (
            <section className="elegant-section">
              <h3 className="elegant-section-title">Projects</h3>
              {practicalExperience.map(exp => (
                <div key={exp.id} className="elegant-item">
                  <div className="elegant-item-header">
                    <div className="elegant-role">{exp.project || 'Project Name'}</div>
                    <div className="elegant-date">{exp.duration || 'Duration'}</div>
                  </div>
                  <div className="elegant-company">{exp.role || 'Role'}</div>
                  <p className="elegant-text">{exp.description}</p>
                </div>
              ))}
            </section>
          )}
          
          {customDetails && customDetails.length > 0 && customDetails.map((detail, index) => (
            detail.label && detail.value ? (
              <section key={detail.id || index} className="elegant-section">
                <h3 className="elegant-section-title">{detail.label}</h3>
                <p className="elegant-text">{detail.value}</p>
              </section>
            ) : null
          ))}
        </div>

        {/* Right Column for Sidebar Info */}
        <div className="elegant-side-column">
          {education && education.length > 0 && (
            <section className="elegant-section">
              <h3 className="elegant-section-title">Education</h3>
              {education.map(edu => (
                <div key={edu.id} className="elegant-item-side">
                  <div className="elegant-side-bold">{edu.degree || 'Degree'}</div>
                  <div className="elegant-side-light">{edu.school || 'School'}</div>
                  <div className="elegant-side-date">{edu.year || 'Year'}</div>
                </div>
              ))}
            </section>
          )}

          {skillArray.length > 0 && (
            <section className="elegant-section">
              <h3 className="elegant-section-title">Skills</h3>
              <ul className="elegant-list">
                {skillArray.map((skill, i) => <li key={i}>{skill}</li>)}
              </ul>
            </section>
          )}

          {langArray.length > 0 && (
            <section className="elegant-section">
              <h3 className="elegant-section-title">Languages</h3>
              <ul className="elegant-list">
                {langArray.map((lang, i) => <li key={i}>{lang}</li>)}
              </ul>
            </section>
          )}

          {certifications && certifications.length > 0 && (
            <section className="elegant-section">
              <h3 className="elegant-section-title">Certifications</h3>
              {certifications.map(cert => (
                <div key={cert.id} className="elegant-item-side">
                  <div className="elegant-side-bold">{cert.name}</div>
                  <div className="elegant-side-light">{cert.issuer}</div>
                  <div className="elegant-side-date">{cert.year}</div>
                </div>
              ))}
            </section>
          )}
        </div>
      </div>
    </div>
  );
};

export default ElegantTemplate;
