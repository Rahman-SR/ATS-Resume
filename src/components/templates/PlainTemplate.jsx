import React from 'react';

const PlainTemplate = ({ data }) => {
  const { personalInfo, education, experience, practicalExperience, certifications, skills, languages } = data;

  const styles = {
    container: {
      padding: '40px',
      fontFamily: 'Times New Roman, serif',
      color: '#000',
      lineHeight: '1.4',
      height: '100%',
      backgroundColor: '#fff'
    },
    header: {
      textAlign: 'center',
      borderBottom: '2px solid #000',
      paddingBottom: '20px',
      marginBottom: '20px'
    },
    name: {
      fontSize: '28px',
      fontWeight: 'bold',
      textTransform: 'uppercase',
      marginBottom: '5px'
    },
    contact: {
      fontSize: '14px'
    },
    sectionTitle: {
      fontSize: '16px',
      fontWeight: 'bold',
      textTransform: 'uppercase',
      borderBottom: '1px solid #000',
      marginBottom: '10px',
      paddingBottom: '3px',
      marginTop: '20px'
    },
    item: {
      marginBottom: '15px'
    },
    itemHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      fontWeight: 'bold',
      fontSize: '15px'
    },
    itemSubText: {
      fontStyle: 'italic',
      marginBottom: '5px'
    },
    text: {
      fontSize: '14px'
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <div style={styles.name}>{personalInfo.fullName || 'Your Name'}</div>
        <div style={styles.contact}>
          {personalInfo.email} {personalInfo.phone && `| ${personalInfo.phone}`} {personalInfo.address && `| ${personalInfo.address}`}
        </div>
      </div>

      {personalInfo.summary && (
        <div>
          <div style={styles.sectionTitle}>Professional Summary</div>
          <p style={styles.text}>{personalInfo.summary}</p>
        </div>
      )}

      {experience && experience.length > 0 && (
        <div>
          <div style={styles.sectionTitle}>Experience</div>
          {experience.map(exp => (
            <div key={exp.id} style={styles.item}>
              <div style={styles.itemHeader}>
                <span>{exp.role || 'Role Title'}</span>
                <span>{exp.duration || 'Duration'}</span>
              </div>
              <div style={styles.itemSubText}>{exp.company || 'Company Name'}</div>
              {exp.description && <p style={styles.text}>{exp.description}</p>}
            </div>
          ))}
        </div>
      )}

      {practicalExperience && practicalExperience.length > 0 && (
        <div>
          <div style={styles.sectionTitle}>Practical Experience / Projects</div>
          {practicalExperience.map(exp => (
            <div key={exp.id} style={styles.item}>
              <div style={styles.itemHeader}>
                <span>{exp.project || 'Project Name'}</span>
                <span>{exp.duration || 'Duration'}</span>
              </div>
              <div style={styles.itemSubText}>{exp.role || 'Role'}</div>
              {exp.description && <p style={styles.text}>{exp.description}</p>}
            </div>
          ))}
        </div>
      )}

      {education && education.length > 0 && (
        <div>
          <div style={styles.sectionTitle}>Education</div>
          {education.map(edu => (
            <div key={edu.id} style={styles.item}>
              <div style={styles.itemHeader}>
                <span>{edu.school || 'School Name'}</span>
                <span>{edu.year || 'Year'}</span>
              </div>
              <div style={styles.text}>{edu.degree || 'Degree'}</div>
            </div>
          ))}
        </div>
      )}

      {certifications && certifications.length > 0 && (
        <div>
          <div style={styles.sectionTitle}>Certifications</div>
          {certifications.map(cert => (
            <div key={cert.id} style={styles.item}>
              <div style={styles.itemHeader}>
                <span>{cert.name || 'Certification Name'}</span>
                <span>{cert.year || 'Year'}</span>
              </div>
              <div style={styles.text}>{cert.issuer || 'Issuer'}</div>
            </div>
          ))}
        </div>
      )}

      {skills && (
        <div>
          <div style={styles.sectionTitle}>Skills</div>
          <p style={styles.text}>{skills}</p>
        </div>
      )}

      {languages && (
        <div>
          <div style={styles.sectionTitle}>Languages</div>
          <p style={styles.text}>{languages}</p>
        </div>
      )}
    </div>
  );
};

export default PlainTemplate;
