import React, { useState, useEffect } from 'react';
import { User, Building2, Code, Trophy, Star, Filter, Search, BookOpen, GitBranch, Award, MapPin, Calendar, TrendingUp, Users, Target, ChevronRight, Eye, Heart, Briefcase } from 'lucide-react';

// Mock Data
const mockStudents = [
  {
    id: 1,
    name: "Aadhitya",
    university: "SNUC",
    major: "Computer Science",
    year: "3rd Year",
    location: "Chennai,Tamil Nadu",
    profilePicture: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    talentGenome: {
      technicalSkills: {
        "Python": 95,
        "React": 88,
        "Machine Learning": 92,
        "Data Analysis": 85
      },
      softSkills: {
        "Leadership": 90,
        "Communication": 85,
        "Problem Solving": 95
      },
      culturalFit: {
        "Innovation": 95,
        "Collaboration": 88,
        "Fast-paced": 92
      }
    },
    verifiedSources: {
      github: "50+ repositories",
      coursera: "15 certificates",
      kaggle: "Top 5% competitor",
      projects: "12 verified projects"
    },
    fitScore: 94,
    interests: ["AI/ML", "Web Development", "Data Science"],
    achievements: ["Google Summer of Code", "Hackathon Winner", "Research Publication"]
  },
  {
    id: 2,
    name: "Sarah Johnson",
    university: "Stanford",
    major: "Data Science",
    year: "Junior",
    location: "Palo Alto, CA",
    profilePicture: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
    talentGenome: {
      technicalSkills: {
        "Python": 90,
        "SQL": 95,
        "Tableau": 88,
        "Statistics": 92
      },
      softSkills: {
        "Analytics": 95,
        "Communication": 90,
        "Teamwork": 88
      },
      culturalFit: {
        "Data-driven": 95,
        "Innovation": 85,
        "Remote-friendly": 90
      }
    },
    verifiedSources: {
      github: "35+ repositories",
      coursera: "22 certificates",
      kaggle: "Expert level",
      projects: "8 verified projects"
    },
    fitScore: 91,
    interests: ["Data Analytics", "Business Intelligence", "Machine Learning"],
    achievements: ["Dean's List", "Data Science Competition Winner", "Industry Internship"]
  },
  {
    id: 3,
    name: "Michael Rodriguez",
    university: "UC Berkeley",
    major: "Software Engineering",
    year: "Senior",
    location: "Berkeley, CA",
    profilePicture: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    talentGenome: {
      technicalSkills: {
        "JavaScript": 92,
        "Node.js": 88,
        "AWS": 85,
        "Docker": 90
      },
      softSkills: {
        "Leadership": 88,
        "Problem Solving": 92,
        "Mentoring": 85
      },
      culturalFit: {
        "Startup": 95,
        "Innovation": 90,
        "Agile": 88
      }
    },
    verifiedSources: {
      github: "80+ repositories",
      coursera: "12 certificates",
      projects: "15 verified projects",
      leadership: "Club President"
    },
    fitScore: 89,
    interests: ["Full Stack Development", "Cloud Architecture", "DevOps"],
    achievements: ["Open Source Contributor", "Startup Co-founder", "Technical Lead"]
  }
];

const mockJobs = [
  {
    id: 1,
    title: "Software Engineer - AI/ML",
    company: "Google",
    location: "Mountain View, CA",
    type: "Full-time",
    experience: "Entry Level",
    salary: "$120k - $150k",
    posted: "2 days ago",
    logo: "https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?w=60&h=60&fit=crop",
    description: "Join our AI team to build next-generation machine learning systems.",
    requirements: {
      technical: ["Python", "Machine Learning", "TensorFlow", "Data Structures"],
      cultural: ["Innovation", "Collaboration", "Fast-paced"]
    },
    fitScore: 94,
    applicants: 1250,
    matchingStudents: 45
  },
  {
    id: 2,
    title: "Data Scientist",
    company: "Netflix",
    location: "Los Gatos, CA",
    type: "Full-time",
    experience: "Entry Level",
    salary: "$110k - $140k",
    posted: "1 week ago",
    logo: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=60&h=60&fit=crop",
    description: "Analyze user behavior data to improve content recommendations.",
    requirements: {
      technical: ["Python", "SQL", "Statistics", "Data Visualization"],
      cultural: ["Data-driven", "Innovation", "Remote-friendly"]
    },
    fitScore: 91,
    applicants: 890,
    matchingStudents: 32
  },
  {
    id: 3,
    title: "Frontend Developer",
    company: "Airbnb",
    location: "San Francisco, CA",
    type: "Full-time",
    experience: "Entry Level",
    salary: "$100k - $130k",
    posted: "3 days ago",
    logo: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=60&h=60&fit=crop",
    description: "Build beautiful, responsive user interfaces for millions of users.",
    requirements: {
      technical: ["React", "JavaScript", "CSS", "TypeScript"],
      cultural: ["Design-focused", "User-centric", "Collaborative"]
    },
    fitScore: 88,
    applicants: 756,
    matchingStudents: 28
  },
  {
    id: 4,
    title: "Cloud Engineer",
    company: "Amazon",
    location: "Seattle, WA",
    type: "Full-time",
    experience: "Entry Level",
    salary: "$115k - $145k",
    posted: "5 days ago",
    logo: "https://images.unsplash.com/photo-1523474253046-8cd2748b5fd2?w=60&h=60&fit=crop",
    description: "Design and maintain scalable cloud infrastructure on AWS.",
    requirements: {
      technical: ["AWS", "Docker", "Kubernetes", "Python"],
      cultural: ["Innovation", "Ownership", "Scale-focused"]
    },
    fitScore: 89,
    applicants: 1100,
    matchingStudents: 38
  }
];

const TalentGenomePlatform = () => {
  const [userType, setUserType] = useState(null);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [selectedJob, setSelectedJob] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterScore, setFilterScore] = useState(80);

  const styles = {
    // Global styles
    container: {
      fontFamily: 'system-ui, -apple-system, sans-serif',
      lineHeight: '1.5',
      color: '#1f2937'
    },
    
    // Layout
    minHeight: {
      minHeight: '100vh'
    },
    
    flexCenter: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    
    flexBetween: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    },
    
    flex: {
      display: 'flex',
      alignItems: 'center'
    },
    
    flexCol: {
      display: 'flex',
      flexDirection: 'column'
    },
    
    grid: {
      display: 'grid',
      gap: '1.5rem'
    },
    
    gridCols2: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: '1.5rem'
    },
    
    gridCols3: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
      gap: '1.5rem'
    },
    
    gridCols4: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
      gap: '1.5rem'
    },
    
    // Login Page
    loginContainer: {
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #dbeafe 0%, #e0e7ff 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1rem'
    },
    
    loginCard: {
      maxWidth: '400px',
      width: '100%',
      backgroundColor: 'white',
      borderRadius: '12px',
      boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
      padding: '2rem'
    },
    
    loginHeader: {
      textAlign: 'center',
      marginBottom: '2rem'
    },
    
    logoContainer: {
      width: '64px',
      height: '64px',
      backgroundColor: '#4f46e5',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      margin: '0 auto 1rem'
    },
    
    loginTitle: {
      fontSize: '1.5rem',
      fontWeight: '700',
      color: '#1f2937',
      margin: '0'
    },
    
    loginSubtitle: {
      color: '#6b7280',
      marginTop: '0.5rem',
      margin: '0'
    },
    
    buttonContainer: {
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem'
    },
    
    buttonPrimary: {
      width: '100%',
      backgroundColor: '#4f46e5',
      color: 'white',
      padding: '12px 16px',
      borderRadius: '8px',
      border: 'none',
      cursor: 'pointer',
      fontSize: '1rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '0.5rem',
      transition: 'background-color 0.2s'
    },
    
    buttonSecondary: {
      width: '100%',
      backgroundColor: '#10b981',
      color: 'white',
      padding: '12px 16px',
      borderRadius: '8px',
      border: 'none',
      cursor: 'pointer',
      fontSize: '1rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '0.5rem',
      transition: 'background-color 0.2s'
    },
    
    // Header
    header: {
      backgroundColor: 'white',
      borderBottom: '1px solid #e5e7eb',
      boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
    },
    
    headerContent: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '1rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    },
    
    headerLeft: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.75rem'
    },
    
    headerTitle: {
      fontSize: '1.25rem',
      fontWeight: '700',
      color: '#1f2937',
      margin: '0'
    },
    
    logoutButton: {
      padding: '8px 16px',
      color: '#6b7280',
      backgroundColor: 'transparent',
      border: 'none',
      cursor: 'pointer',
      borderRadius: '6px',
      transition: 'color 0.2s'
    },
    
    // Main content
    main: {
      minHeight: 'calc(100vh - 80px)',
      backgroundColor: '#f9fafb'
    },
    
    mainContent: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '1.5rem'
    },
    
    // Cards
    card: {
      backgroundColor: 'white',
      borderRadius: '8px',
      boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
      padding: '1.5rem',
      transition: 'box-shadow 0.2s'
    },
    
    cardHover: {
      backgroundColor: 'white',
      borderRadius: '8px',
      boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
      padding: '1.5rem',
      transition: 'box-shadow 0.2s',
      cursor: 'pointer'
    },
    
    // Stats
    statCard: {
      backgroundColor: 'white',
      padding: '1.5rem',
      borderRadius: '8px',
      boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
    },
    
    statNumber: {
      fontSize: '1.5rem',
      fontWeight: '700',
      color: '#1f2937',
      margin: '0'
    },
    
    statLabel: {
      fontSize: '0.875rem',
      color: '#6b7280',
      margin: '0'
    },
    
    // Forms
    searchContainer: {
      backgroundColor: 'white',
      borderRadius: '8px',
      boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
      padding: '1rem',
      marginBottom: '1.5rem'
    },
    
    searchForm: {
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem'
    },
    
    searchInput: {
      width: '100%',
      padding: '8px 12px 8px 40px',
      border: '1px solid #d1d5db',
      borderRadius: '6px',
      fontSize: '1rem',
      outline: 'none',
      transition: 'border-color 0.2s'
    },
    
    searchInputContainer: {
      position: 'relative',
      flex: 1
    },
    
    searchIcon: {
      position: 'absolute',
      left: '12px',
      top: '50%',
      transform: 'translateY(-50%)',
      color: '#9ca3af'
    },
    
    filterContainer: {
      display: 'flex',
      alignItems: 'center',
      gap: '1rem'
    },
    
    filterLabel: {
      fontSize: '0.875rem',
      color: '#6b7280'
    },
    
    // Profile elements
    profileImage: {
      width: '48px',
      height: '48px',
      borderRadius: '50%',
      objectFit: 'cover'
    },
    
    profileImageLarge: {
      width: '96px',
      height: '96px',
      borderRadius: '50%',
      objectFit: 'cover'
    },
    
    // Skills and progress bars
    skillContainer: {
      backgroundColor: '#f9fafb',
      padding: '1rem',
      borderRadius: '6px'
    },
    
    skillItem: {
      marginBottom: '1rem'
    },
    
    skillHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: '0.25rem'
    },
    
    skillName: {
      fontSize: '0.875rem',
      fontWeight: '500'
    },
    
    skillScore: {
      fontSize: '0.875rem',
      color: '#6b7280'
    },
    
    progressBar: {
      width: '100%',
      height: '8px',
      backgroundColor: '#e5e7eb',
      borderRadius: '4px',
      overflow: 'hidden'
    },
    
    progressFill: {
      height: '100%',
      borderRadius: '4px',
      transition: 'width 0.3s'
    },
    
    // Tags and badges
    tag: {
      display: 'inline-block',
      padding: '4px 8px',
      borderRadius: '4px',
      fontSize: '0.75rem',
      fontWeight: '500'
    },
    
    tagBlue: {
      backgroundColor: '#dbeafe',
      color: '#1e40af'
    },
    
    tagGreen: {
      backgroundColor: '#d1fae5',
      color: '#065f46'
    },
    
    tagPurple: {
      backgroundColor: '#e9d5ff',
      color: '#7c3aed'
    },
    
    tagYellow: {
      backgroundColor: '#fef3c7',
      color: '#92400e'
    },
    
    tagGray: {
      backgroundColor: '#f3f4f6',
      color: '#374151'
    },
    
    // Buttons
    button: {
      padding: '8px 16px',
      borderRadius: '6px',
      border: 'none',
      cursor: 'pointer',
      fontSize: '0.875rem',
      fontWeight: '500',
      transition: 'all 0.2s'
    },
    
    buttonLarge: {
      padding: '12px 24px',
      borderRadius: '6px',
      border: 'none',
      cursor: 'pointer',
      fontSize: '1rem',
      fontWeight: '500',
      transition: 'all 0.2s'
    },
    
    // Utility classes
    textCenter: {
      textAlign: 'center'
    },
    
    textRight: {
      textAlign: 'right'
    },
    
    textSm: {
      fontSize: '0.875rem'
    },
    
    textXs: {
      fontSize: '0.75rem'
    },
    
    textLg: {
      fontSize: '1.125rem'
    },
    
    textXl: {
      fontSize: '1.25rem'
    },
    
    text2xl: {
      fontSize: '1.5rem'
    },
    
    fontBold: {
      fontWeight: '700'
    },
    
    fontSemibold: {
      fontWeight: '600'
    },
    
    fontMedium: {
      fontWeight: '500'
    },
    
    textGray500: {
      color: '#6b7280'
    },
    
    textGray600: {
      color: '#4b5563'
    },
    
    textGray700: {
      color: '#374151'
    },
    
    textGray900: {
      color: '#1f2937'
    },
    
    textIndigo600: {
      color: '#4f46e5'
    },
    
    textEmerald600: {
      color: '#10b981'
    },
    
    mt1: {
      marginTop: '0.25rem'
    },
    
    mt2: {
      marginTop: '0.5rem'
    },
    
    mt4: {
      marginTop: '1rem'
    },
    
    mt6: {
      marginTop: '1.5rem'
    },
    
    mt8: {
      marginTop: '2rem'
    },
    
    mb2: {
      marginBottom: '0.5rem'
    },
    
    mb4: {
      marginBottom: '1rem'
    },
    
    mb6: {
      marginBottom: '1.5rem'
    },
    
    mb8: {
      marginBottom: '2rem'
    },
    
    gap1: {
      gap: '0.25rem'
    },
    
    gap2: {
      gap: '0.5rem'
    },
    
    gap3: {
      gap: '0.75rem'
    },
    
    gap4: {
      gap: '1rem'
    },
    
    gap6: {
      gap: '1.5rem'
    }
  };

  // Login Component
  const LoginPage = () => (
    <div style={{...styles.loginContainer, ...styles.container}}>
      <div style={styles.loginCard}>
        <div style={styles.loginHeader}>
          <div style={styles.logoContainer}>
            <Target style={{width: '32px', height: '32px', color: 'white'}} />
          </div>
          <h1 style={styles.loginTitle}>Talent Genome Platform</h1>
          <p style={styles.loginSubtitle}>AI-Powered Talent Matching</p>
        </div>
        
        <div style={styles.buttonContainer}>
          <button
            onClick={() => setUserType('student')}
            style={styles.buttonPrimary}
            onMouseOver={(e) => e.target.style.backgroundColor = '#4338ca'}
            onMouseOut={(e) => e.target.style.backgroundColor = '#4f46e5'}
          >
            <User style={{width: '20px', height: '20px'}} />
            <span>Student Login</span>
          </button>
          
          <button
            onClick={() => setUserType('recruiter')}
            style={styles.buttonSecondary}
            onMouseOver={(e) => e.target.style.backgroundColor = '#059669'}
            onMouseOut={(e) => e.target.style.backgroundColor = '#10b981'}
          >
            <Building2 style={{width: '20px', height: '20px'}} />
            <span>Recruiter Login</span>
          </button>
        </div>
        
        <div style={{...styles.textCenter, ...styles.mt8, ...styles.textSm, ...styles.textGray500}}>
          <p>Beyond resumes. Beyond traditional hiring.</p>
          <p style={styles.mt1}>Discover your perfect talent match.</p>
        </div>
      </div>
    </div>
  );

  // Student Dashboard
  const StudentDashboard = () => (
    <div style={{...styles.container, ...styles.minHeight}}>
      {/* Header */}
      <div style={styles.header}>
        <div style={styles.headerContent}>
          <div style={styles.headerLeft}>
            <Target style={{width: '32px', height: '32px', color: '#4f46e5'}} />
            <h1 style={styles.headerTitle}>Talent Genome - Student</h1>
          </div>
          <button
            onClick={() => setUserType(null)}
            style={styles.logoutButton}
            onMouseOver={(e) => e.target.style.color = '#1f2937'}
            onMouseOut={(e) => e.target.style.color = '#6b7280'}
          >
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div style={styles.main}>
        <div style={styles.mainContent}>
          {selectedJob ? (
            // Job Details View
            <div style={styles.card}>
              <button
                onClick={() => setSelectedJob(null)}
                style={{...styles.button, color: '#4f46e5', backgroundColor: 'transparent', ...styles.mb4}}
              >
                ← Back to Jobs
              </button>
              
              <div style={{...styles.flexBetween, ...styles.mb6}}>
                <div style={{...styles.flex, ...styles.gap4}}>
                  <img src={selectedJob.logo} alt={selectedJob.company} style={{width: '64px', height: '64px', borderRadius: '8px'}} />
                  <div>
                    <h1 style={{...styles.text2xl, ...styles.fontBold, ...styles.textGray900}}>{selectedJob.title}</h1>
                    <p style={{...styles.textLg, ...styles.textGray600}}>{selectedJob.company}</p>
                    <div style={{...styles.flex, ...styles.gap4, ...styles.mt2, ...styles.textSm, ...styles.textGray500}}>
                      <span style={styles.flex}>
                        <MapPin style={{width: '16px', height: '16px', marginRight: '4px'}} />
                        {selectedJob.location}
                      </span>
                      <span>{selectedJob.type}</span>
                      <span>{selectedJob.salary}</span>
                    </div>
                  </div>
                </div>
                
                <div style={styles.textRight}>
                  <div style={{...styles.text2xl, ...styles.fontBold, ...styles.textIndigo600}}>{selectedJob.fitScore}%</div>
                  <div style={{...styles.textSm, ...styles.textGray500}}>Fit Score</div>
                </div>
              </div>
              
              <div style={{...styles.gridCols2, ...styles.mb6}}>
                <div>
                  <h3 style={{...styles.fontSemibold, ...styles.textGray900, ...styles.mb2}}>Technical Requirements</h3>
                  <div style={{display: 'flex', flexDirection: 'column', gap: '0.5rem'}}>
                    {selectedJob.requirements.technical.map((skill, idx) => (
                      <div key={idx} style={{...styles.flexBetween, backgroundColor: '#f9fafb', padding: '8px', borderRadius: '4px'}}>
                        <span>{skill}</span>
                        <div style={{width: '80px', height: '8px', backgroundColor: '#e5e7eb', borderRadius: '4px'}}>
                          <div 
                            style={{
                              width: `${Math.random() * 40 + 60}%`,
                              height: '100%',
                              backgroundColor: '#4f46e5',
                              borderRadius: '4px'
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 style={{...styles.fontSemibold, ...styles.textGray900, ...styles.mb2}}>Cultural Fit</h3>
                  <div style={{display: 'flex', flexDirection: 'column', gap: '0.5rem'}}>
                    {selectedJob.requirements.cultural.map((trait, idx) => (
                      <div key={idx} style={{...styles.flexBetween, backgroundColor: '#f9fafb', padding: '8px', borderRadius: '4px'}}>
                        <span>{trait}</span>
                        <div style={{width: '80px', height: '8px', backgroundColor: '#e5e7eb', borderRadius: '4px'}}>
                          <div 
                            style={{
                              width: `${Math.random() * 30 + 70}%`,
                              height: '100%',
                              backgroundColor: '#10b981',
                              borderRadius: '4px'
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              <div style={styles.mb6}>
                <h3 style={{...styles.fontSemibold, ...styles.textGray900, ...styles.mb2}}>Job Description</h3>
                <p style={styles.textGray600}>{selectedJob.description}</p>
              </div>
              
              <div style={styles.flexBetween}>
                <div style={{...styles.flex, ...styles.gap6, ...styles.textSm, ...styles.textGray500}}>
                  <span style={styles.flex}>
                    <Users style={{width: '16px', height: '16px', marginRight: '4px'}} />
                    {selectedJob.applicants} applicants
                  </span>
                  <span style={styles.flex}>
                    <Calendar style={{width: '16px', height: '16px', marginRight: '4px'}} />
                    Posted {selectedJob.posted}
                  </span>
                </div>
                
                <button 
                  style={{
                    ...styles.buttonLarge, 
                    backgroundColor: '#4f46e5', 
                    color: 'white'
                  }}
                  onMouseOver={(e) => e.target.style.backgroundColor = '#4338ca'}
                  onMouseOut={(e) => e.target.style.backgroundColor = '#4f46e5'}
                >
                  Apply Now
                </button>
              </div>
            </div>
          ) : (
            // Jobs List View
            <div>
              <div style={styles.mb6}>
                <h2 style={{...styles.text2xl, ...styles.fontBold, ...styles.textGray900, ...styles.mb2}}>Available Opportunities</h2>
                <p style={styles.textGray600}>Jobs matched to your Talent Genome</p>
              </div>

              {/* Search and Filter */}
              <div style={styles.searchContainer}>
                <div style={styles.searchForm}>
                  <div style={styles.searchInputContainer}>
                    <Search style={{...styles.searchIcon, width: '20px', height: '20px'}} />
                    <input
                      type="text"
                      placeholder="Search jobs..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      style={styles.searchInput}
                      onFocus={(e) => e.target.style.borderColor = '#4f46e5'}
                      onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                    />
                  </div>
                  <div style={styles.filterContainer}>
                    <Filter style={{width: '16px', height: '16px', color: '#9ca3af'}} />
                    <span style={styles.filterLabel}>Min Fit Score:</span>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={filterScore}
                      onChange={(e) => setFilterScore(e.target.value)}
                      style={{width: '80px'}}
                    />
                    <span style={{...styles.textSm, ...styles.fontMedium}}>{filterScore}%</span>
                  </div>
                </div>
              </div>

              {/* Jobs Grid */}
              <div style={styles.grid}>
                {mockJobs
                  .filter(job => job.fitScore >= filterScore)
                  .filter(job => searchTerm === '' || job.title.toLowerCase().includes(searchTerm.toLowerCase()) || job.company.toLowerCase().includes(searchTerm.toLowerCase()))
                  .map(job => (
                  <div 
                    key={job.id} 
                    style={styles.cardHover}
                    onClick={() => setSelectedJob(job)}
                    onMouseOver={(e) => e.target.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)'}
                    onMouseOut={(e) => e.target.style.boxShadow = '0 1px 3px rgba(0,0,0,0.1)'}
                  >
                    <div style={{...styles.flexBetween, ...styles.mb4}}>
                      <div style={{...styles.flex, ...styles.gap4}}>
                        <img src={job.logo} alt={job.company} style={{width: '48px', height: '48px', borderRadius: '8px'}} />
                        <div>
                          <h3 style={{...styles.textLg, ...styles.fontSemibold, ...styles.textGray900}}>{job.title}</h3>
                          <p style={styles.textGray600}>{job.company}</p>
                          <div style={{...styles.flex, ...styles.gap3, ...styles.mt1, ...styles.textSm, ...styles.textGray500}}>
                            <span style={styles.flex}>
                              <MapPin style={{width: '12px', height: '12px', marginRight: '4px'}} />
                              {job.location}
                            </span>
                            <span>{job.salary}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div style={styles.textRight}>
                        <div style={{...styles.textXl, ...styles.fontBold, ...styles.textIndigo600}}>{job.fitScore}%</div>
                        <div style={{...styles.textXs, ...styles.textGray500}}>Fit Score</div>
                      </div>
                    </div>
                    
                    <p style={{...styles.textGray600, ...styles.textSm, ...styles.mb4}}>{job.description}</p>
                    
                    <div style={styles.flexBetween}>
                      <div style={{...styles.flex, ...styles.gap4, ...styles.textSm, ...styles.textGray500}}>
                        <span style={styles.flex}>
                          <Users style={{width: '16px', height: '16px', marginRight: '4px'}} />
                          {job.applicants}
                        </span>
                        <span style={styles.flex}>
                          <Calendar style={{width: '16px', height: '16px', marginRight: '4px'}} />
                          {job.posted}
                        </span>
                      </div>
                      
                      <ChevronRight style={{width: '20px', height: '20px', color: '#9ca3af'}} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  // Recruiter Dashboard
  const RecruiterDashboard = () => (
    <div style={{...styles.container, ...styles.minHeight}}>
      {/* Header */}
      <div style={styles.header}>
        <div style={styles.headerContent}>
          <div style={styles.headerLeft}>
            <Target style={{width: '32px', height: '32px', color: '#10b981'}} />
            <h1 style={styles.headerTitle}>Talent Genome - Recruiter</h1>
          </div>
          <button
            onClick={() => setUserType(null)}
            style={styles.logoutButton}
            onMouseOver={(e) => e.target.style.color = '#1f2937'}
            onMouseOut={(e) => e.target.style.color = '#6b7280'}
          >
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div style={styles.main}>
        <div style={styles.mainContent}>
          {selectedStudent ? (
            // Student Profile Detail View
            <div style={styles.card}>
              <button
                onClick={() => setSelectedStudent(null)}
                style={{...styles.button, color: '#10b981', backgroundColor: 'transparent', ...styles.mb6}}
              >
                ← Back to Talent Pool
              </button>
              
              {/* Profile Header */}
              <div style={{...styles.flex, gap: '1.5rem', alignItems: 'flex-start', ...styles.mb8}}>
                <img 
                  src={selectedStudent.profilePicture} 
                  alt={selectedStudent.name} 
                  style={styles.profileImageLarge}
                />
                <div style={{flex: 1}}>
                  <h1 style={{...styles.text2xl, ...styles.fontBold, ...styles.textGray900}}>{selectedStudent.name}</h1>
                  <p style={{...styles.textLg, ...styles.textGray600}}>{selectedStudent.major} • {selectedStudent.year}</p>
                  <p style={{...styles.textGray500, ...styles.flex, ...styles.mt1}}>
                    <MapPin style={{width: '16px', height: '16px', marginRight: '4px'}} />
                    {selectedStudent.university}, {selectedStudent.location}
                  </p>
                  <div style={{...styles.flex, ...styles.gap4, ...styles.mt4}}>
                    <div style={styles.textCenter}>
                      <div style={{...styles.text2xl, ...styles.fontBold, ...styles.textEmerald600}}>{selectedStudent.fitScore}%</div>
                      <div style={{...styles.textXs, ...styles.textGray500}}>Overall Fit</div>
                    </div>
                    <div style={{display: 'flex', flexWrap: 'wrap', gap: '0.5rem'}}>
                      {selectedStudent.interests.map((interest, idx) => (
                        <span key={idx} style={{...styles.tag, ...styles.tagBlue}}>
                          {interest}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Talent Genome Breakdown */}
              <div style={{...styles.gridCols3, ...styles.mb8}}>
                <div style={styles.skillContainer}>
                  <h3 style={{...styles.fontSemibold, ...styles.textGray900, ...styles.mb4, ...styles.flex}}>
                    <Code style={{width: '20px', height: '20px', marginRight: '8px'}} />
                    Technical Skills
                  </h3>
                  <div style={{display: 'flex', flexDirection: 'column', gap: '0.75rem'}}>
                    {Object.entries(selectedStudent.talentGenome.technicalSkills).map(([skill, score]) => (
                      <div key={skill} style={styles.skillItem}>
                        <div style={styles.skillHeader}>
                          <span style={styles.skillName}>{skill}</span>
                          <span style={styles.skillScore}>{score}%</span>
                        </div>
                        <div style={styles.progressBar}>
                          <div 
                            style={{
                              ...styles.progressFill,
                              width: `${score}%`,
                              backgroundColor: '#3b82f6'
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div style={styles.skillContainer}>
                  <h3 style={{...styles.fontSemibold, ...styles.textGray900, ...styles.mb4, ...styles.flex}}>
                    <Users style={{width: '20px', height: '20px', marginRight: '8px'}} />
                    Soft Skills
                  </h3>
                  <div style={{display: 'flex', flexDirection: 'column', gap: '0.75rem'}}>
                    {Object.entries(selectedStudent.talentGenome.softSkills).map(([skill, score]) => (
                      <div key={skill} style={styles.skillItem}>
                        <div style={styles.skillHeader}>
                          <span style={styles.skillName}>{skill}</span>
                          <span style={styles.skillScore}>{score}%</span>
                        </div>
                        <div style={styles.progressBar}>
                          <div 
                            style={{
                              ...styles.progressFill,
                              width: `${score}%`,
                              backgroundColor: '#8b5cf6'
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div style={styles.skillContainer}>
                  <h3 style={{...styles.fontSemibold, ...styles.textGray900, ...styles.mb4, ...styles.flex}}>
                    <Heart style={{width: '20px', height: '20px', marginRight: '8px'}} />
                    Cultural Fit
                  </h3>
                  <div style={{display: 'flex', flexDirection: 'column', gap: '0.75rem'}}>
                    {Object.entries(selectedStudent.talentGenome.culturalFit).map(([trait, score]) => (
                      <div key={trait} style={styles.skillItem}>
                        <div style={styles.skillHeader}>
                          <span style={styles.skillName}>{trait}</span>
                          <span style={styles.skillScore}>{score}%</span>
                        </div>
                        <div style={styles.progressBar}>
                          <div 
                            style={{
                              ...styles.progressFill,
                              width: `${score}%`,
                              backgroundColor: '#10b981'
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Verified Sources */}
              <div style={styles.mb8}>
                <h3 style={{...styles.fontSemibold, ...styles.textGray900, ...styles.mb4, ...styles.flex}}>
                  <Award style={{width: '20px', height: '20px', marginRight: '8px'}} />
                  Verified Evidence
                </h3>
                <div style={styles.gridCols4}>
                  {Object.entries(selectedStudent.verifiedSources).map(([source, data]) => (
                    <div key={source} style={{backgroundColor: 'white', border: '1px solid #e5e7eb', padding: '0.75rem', borderRadius: '8px'}}>
                      <div style={{...styles.flex, ...styles.mb2}}>
                        {source === 'github' && <GitBranch style={{width: '16px', height: '16px', marginRight: '8px', color: '#6b7280'}} />}
                        {source === 'coursera' && <BookOpen style={{width: '16px', height: '16px', marginRight: '8px', color: '#6b7280'}} />}
                        {source === 'kaggle' && <Trophy style={{width: '16px', height: '16px', marginRight: '8px', color: '#6b7280'}} />}
                        {source === 'projects' && <Code style={{width: '16px', height: '16px', marginRight: '8px', color: '#6b7280'}} />}
                        {source === 'leadership' && <Users style={{width: '16px', height: '16px', marginRight: '8px', color: '#6b7280'}} />}
                        <span style={{...styles.textSm, ...styles.fontMedium, textTransform: 'capitalize'}}>{source}</span>
                      </div>
                      <p style={{...styles.textSm, ...styles.textGray600}}>{data}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Achievements */}
              <div style={styles.mb8}>
                <h3 style={{...styles.fontSemibold, ...styles.textGray900, ...styles.mb4}}>Key Achievements</h3>
                <div style={{display: 'flex', flexWrap: 'wrap', gap: '0.5rem'}}>
                  {selectedStudent.achievements.map((achievement, idx) => (
                    <span key={idx} style={{...styles.tag, ...styles.tagYellow, padding: '8px 16px'}}>
                      🏆 {achievement}
                    </span>
                  ))}
                </div>
              </div>

              <div style={{display: 'flex', justifyContent: 'flex-end', gap: '1rem'}}>
                <button 
                  style={{
                    ...styles.button, 
                    border: '1px solid #d1d5db', 
                    color: '#374151',
                    backgroundColor: 'white'
                  }}
                  onMouseOver={(e) => e.target.style.backgroundColor = '#f9fafb'}
                  onMouseOut={(e) => e.target.style.backgroundColor = 'white'}
                >
                  Save to Shortlist
                </button>
                <button 
                  style={{
                    ...styles.button, 
                    backgroundColor: '#10b981', 
                    color: 'white'
                  }}
                  onMouseOver={(e) => e.target.style.backgroundColor = '#059669'}
                  onMouseOut={(e) => e.target.style.backgroundColor = '#10b981'}
                >
                  Contact Student
                </button>
              </div>
            </div>
          ) : (
            // Talent Pool Overview
            <div>
              {/* Stats Dashboard */}
              <div style={{...styles.gridCols4, ...styles.mb8}}>
                <div style={styles.statCard}>
                  <div style={styles.flexBetween}>
                    <div>
                      <p style={styles.statLabel}>Total Eligible Students</p>
                      <p style={styles.statNumber}>{mockStudents.length}</p>
                    </div>
                    <Users style={{width: '32px', height: '32px', color: '#10b981'}} />
                  </div>
                </div>
                
                <div style={styles.statCard}>
                  <div style={styles.flexBetween}>
                    <div>
                      <p style={styles.statLabel}>High Fit Score (90%+)</p>
                      <p style={styles.statNumber}>{mockStudents.filter(s => s.fitScore >= 90).length}</p>
                    </div>
                    <Star style={{width: '32px', height: '32px', color: '#eab308'}} />
                  </div>
                </div>
                
                <div style={styles.statCard}>
                  <div style={styles.flexBetween}>
                    <div>
                      <p style={styles.statLabel}>Average Fit Score</p>
                      <p style={styles.statNumber}>{Math.round(mockStudents.reduce((acc, s) => acc + s.fitScore, 0) / mockStudents.length)}%</p>
                    </div>
                    <TrendingUp style={{width: '32px', height: '32px', color: '#3b82f6'}} />
                  </div>
                </div>
                
                <div style={styles.statCard}>
                  <div style={styles.flexBetween}>
                    <div>
                      <p style={styles.statLabel}>Universities</p>
                      <p style={styles.statNumber}>{new Set(mockStudents.map(s => s.university)).size}</p>
                    </div>
                    <BookOpen style={{width: '32px', height: '32px', color: '#8b5cf6'}} />
                  </div>
                </div>
              </div>

              {/* Search and Filter */}
              <div style={styles.searchContainer}>
                <div style={styles.searchForm}>
                  <div style={styles.searchInputContainer}>
                    <Search style={{...styles.searchIcon, width: '20px', height: '20px'}} />
                    <input
                      type="text"
                      placeholder="Search students..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      style={styles.searchInput}
                      onFocus={(e) => e.target.style.borderColor = '#10b981'}
                      onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                    />
                  </div>
                  <div style={styles.filterContainer}>
                    <Filter style={{width: '16px', height: '16px', color: '#9ca3af'}} />
                    <span style={styles.filterLabel}>Min Fit Score:</span>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={filterScore}
                      onChange={(e) => setFilterScore(e.target.value)}
                      style={{width: '80px'}}
                    />
                    <span style={{...styles.textSm, ...styles.fontMedium}}>{filterScore}%</span>
                  </div>
                </div>
              </div>

              {/* Student Profiles Grid */}
              <div style={styles.gridCols3}>
                {mockStudents
                  .filter(student => student.fitScore >= filterScore)
                  .filter(student => searchTerm === '' || student.name.toLowerCase().includes(searchTerm.toLowerCase()) || student.university.toLowerCase().includes(searchTerm.toLowerCase()))
                  .map(student => (
                  <div 
                    key={student.id} 
                    style={styles.cardHover}
                    onClick={() => setSelectedStudent(student)}
                    onMouseOver={(e) => e.target.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)'}
                    onMouseOut={(e) => e.target.style.boxShadow = '0 1px 3px rgba(0,0,0,0.1)'}
                  >
                    {/* Student Card Header */}
                    <div style={{...styles.flex, ...styles.gap4, ...styles.mb4}}>
                      <img 
                        src={student.profilePicture} 
                        alt={student.name} 
                        style={styles.profileImage}
                      />
                      <div style={{flex: 1}}>
                        <h3 style={{...styles.fontSemibold, ...styles.textGray900}}>{student.name}</h3>
                        <p style={{...styles.textSm, ...styles.textGray600}}>{student.university}</p>
                        <p style={{...styles.textXs, ...styles.textGray500}}>{student.major} • {student.year}</p>
                      </div>
                      <div style={styles.textRight}>
                        <div style={{...styles.textLg, ...styles.fontBold, ...styles.textEmerald600}}>{student.fitScore}%</div>
                        <div style={{...styles.textXs, ...styles.textGray500}}>Fit Score</div>
                      </div>
                    </div>
                    
                    {/* Top Skills Preview */}
                    <div style={styles.mb4}>
                      <h4 style={{...styles.textSm, ...styles.fontMedium, ...styles.textGray700, ...styles.mb2}}>Top Technical Skills</h4>
                      <div style={{display: 'flex', flexWrap: 'wrap', gap: '0.25rem'}}>
                        {Object.entries(student.talentGenome.technicalSkills)
                          .sort(([,a], [,b]) => b - a)
                          .slice(0, 3)
                          .map(([skill, score]) => (
                          <span key={skill} style={{...styles.tag, ...styles.tagBlue, ...styles.textXs}}>
                            {skill} ({score}%)
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    {/* Interests */}
                    <div style={styles.mb4}>
                      <div style={{display: 'flex', flexWrap: 'wrap', gap: '0.25rem'}}>
                        {student.interests.slice(0, 2).map((interest, idx) => (
                          <span key={idx} style={{...styles.tag, ...styles.tagGray, ...styles.textXs}}>
                            {interest}
                          </span>
                        ))}
                        {student.interests.length > 2 && (
                          <span style={{...styles.tag, ...styles.tagGray, ...styles.textXs}}>
                            +{student.interests.length - 2} more
                          </span>
                        )}
                      </div>
                    </div>
                    
                    {/* Verified Sources Preview */}
                    <div style={{...styles.flexBetween, ...styles.textXs, ...styles.textGray500}}>
                      <div style={{...styles.flex, gap: '0.75rem'}}>
                        <span style={styles.flex}>
                          <GitBranch style={{width: '12px', height: '12px', marginRight: '4px'}} />
                          GitHub
                        </span>
                        <span style={styles.flex}>
                          <BookOpen style={{width: '12px', height: '12px', marginRight: '4px'}} />
                          Courses
                        </span>
                        <span style={styles.flex}>
                          <Trophy style={{width: '12px', height: '12px', marginRight: '4px'}} />
                          Competitions
                        </span>
                      </div>
                      <ChevronRight style={{width: '16px', height: '16px'}} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  // Main App Component
  return (
    <div>
      {!userType && <LoginPage />}
      {userType === 'student' && <StudentDashboard />}
      {userType === 'recruiter' && <RecruiterDashboard />}
    </div>
  );
};

export default TalentGenomePlatform;