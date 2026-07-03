import React from 'react';

const ColoredTemplate = ({ data }) => {
  const { personalInfo, education, experience, practicalExperience, certifications, skills, languages } = data;

  const styles = {
    container: {
      display: 'flex',
      height: '100%',
      fontFamily: 'Inter, sans-serif',
      backgroundColor: '#fff',
      color: '#333',
    },
    sidebar: {
      width: '35%',
      backgroundColor: '#1e3a8a', // Dark blue
      color: '#fff',
      padding: '40px 20px',
    },
    main: {
      width: '65%',
      padding: '40px',
      backgroundColor: '#f8fafc', // Very light blue/gray
    },
    name: {
      fontSize: '28px',
      fontWeight: 'bold',
      marginBottom: '5px',
      color: '#fff',
      lineHeight: '1.1'
    },
    roleTitle: {
      fontSize: '16px',
      color: '#93c5fd', // Light blue
      marginBottom: '30px',
      fontWeight: '500'
    },
    contactItem: {
      fontSize: '13px',
      marginBottom: '10px',
      wordBreak: 'break-all'
    },
    sidebarTitle: {
      fontSize: '18px',
      fontWeight: 'bold',
      marginTop: '30px',
      marginBottom: '15px',
      borderBottom: '2px solid #3b82f6',
      paddingBottom: '5px',
      color: '#fff'
    },
    mainTitle: {
      fontSize: '22px',
      fontWeight: 'bold',
      color: '#1e3a8a',
      borderBottom: '2px solid #bfdbfe',
      paddingBottom: '5px',
      marginBottom: '20px',
      marginTop: '0'
    },
    text: {
      fontSize: '14px',
      lineHeight: '1.6'
    },
    expItem: {
      marginBottom: '25px'
    },
    expHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'baseline',
      marginBottom: '5px'
    },
    expRole: {
      fontSize: '16px',
      fontWeight: 'bold',
      color: '#1e293b'
    },
    expDuration: {
      fontSize: '13px',
      color: '#2563eb',
      fontWeight: '600'
    },
    expCompany: {
      fontSize: '14px',
      color: '#475569',
      fontWeight: '500',
      marginBottom: '8px'
    },
    eduItem: {
      marginBottom: '20px'
    },
    eduDegree: {
      fontSize: '15px',
      fontWeight: 'bold',
      color: '#1e293b'
    },
    eduSchool: {
      fontSize: '14px',
      color: '#475569'
    },
    eduYear: {
      fontSize: '13px',
      color: '#2563eb',
      fontWeight: '600'
    },
    skillBadge: {
      display: 'inline-block',
      backgroundColor: '#3b82f6',
      color: 'white',
      padding: '4px 10px',
      borderRadius: '20px',
      fontSize: '12px',
      margin: '0 8px 8px 0'
    },
    langItem: {
      fontSize: '13px',
      marginBottom: '5px'
    }
  };

  const skillArray = skills ? skills.split(',').map(s => s.trim()).filter(Boolean) : [];
  const langArray = languages ? languages.split(',').map(l => l.trim()).filter(Boolean) : [];

  return (
    <div style={styles.container}>
      {/* Sidebar */}
      <div style={styles.sidebar}>
        <div style={styles.name}>{personalInfo.fullName || 'Your Name'}</div>
        <div style={styles.roleTitle}>Professional</div>

        <div style={styles.sidebarTitle}>Contact</div>
        {personalInfo.email && <div style={styles.contactItem}>{personalInfo.email}</div>}
        {personalInfo.phone && <div style={styles.contactItem}>{personalInfo.phone}</div>}
        {personalInfo.address && <div style={styles.contactItem}>{personalInfo.address}</div>}

        {skillArray.length > 0 && (
          <>
            <div style={styles.sidebarTitle}>Skills</div>
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
              {skillArray.map((skill, i) => (
                <span key={i} style={styles.skillBadge}>{skill}</span>
              ))}
            </div>
          </>
        )}

        {langArray.length > 0 && (
          <>
            <div style={styles.sidebarTitle}>Languages</div>
            <div>
              {langArray.map((lang, i) => (
                <div key={i} style={styles.langItem}>{lang}</div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Main Content */}
      <div style={styles.main}>
        {personalInfo.summary && (
          <>
            <div style={styles.mainTitle}>Profile</div>
            <p style={{ ...styles.text, marginBottom: '30px' }}>{personalInfo.summary}</p>
          </>
        )}

        {experience && experience.length > 0 && (
          <>
            <div style={styles.mainTitle}>Experience</div>
            {experience.map(exp => (
              <div key={exp.id} style={styles.expItem}>
                <div style={styles.expHeader}>
                  <div style={styles.expRole}>{exp.role || 'Role Title'}</div>
                  <div style={styles.expDuration}>{exp.duration || 'Duration'}</div>
                </div>
                <div style={styles.expCompany}>{exp.company || 'Company Name'}</div>
                {exp.description && <p style={styles.text}>{exp.description}</p>}
              </div>
            ))}
          </>
        )}

        {practicalExperience && practicalExperience.length > 0 && (
          <>
            <div style={styles.mainTitle}>Practical Experience</div>
            {practicalExperience.map(exp => (
              <div key={exp.id} style={styles.expItem}>
                <div style={styles.expHeader}>
                  <div style={styles.expRole}>{exp.project || 'Project Name'}</div>
                  <div style={styles.expDuration}>{exp.duration || 'Duration'}</div>
                </div>
                <div style={styles.expCompany}>{exp.role || 'Role'}</div>
                {exp.description && <p style={styles.text}>{exp.description}</p>}
              </div>
            ))}
          </>
        )}

        {education && education.length > 0 && (
          <>
            <div style={styles.mainTitle}>Education</div>
            {education.map(edu => (
              <div key={edu.id} style={styles.eduItem}>
                <div style={styles.expHeader}>
                  <div style={styles.eduDegree}>{edu.degree || 'Degree Title'}</div>
                  <div style={styles.eduYear}>{edu.year || 'Year'}</div>
                </div>
                <div style={styles.eduSchool}>{edu.school || 'School/University Name'}</div>
              </div>
            ))}
          </>
        )}

        {certifications && certifications.length > 0 && (
          <>
            <div style={styles.mainTitle}>Certifications</div>
            {certifications.map(cert => (
              <div key={cert.id} style={styles.eduItem}>
                <div style={styles.expHeader}>
                  <div style={styles.eduDegree}>{cert.name || 'Certification Name'}</div>
                  <div style={styles.eduYear}>{cert.year || 'Year'}</div>
                </div>
                <div style={styles.eduSchool}>{cert.issuer || 'Issuer'}</div>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default ColoredTemplate;
