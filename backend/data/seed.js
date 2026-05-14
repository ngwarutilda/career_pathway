require('dotenv').config();
const mongoose = require('mongoose');
const University = require('../models/University');
const Program = require('../models/Program');
const Career = require('../models/Career');
const Concours = require('../models/Concours');
const Admin = require('../models/Admin');

const universities = [
  // PUBLIC
  { name: 'University of Buea', abbreviation: 'UB', city: 'Buea', region: 'South West', type: 'public', website: 'https://www.ubuea.cm', description: 'An Anglophone public university and one of the leading universities in Cameroon.' },
  { name: 'University of Yaoundé I', abbreviation: 'UYI', city: 'Yaoundé', region: 'Centre', type: 'public', website: 'https://www.uy1.uninet.cm', description: 'The flagship public university in Cameroon\'s capital, known for sciences and medicine.' },
  { name: 'University of Yaoundé II', abbreviation: 'UYII', city: 'Yaoundé', region: 'Centre', type: 'public', description: 'Public university known for law, economics and management.' },
  { name: 'University of Douala', abbreviation: 'UD', city: 'Douala', region: 'Littoral', type: 'public', description: 'Public university in Cameroon\'s economic capital, strong in business and engineering.' },
  { name: 'University of Dschang', abbreviation: 'UDS', city: 'Dschang', region: 'West', type: 'public', description: 'Public university well known for agriculture and science programs.' },
  { name: 'University of Ngaoundéré', abbreviation: 'UN', city: 'Ngaoundéré', region: 'Adamawa', type: 'public', description: 'Public university in northern Cameroon known for food science and technology.' },
  { name: 'University of Bamenda', abbreviation: 'UBa', city: 'Bamenda', region: 'North West', type: 'public', description: 'Anglophone public university in the North West region.' },
  { name: 'University of Maroua', abbreviation: 'UM', city: 'Maroua', region: 'Far North', type: 'public', description: 'Public university in the Far North region of Cameroon.' },
  // PRIVATE
  { name: 'Catholic University of Cameroon', abbreviation: 'CATUC', city: 'Bamenda', region: 'North West', type: 'private', website: 'https://www.catuc.org', description: 'A leading private Catholic university in Anglophone Cameroon.' },
  { name: 'Presbyterian University of Cameroon', abbreviation: 'PUC', city: 'Limbe', region: 'South West', type: 'private', description: 'Private university offering programs in technology and management.' },
  { name: 'Université des Montagnes', abbreviation: 'UdM', city: 'Bangangté', region: 'West', type: 'private', description: 'Private university known for medicine and health sciences.' },
  { name: 'Institut Universitaire du Golfe de Guinée', abbreviation: 'IUG', city: 'Douala', region: 'Littoral', type: 'private', description: 'Private university focused on engineering and management.' },
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB...');

    await University.deleteMany();
    await Program.deleteMany();
    await Career.deleteMany();
    await Concours.deleteMany();
    await Admin.deleteMany();
    console.log('🗑️  Cleared existing data...');

    // Seed universities
    const createdUniversities = await University.insertMany(universities);
    console.log(`✅ Inserted ${createdUniversities.length} universities`);

    const ub   = createdUniversities.find(u => u.abbreviation === 'UB');
    const uyi  = createdUniversities.find(u => u.abbreviation === 'UYI');
    const uyii = createdUniversities.find(u => u.abbreviation === 'UYII');
    const ud   = createdUniversities.find(u => u.abbreviation === 'UD');
    const uds  = createdUniversities.find(u => u.abbreviation === 'UDS');
    const catuc = createdUniversities.find(u => u.abbreviation === 'CATUC');
    const udm  = createdUniversities.find(u => u.abbreviation === 'UdM');
    const iug  = createdUniversities.find(u => u.abbreviation === 'IUG');
    const uba  = createdUniversities.find(u => u.abbreviation === 'UBa');

    // Seed programs
    const programs = [
      // UB programs
      {
        name: 'Computer Science', university: ub._id,
        faculty: 'Faculty of Engineering and Technology',
        degree: 'BSc', duration: 3,
        description: 'Study of algorithms, programming, software development, artificial intelligence, and computing systems.',
        requiredSubjects: ['Mathematics', 'Physics'],
        preferredSubjects: ['Further Mathematics', 'Chemistry'],
        relatedCareers: ['Software Engineer', 'Data Scientist', 'Cybersecurity Analyst', 'AI Engineer'],
        relatedFields: ['Technology', 'Engineering', 'Computing'],
        admissionRequirements: 'GCE A-Level with Mathematics and Physics. Minimum grade C in both subjects.',
        tuitionFee: '50,000 - 80,000 XAF per year',
      },
      {
        name: 'Biochemistry', university: ub._id,
        faculty: 'Faculty of Science',
        degree: 'BSc', duration: 3,
        description: 'Study of chemical processes within living organisms, molecular biology, and biotechnology.',
        requiredSubjects: ['Biology', 'Chemistry'],
        preferredSubjects: ['Mathematics', 'Physics'],
        relatedCareers: ['Biochemist', 'Medical Researcher', 'Pharmacologist', 'Lab Scientist'],
        relatedFields: ['Science', 'Medicine', 'Health'],
        admissionRequirements: 'GCE A-Level with Biology and Chemistry.',
        tuitionFee: '50,000 - 80,000 XAF per year',
      },
      {
        name: 'Law', university: ub._id,
        faculty: 'Faculty of Social and Management Sciences',
        degree: 'LLB', duration: 4,
        description: 'Study of legal systems, legislation, human rights, and justice in Cameroon and internationally.',
        requiredSubjects: ['English Language', 'History'],
        preferredSubjects: ['Economics', 'Government'],
        relatedCareers: ['Lawyer', 'Judge', 'Legal Consultant', 'Notary', 'Human Rights Officer'],
        relatedFields: ['Law', 'Social Sciences', 'Governance'],
        admissionRequirements: 'GCE A-Level with English Language.',
        tuitionFee: '50,000 - 80,000 XAF per year',
      },
      {
        name: 'Economics', university: ub._id,
        faculty: 'Faculty of Social and Management Sciences',
        degree: 'BSc', duration: 3,
        description: 'Study of economic theory, development economics, and financial markets.',
        requiredSubjects: ['Mathematics', 'Economics'],
        preferredSubjects: ['Statistics', 'Geography'],
        relatedCareers: ['Economist', 'Financial Analyst', 'Policy Advisor', 'Banker'],
        relatedFields: ['Business', 'Finance', 'Social Sciences'],
        admissionRequirements: 'GCE A-Level with Mathematics.',
        tuitionFee: '50,000 - 80,000 XAF per year',
      },
      // UYI programs
      {
        name: 'Medicine and Surgery', university: uyi._id,
        faculty: 'Faculty of Medicine and Biomedical Sciences',
        degree: 'MBBS', duration: 7,
        description: 'Comprehensive medical training covering anatomy, physiology, pathology, and clinical practice.',
        requiredSubjects: ['Biology', 'Chemistry', 'Physics'],
        preferredSubjects: ['Mathematics'],
        relatedCareers: ['Medical Doctor', 'Surgeon', 'Specialist Physician', 'Public Health Officer'],
        relatedFields: ['Medicine', 'Health', 'Science'],
        admissionRequirements: 'GCE A-Level with Biology, Chemistry, and Physics. Competitive entrance exam required.',
        tuitionFee: '100,000 - 150,000 XAF per year',
      },
      {
        name: 'Computer Engineering', university: uyi._id,
        faculty: 'Faculty of Science',
        degree: 'BSc', duration: 3,
        description: 'Study of hardware systems, embedded systems, computer networks and software engineering.',
        requiredSubjects: ['Mathematics', 'Physics'],
        preferredSubjects: ['Further Mathematics'],
        relatedCareers: ['Computer Engineer', 'Network Engineer', 'Hardware Designer', 'Systems Analyst'],
        relatedFields: ['Technology', 'Engineering', 'Computing'],
        admissionRequirements: 'GCE A-Level with Mathematics and Physics.',
        tuitionFee: '80,000 - 120,000 XAF per year',
      },
      // UYII programs
      {
        name: 'Business Administration', university: uyii._id,
        faculty: 'Faculty of Economics and Management',
        degree: 'BSc', duration: 3,
        description: 'Study of management principles, marketing, human resources and organizational behavior.',
        requiredSubjects: ['Mathematics', 'Economics'],
        preferredSubjects: ['English Language', 'Accounting'],
        relatedCareers: ['Business Manager', 'Entrepreneur', 'HR Manager', 'Marketing Executive'],
        relatedFields: ['Business', 'Management', 'Finance'],
        admissionRequirements: 'GCE A-Level with any two subjects.',
        tuitionFee: '50,000 - 70,000 XAF per year',
      },
      // UD programs
      {
        name: 'Civil Engineering', university: ud._id,
        faculty: 'Faculty of Engineering',
        degree: 'BEng', duration: 4,
        description: 'Study of infrastructure design, construction, structural engineering and project management.',
        requiredSubjects: ['Mathematics', 'Physics'],
        preferredSubjects: ['Further Mathematics', 'Chemistry'],
        relatedCareers: ['Civil Engineer', 'Structural Engineer', 'Project Manager', 'Urban Planner'],
        relatedFields: ['Engineering', 'Technology', 'Construction'],
        admissionRequirements: 'GCE A-Level with Mathematics and Physics. Grade B or above.',
        tuitionFee: '80,000 - 120,000 XAF per year',
      },
      // UDS programs
      {
        name: 'Agriculture', university: uds._id,
        faculty: 'Faculty of Agronomy and Agricultural Sciences',
        degree: 'BSc', duration: 3,
        description: 'Study of crop production, soil science, animal husbandry and sustainable farming.',
        requiredSubjects: ['Biology', 'Chemistry'],
        preferredSubjects: ['Geography', 'Mathematics'],
        relatedCareers: ['Agronomist', 'Farm Manager', 'Agricultural Researcher', 'Food Scientist'],
        relatedFields: ['Agriculture', 'Environment', 'Science'],
        admissionRequirements: 'GCE A-Level with Biology and Chemistry.',
        tuitionFee: '40,000 - 60,000 XAF per year',
      },
      // CATUC programs
      {
        name: 'Computer Science', university: catuc._id,
        faculty: 'Faculty of Engineering and Technology',
        degree: 'BSc', duration: 3,
        description: 'Study of software development, databases, networks and information systems.',
        requiredSubjects: ['Mathematics', 'Physics'],
        preferredSubjects: ['Further Mathematics'],
        relatedCareers: ['Software Engineer', 'Web Developer', 'Database Administrator', 'IT Consultant'],
        relatedFields: ['Technology', 'Engineering', 'Computing'],
        admissionRequirements: 'GCE A-Level with Mathematics. Interview may be required.',
        tuitionFee: '250,000 - 400,000 XAF per year',
      },
      {
        name: 'Nursing', university: catuc._id,
        faculty: 'Faculty of Health Sciences',
        degree: 'BSc', duration: 3,
        description: 'Training in patient care, medical ethics, community health and clinical nursing practice.',
        requiredSubjects: ['Biology', 'Chemistry'],
        preferredSubjects: ['Physics', 'Mathematics'],
        relatedCareers: ['Nurse', 'Midwife', 'Community Health Officer', 'Health Educator'],
        relatedFields: ['Medicine', 'Health', 'Science'],
        admissionRequirements: 'GCE A-Level with Biology and Chemistry.',
        tuitionFee: '300,000 - 450,000 XAF per year',
      },
      // UdM programs
      {
        name: 'Medicine', university: udm._id,
        faculty: 'Faculty of Medicine',
        degree: 'MBBS', duration: 6,
        description: 'Medical training with focus on primary healthcare and community medicine in Cameroon.',
        requiredSubjects: ['Biology', 'Chemistry', 'Physics'],
        preferredSubjects: ['Mathematics'],
        relatedCareers: ['Medical Doctor', 'General Practitioner', 'Community Health Physician'],
        relatedFields: ['Medicine', 'Health', 'Science'],
        admissionRequirements: 'GCE A-Level with Biology, Chemistry and Physics. Entrance exam required.',
        tuitionFee: '500,000 - 800,000 XAF per year',
      },
      // IUG programs
      {
        name: 'Electrical Engineering', university: iug._id,
        faculty: 'Faculty of Engineering',
        degree: 'BEng', duration: 4,
        description: 'Study of electrical systems, electronics, power systems and telecommunications.',
        requiredSubjects: ['Mathematics', 'Physics'],
        preferredSubjects: ['Further Mathematics', 'Chemistry'],
        relatedCareers: ['Electrical Engineer', 'Electronics Engineer', 'Telecoms Engineer', 'Power Engineer'],
        relatedFields: ['Engineering', 'Technology'],
        admissionRequirements: 'GCE A-Level with Mathematics and Physics.',
        tuitionFee: '400,000 - 600,000 XAF per year',
      },
      // UBa programs
      {
        name: 'Public Health', university: uba._id,
        faculty: 'Faculty of Health Sciences',
        degree: 'BSc', duration: 3,
        description: 'Study of disease prevention, epidemiology, health policy and community health promotion.',
        requiredSubjects: ['Biology', 'Chemistry'],
        preferredSubjects: ['Mathematics', 'Geography'],
        relatedCareers: ['Public Health Officer', 'Epidemiologist', 'Health Policy Analyst', 'Community Health Worker'],
        relatedFields: ['Health', 'Medicine', 'Science'],
        admissionRequirements: 'GCE A-Level with Biology and any science subject.',
        tuitionFee: '60,000 - 90,000 XAF per year',
      },
    ];

    const createdPrograms = await Program.insertMany(programs);
    console.log(`✅ Inserted ${createdPrograms.length} programs`);

    // Seed careers
    const careers = [
      {
        title: 'Software Engineer',
        field: 'Technology',
        description: 'Design, develop, and maintain software applications and systems. One of the fastest growing careers in Cameroon.',
        relatedSubjects: ['Mathematics', 'Physics', 'Further Mathematics'],
        relatedPrograms: ['Computer Science', 'Computer Engineering'],
        relatedUniversities: ['University of Buea', 'University of Yaoundé I', 'Catholic University of Cameroon'],
        jobProspects: 'High demand in Cameroon with opportunities in fintech, telecom companies like MTN and Orange, and international remote work.',
        averageSalary: '150,000 - 500,000 XAF/month',
        skills: ['Programming', 'Problem Solving', 'Teamwork', 'Logical Thinking'],
      },
      {
        title: 'Medical Doctor',
        field: 'Medicine',
        description: 'Diagnose and treat illnesses, promote health and prevent disease in communities across Cameroon.',
        relatedSubjects: ['Biology', 'Chemistry', 'Physics'],
        relatedPrograms: ['Medicine and Surgery', 'Medicine'],
        relatedUniversities: ['University of Yaoundé I', 'Université des Montagnes'],
        jobProspects: 'Always in high demand in Cameroon. Opportunities in government hospitals, private clinics, and NGOs.',
        averageSalary: '300,000 - 800,000 XAF/month',
        skills: ['Critical Thinking', 'Communication', 'Empathy', 'Attention to Detail'],
      },
      {
        title: 'Lawyer',
        field: 'Law',
        description: 'Provide legal advice, represent clients in court, and help individuals and organizations understand the law.',
        relatedSubjects: ['English Language', 'History', 'Economics'],
        relatedPrograms: ['Law'],
        relatedUniversities: ['University of Buea', 'University of Yaoundé II'],
        jobProspects: 'Good opportunities in private practice, government ministries, courts, and international organizations in Cameroon.',
        averageSalary: '150,000 - 600,000 XAF/month',
        skills: ['Argumentation', 'Research', 'Writing', 'Critical Thinking'],
      },
      {
        title: 'Civil Engineer',
        field: 'Engineering',
        description: 'Design and oversee construction of roads, bridges, buildings, and infrastructure across Cameroon.',
        relatedSubjects: ['Mathematics', 'Physics', 'Further Mathematics'],
        relatedPrograms: ['Civil Engineering', 'Electrical Engineering'],
        relatedUniversities: ['University of Douala', 'Institut Universitaire du Golfe de Guinée'],
        jobProspects: 'High demand due to ongoing infrastructure development in Cameroon. Government and private construction firms.',
        averageSalary: '200,000 - 500,000 XAF/month',
        skills: ['Problem Solving', 'Project Management', 'Technical Drawing', 'Mathematics'],
      },
      {
        title: 'Data Scientist',
        field: 'Technology',
        description: 'Analyze large datasets to find patterns and insights that help organizations make better decisions.',
        relatedSubjects: ['Mathematics', 'Physics', 'Statistics'],
        relatedPrograms: ['Computer Science', 'Computer Engineering'],
        relatedUniversities: ['University of Buea', 'University of Yaoundé I'],
        jobProspects: 'Emerging field in Cameroon with growing opportunities in banking, telecom, and government agencies.',
        averageSalary: '200,000 - 600,000 XAF/month',
        skills: ['Statistics', 'Programming', 'Machine Learning', 'Data Visualization'],
      },
      {
        title: 'Agronomist',
        field: 'Agriculture',
        description: 'Apply science to improve crop production and soil management to boost food security in Cameroon.',
        relatedSubjects: ['Biology', 'Chemistry', 'Geography'],
        relatedPrograms: ['Agriculture'],
        relatedUniversities: ['University of Dschang'],
        jobProspects: 'Strong demand in Cameroon given the agricultural economy. Opportunities with government, NGOs and agribusiness.',
        averageSalary: '100,000 - 300,000 XAF/month',
        skills: ['Research', 'Field Work', 'Problem Solving', 'Environmental Awareness'],
      },
      {
        title: 'Economist',
        field: 'Business',
        description: 'Study and analyze economic trends, advise governments and businesses on financial and economic policy.',
        relatedSubjects: ['Mathematics', 'Economics', 'Statistics'],
        relatedPrograms: ['Economics', 'Business Administration'],
        relatedUniversities: ['University of Buea', 'University of Yaoundé II'],
        jobProspects: 'Opportunities in Cameroonian government ministries, World Bank, African Development Bank and private sector.',
        averageSalary: '150,000 - 400,000 XAF/month',
        skills: ['Analytical Thinking', 'Research', 'Mathematics', 'Report Writing'],
      },
      {
        title: 'Nurse',
        field: 'Health',
        description: 'Provide direct patient care, administer medications, and support doctors in hospitals and health centers.',
        relatedSubjects: ['Biology', 'Chemistry', 'Physics'],
        relatedPrograms: ['Nursing', 'Public Health'],
        relatedUniversities: ['Catholic University of Cameroon', 'University of Bamenda'],
        jobProspects: 'Critical shortage of nurses in Cameroon means very high job security. Government hospitals and private clinics.',
        averageSalary: '80,000 - 200,000 XAF/month',
        skills: ['Patient Care', 'Communication', 'Empathy', 'Attention to Detail'],
      },
    ];

    const createdCareers = await Career.insertMany(careers);
    console.log(`✅ Inserted ${createdCareers.length} careers`);

    // Seed concours
    const concours = [
      {
        name: 'Concours ENAM',
        school: 'École Nationale d\'Administration et de Magistrature (ENAM)',
        category: 'Government',
        description: 'Competitive entrance exam for training future civil servants, magistrates and diplomats in Cameroon.',
        requirements: ['GCE A-Level or equivalent', 'Cameroonian nationality', 'Age 17-26 years', 'Good physical health'],
        subjects: ['English/French Language', 'General Knowledge', 'Mathematics', 'Law'],
        examDate: new Date('2026-08-15'),
        applicationDeadline: new Date('2026-06-30'),
        location: 'Yaoundé, Douala, Buea, Bamenda',
        availableSlots: 200,
        isActive: true,
      },
      {
        name: 'Concours ENSP',
        school: 'École Nationale Supérieure Polytechnique (ENSP)',
        category: 'Engineering',
        description: 'Entrance exam for the National Advanced School of Engineering, training top engineers in Cameroon.',
        requirements: ['GCE A-Level with Mathematics and Physics', 'Age below 22 years', 'Cameroonian nationality'],
        subjects: ['Mathematics', 'Physics', 'Chemistry'],
        examDate: new Date('2026-07-20'),
        applicationDeadline: new Date('2026-05-31'),
        location: 'Yaoundé',
        availableSlots: 150,
        isActive: true,
      },
      {
        name: 'Concours Police Nationale',
        school: 'École de Police de Yaoundé',
        category: 'Military & Police',
        description: 'Recruitment exam for the Cameroon National Police force.',
        requirements: ['GCE O-Level minimum', 'Age 17-25 years', 'Cameroonian nationality', 'Physical fitness test', 'Height minimum 1.68m for men'],
        subjects: ['General Knowledge', 'French/English Language', 'Physical Education'],
        examDate: new Date('2026-09-10'),
        applicationDeadline: new Date('2026-07-15'),
        location: 'Yaoundé, Douala, Buea, Ngaoundéré, Bamenda',
        availableSlots: 500,
        isActive: true,
      },
      {
        name: 'Concours ENS',
        school: 'École Normale Supérieure (ENS)',
        category: 'Education',
        description: 'Entrance exam for training future secondary school teachers across Cameroon.',
        requirements: ['GCE A-Level with relevant subjects', 'Age below 26 years', 'Cameroonian nationality'],
        subjects: ['Subject specialization', 'General Culture', 'French/English'],
        examDate: new Date('2026-08-05'),
        applicationDeadline: new Date('2026-06-15'),
        location: 'Yaoundé, Bambili',
        availableSlots: 300,
        isActive: true,
      },
      {
        name: 'Concours Armée de Terre',
        school: 'École Militaire Inter-Armées (EMIA)',
        category: 'Military & Police',
        description: 'Recruitment exam for the Cameroon Army officer training program.',
        requirements: ['GCE A-Level', 'Age 18-22 years', 'Cameroonian nationality', 'Physical fitness', 'Medical clearance'],
        subjects: ['Mathematics', 'Physics', 'General Knowledge', 'Physical Education'],
        examDate: new Date('2026-10-01'),
        applicationDeadline: new Date('2026-08-01'),
        location: 'Yaoundé',
        availableSlots: 100,
        isActive: true,
      },
      {
        name: 'Concours FMSB',
        school: 'Faculté de Médecine et des Sciences Biomédicales (FMSB)',
        category: 'Medicine',
        description: 'Competitive entrance exam for Medicine and Biomedical Sciences at University of Yaoundé I.',
        requirements: ['GCE A-Level with Biology, Chemistry and Physics', 'Age below 22 years', 'Cameroonian nationality'],
        subjects: ['Biology', 'Chemistry', 'Physics', 'Mathematics'],
        examDate: new Date('2026-09-25'),
        applicationDeadline: new Date('2026-07-30'),
        location: 'Yaoundé',
        availableSlots: 120,
        isActive: true,
      },
    ];

    const createdConcours = await Concours.insertMany(concours);
    console.log(`✅ Inserted ${createdConcours.length} concours`);

    // Create super admin account
    const admin = await Admin.create({
      name: 'Career Pathway Admin',
      email: 'admin@careerpathway.cm',
      password: 'Admin@2024',
    });
    console.log(`✅ Admin account created`);
    console.log(`   Email: admin@careerpathway.cm`);
    console.log(`   Password: Admin@2024`);

    console.log('\n🎉 Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding failed:', error.message);
    process.exit(1);
  }
};

seedDB();