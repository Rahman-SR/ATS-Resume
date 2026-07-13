import React from 'react';
import './ColoredTemplate.css';

const ColoredTemplate = ({ data }) => {
  const { personalInfo, education, experience, practicalExperience, certifications, skills, languages, customDetails } = data;

  const skillArray = skills ? skills.split(',').map(s => s.trim()).filter(Boolean) : [];
  const langArray = languages ? languages.split(',').map(l => l.trim()).filter(Boolean) : [];

  return (
    <div className="colored-template">
      {/* Sidebar */}
      <div className="colored-sidebar">
        <div className="colored-name">{personalInfo.fullName || 'Your Name'}</div>
        {personalInfo.jobTitle && <div className="colored-role-title">{personalInfo.jobTitle}</div>}

        <div className="colored-sidebar-title">Contact</div>
        {personalInfo.email && <div className="colored-contact-item">{personalInfo.email}</div>}
        {personalInfo.phone && <div className="colored-contact-item">{personalInfo.phone}</div>}
        {personalInfo.address && <div className="colored-contact-item">{personalInfo.address}</div>}
        {personalInfo.socialLink && (
          <div className="colored-contact-item">
            <strong>{personalInfo.socialPlatform}:</strong><br/>
            {personalInfo.socialLink}
          </div>
        )}

        {skillArray.length > 0 && (
          <>
            <div className="colored-sidebar-title">Skills</div>
            <div className="colored-skills-container">
              {skillArray.map((skill, i) => (
                <span key={i} className="colored-skill-badge">{skill}</span>
              ))}
            </div>
          </>
        )}

        {langArray.length > 0 && (
          <>
            <div className="colored-sidebar-title">Languages</div>
            <div>
              {langArray.map((lang, i) => (
                <div key={i} className="colored-lang-item">{lang}</div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Main Content */}
      <div className="colored-main">
        {personalInfo.summary && (
          <>
            <div className="colored-main-title">Profile</div>
            <p className="colored-text">{personalInfo.summary}</p>
          </>
        )}

        {experience && experience.length > 0 && (
          <>
            <div className="colored-main-title">Experience</div>
            {experience.map(exp => (
              <div key={exp.id} className="colored-item">
                <div className="colored-item-header">
                  <div className="colored-item-role">{exp.role || 'Role Title'}</div>
                  <div className="colored-item-duration">{exp.duration || 'Duration'}</div>
                </div>
                <div className="colored-item-company">{exp.company || 'Company Name'}</div>
                {exp.description && <p className="colored-text">{exp.description}</p>}
              </div>
            ))}
          </>
        )}

        {practicalExperience && practicalExperience.length > 0 && (
          <>
            <div className="colored-main-title">Practical Experience</div>
            {practicalExperience.map(exp => (
              <div key={exp.id} className="colored-item">
                <div className="colored-item-header">
                  <div className="colored-item-role">{exp.project || 'Project Name'}</div>
                  <div className="colored-item-duration">{exp.duration || 'Duration'}</div>
                </div>
                <div className="colored-item-company">{exp.role || 'Role'}</div>
                {exp.description && <p className="colored-text">{exp.description}</p>}
              </div>
            ))}
          </>
        )}

        {education && education.length > 0 && (
          <>
            <div className="colored-main-title">Education</div>
            {education.map(edu => (
              <div key={edu.id} className="colored-item">
                <div className="colored-item-header">
                  <div className="colored-item-role">{edu.degree || 'Degree Title'}</div>
                  <div className="colored-item-duration">{edu.year || 'Year'}</div>
                </div>
                <div className="colored-item-company">{edu.school || 'School/University Name'}</div>
              </div>
            ))}
          </>
        )}

        {certifications && certifications.length > 0 && (
          <>
            <div className="colored-main-title">Certifications</div>
            {certifications.map(cert => (
              <div key={cert.id} className="colored-item">
                <div className="colored-item-header">
                  <div className="colored-item-role">{cert.name || 'Certification Name'}</div>
                  <div className="colored-item-duration">{cert.year || 'Year'}</div>
                </div>
                <div className="colored-item-company">{cert.issuer || 'Issuer'}</div>
              </div>
            ))}
          </>
        )}

        {customDetails && customDetails.length > 0 && customDetails.map((detail, index) => (
          detail.label && detail.value ? (
            <React.Fragment key={detail.id || index}>
              <div className="colored-main-title">{detail.label}</div>
              <p className="colored-text">{detail.value}</p>
            </React.Fragment>
          ) : null
        ))}
      </div>
    </div>
  );
};

export default ColoredTemplate;
