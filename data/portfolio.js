// ============================================================
//  EDIT THIS FILE ONLY. The whole website is built from it.
//  To add something, copy an existing item, paste it below it,
//  change the text, save. Then push to GitHub; Vercel redeploys.
// ============================================================

export const profile = {
  name: 'Lingesh Jogu',
  role: 'Software Developer',
  email: 'Lingeshofficial99@gmail.com',
  phone: '+91-6302426948',
  location: 'Hyderabad, India',
  linkedin: 'https://linkedin.com/in/lingeshjogu',
  github: 'https://github.com/lingeshjogu',
  leetcode: 'https://leetcode.com/lingeshjogu',
  photo: '/photo.jpeg',              // put a new image in /public and change this
  resume: '/Lingesh_Jogu_Resume.pdf', // replace the PDF in /public to update
  typedRoles: ['builds Flask apps.', 'trains vision models.', 'writes clean SQL.', 'ships to production.'],
  summary:
    'Software developer who builds complete applications in Python, from the database to the browser, with a focus on efficient, scalable solutions and a habit of learning something new every week.',
}

// Add more skill groups or skills freely.
export const skills = [
  { group: 'Programming', items: ['Python', 'JavaScript'] },
  { group: 'Database', items: ['MySQL', 'SQLAlchemy', 'SQL'] },
  { group: 'Web', items: ['HTML', 'CSS', 'Flask', 'Bootstrap'] },
  { group: 'Tools', items: ['Git', 'GitHub', 'VS Code', 'Render'] },
]

// Add a new project = add a new { ... } block.
// live and code are optional: leave '' to hide the button.
export const projects = [
  {
    title: 'Smart Library Management System',
    tag: 'Flask web app',
    stack: ['Python', 'Flask', 'MySQL', 'SQLAlchemy'],
    points: [
      'Manages students, books and borrowing records in one admin dashboard.',
      'Admin login, plus add, edit, delete, search and view for every record.',
      'Book issue and return with due dates, automatic fines and overdue reminders.',
    ],
    live: '',
    code: 'https://github.com/lingeshjogu',
  },
  {
    title: 'Real-Time Weapon Detection System',
    tag: 'Computer vision',
    stack: ['YOLO', 'OpenCV', 'Deep Learning', 'Flask'],
    points: [
      'YOLO-based detector that finds weapon-like objects in images and video.',
      'Draws bounding boxes with confidence scores using OpenCV.',
      'Flask backend accepts uploads and returns detection results.',
    ],
    live: '',
    code: 'https://github.com/lingeshjogu',
  },
]

// Add a new certification = add a new { ... } block.
export const certifications = [
  { title: 'GenAI Powered Data Analytics', issuer: 'Tata Forage', year: '2026', link: '' },
  { title: 'Full Stack Web Developer Certification', issuer: 'Next Wave', year: '', link: '' },
]

// Education, newest first.
export const education = [
  { school: 'Malla Reddy Institute of Technology and Sciences', degree: 'B.Tech in Information Technology', years: '2022 – 2026', score: 'CGPA 8.0 / 10' },
  { school: 'Bhashyam Junior College', degree: 'Class XII', years: '2020 – 2022', score: '7.2 / 10' },
  { school: 'New Era High School', degree: 'Class X', years: '2020', score: '10.0 / 10' },
]

// Optional extra sections. Add anything: hackathons, internships, achievements...
export const extras = [
  // { title: 'Hackathon Finalist', text: 'Built a ... in 24 hours.', year: '2026' },
]
