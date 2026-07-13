import React from 'react';
import './PlainTemplate.css';

const PlainTemplate = ({ data }) => {
  const { personalInfo, education, experience, practicalExperience, certifications, skills, languages, customDetails } = data;

  const skillArray = skills ? skills.split(',').map(s => s.trim()).filter(Boolean) : [];

  return (
    <div className="plain-template">
      <div className="plain-header">
        <div className="plain-name">{personalInfo.fullName || 'Your Name'}</div>
        {personalInfo.jobTitle && <div className="plain-job-title">{personalInfo.jobTitle}</div>}
        <div className="plain-contact">
          {personalInfo.email} 
          {personalInfo.phone && ` | ${personalInfo.phone}`} 
          {personalInfo.address && ` | ${personalInfo.address}`}
          {personalInfo.socialLink && ` | ${personalInfo.socialPlatform}: ${personalInfo.socialLink}`}
        </div>
      </div>

      {personalInfo.summary && (
        <div>
          <div className="plain-section-title">Professional Summary</div>
          <p className="plain-text">{personalInfo.summary}</p>
        </div>
      )}

      {experience && experience.length > 0 && (
        <div>
          <div className="plain-section-title">Experience</div>
          {experience.map(exp => (
            <div key={exp.id} className="plain-item">
              <div className="plain-item-header">
                <span>{exp.role || 'Role Title'}</span>
                <span>{exp.duration || 'Duration'}</span>
              </div>
              <div className="plain-item-subtext">{exp.company || 'Company Name'}</div>
              {exp.description && <p className="plain-text">{exp.description}</p>}
            </div>
          ))}
        </div>
      )}

      {practicalExperience && practicalExperience.length > 0 && (
        <div>
          <div className="plain-section-title">Practical Experience / Projects</div>
          {practicalExperience.map(exp => (
            <div key={exp.id} className="plain-item">
              <div className="plain-item-header">
                <span>{exp.project || 'Project Name'}</span>
                <span>{exp.duration || 'Duration'}</span>
              </div>
              <div className="plain-item-subtext">{exp.role || 'Role'}</div>
              {exp.description && <p className="plain-text">{exp.description}</p>}
            </div>
          ))}
        </div>
      )}

      {education && education.length > 0 && (
        <div>
          <div className="plain-section-title">Education</div>
          {education.map(edu => (
            <div key={edu.id} className="plain-item">
              <div className="plain-item-header">
                <span>{edu.school || 'School Name'}</span>
                <span>{edu.year || 'Year'}</span>
              </div>
              <div className="plain-text">{edu.degree || 'Degree'}</div>
            </div>
          ))}
        </div>
      )}

      {certifications && certifications.length > 0 && (
        <div>
          <div className="plain-section-title">Certifications</div>
          {certifications.map(cert => (
            <div key={cert.id} className="plain-item">
              <div className="plain-item-header">
                <span>{cert.name || 'Certification Name'}</span>
                <span>{cert.year || 'Year'}</span>
              </div>
              <div className="plain-text">{cert.issuer || 'Issuer'}</div>
            </div>
          ))}
        </div>
      )}

      {skillArray.length > 0 && (
        <div>
          <div className="plain-section-title">Skills</div>
          <div className="plain-skills-container">
            {skillArray.map((skill, index) => (
              <span key={index} className="plain-skill-item">{skill}</span>
            ))}
          </div>
        </div>
      )}

      {languages && (
        <div>
          <div className="plain-section-title">Languages</div>
          <p className="plain-text">{languages}</p>
        </div>
      )}

      {customDetails && customDetails.length > 0 && customDetails.map((detail, index) => (
        detail.label && detail.value ? (
          <div key={detail.id || index}>
            <div className="plain-section-title">{detail.label}</div>
            <p className="plain-text">{detail.value}</p>
          </div>
        ) : null
      ))}
    </div>
  );
};

export default PlainTemplate;
