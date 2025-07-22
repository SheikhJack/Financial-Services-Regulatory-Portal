// TEMPORARY DATA

export let role = "Client";

// Fintech-adapted version of your LMS dataset

export const reviewersData = [
  {
    id: 1,
    reviewerId: "REV001",
    name: "Mpho Dintwe",
    email: "mpho@finbot.co.bw",
    photo: "https://images.pexels.com/photos/2888150/pexels-photo-2888150.jpeg",
    phone: "71234567",
    specialties: ["KYC", "AML"],
    departments: ["Onboarding", "Compliance", "Risk"],
    address: "Plot 123, Gaborone, Botswana",
  },
  {
    id: 2,
    reviewerId: "REV002",
    name: "Naledi Molefe",
    email: "naledi@finbot.co.bw",
    photo: "https://images.pexels.com/photos/936126/pexels-photo-936126.jpeg",
    phone: "72234567",
    specialties: ["Fraud", "Sanctions"],
    departments: ["Fraud Prevention", "Compliance"],
    address: "Plot 45, Gaborone, Botswana",
  },
  // ...add more as needed
];

export const analystsData = [
  {
    id: 1,
    analystId: "CLI001",
    name: "Thapelo Masire",
    email: "thapelo@finbot.co.bw",
    photo: "https://images.pexels.com/photos/428328/pexels-photo-428328.jpeg",
    phone: "73345678",
    tier: "Gold",
    department: "Compliance",
    address: "Unit 12, Block 6, Gaborone",
  },
  {
    id: 2,
    analystId: "CLI002",
    name: "Keneilwe Dube",
    email: "keneilwe@finbot.co.bw",
    photo: "https://images.pexels.com/photos/1187765/pexels-photo-1187765.jpeg",
    phone: "74445678",
    tier: "Silver",
    department: "Onboarding",
    address: "Phase 2, Gaborone",
  },
  // ...add more as needed
];

export const clientsData = [
  {
    id: 1,
    name: "Kgosi Kgatleng",
    entities: ["Kgatleng Holdings"],
    email: "kgosi@kgatleng.com",
    phone: "75545678",
    address: "Francistown",
  },
  {
    id: 2,
    name: "Lorato Tshireletso",
    entities: ["Lorato Legal Inc."],
    email: "lorato@legalbw.com",
    phone: "76645678",
    address: "Maun",
  },
  // ...
];

export const modulesData = [
  {
    id: 1,
    name: "KYC",
    reviewers: ["Mpho Dintwe", "Naledi Molefe"],
  },
  {
    id: 2,
    name: "Transaction Monitoring",
    reviewers: ["Naledi Molefe"],
  },
  // ...
];

export const teamsData = [
  {
    id: 1,
    name: "Onboarding",
    capacity: 10,
    tier: "Entry",
    supervisor: "Tumisang Molefe",
  },
  {
    id: 2,
    name: "Fraud Prevention",
    capacity: 8,
    tier: "Advanced",
    supervisor: "Onkabetse Mogapi",
  },
  // ...
];

export const reviewsData = [
  {
    id: 1,
    module: "KYC",
    department: "Onboarding",
    reviewer: "Mpho Dintwe",
  },
  {
    id: 2,
    module: "Sanctions Screening",
    department: "Risk & Compliance",
    reviewer: "Naledi Molefe",
  },
  // ...
];

export const auditChecksData = [
  {
    id: 1,
    module: "KYC",
    department: "Onboarding",
    auditor: "Lorraine Kgosi",
    date: "2025-01-01",
  },
  {
    id: 2,
    module: "Fraud Risk",
    department: "Fraud Prevention",
    auditor: "Thuso Dube",
    date: "2025-01-01",
  },
  // ...
];

export const assignmentsData = [
  {
    id: 1,
    module: "KYC Review Assignment",
    department: "Onboarding",
    supervisor: "Kagiso Sebego",
    dueDate: "2025-01-01",
  },
  {
    id: 2,
    module: "Transaction Risk Analysis",
    department: "Risk & Governance",
    supervisor: "Naledi Rantsho",
    dueDate: "2025-01-01",
  },
  {
    id: 3,
    module: "Suspicious Activity Detection",
    department: "Fraud Prevention",
    supervisor: "Lesego Motlhabane",
    dueDate: "2025-01-01",
  },
  {
    id: 4,
    module: "Regulatory Reporting Review",
    department: "Compliance",
    supervisor: "Oarabile Diphoko",
    dueDate: "2025-01-01",
  },
  {
    id: 5,
    module: "Customer Due Diligence",
    department: "Client Support",
    supervisor: "Palesa Gaorekwe",
    dueDate: "2025-01-01",
  },
  {
    id: 6,
    module: "Cybersecurity Audit Task",
    department: "Cybersecurity",
    supervisor: "Boikanyo Molefe",
    dueDate: "2025-01-01",
  },
  {
    id: 7,
    module: "RegTech Solution Draft",
    department: "Innovation & Tech",
    supervisor: "Thato Mokgosi",
    dueDate: "2025-01-01",
  },
  {
    id: 8,
    module: "Internal Audit Prep",
    department: "Internal Audit",
    supervisor: "Keitumetse Gondo",
    dueDate: "2025-01-01",
  },
  {
    id: 9,
    module: "Payments Risk Report",
    department: "Payments",
    supervisor: "Mpho Ramatebele",
    dueDate: "2025-01-01",
  },
  {
    id: 10,
    module: "Data Privacy Compliance",
    department: "Legal & Data Privacy",
    supervisor: "Lorato Molelekwa",
    dueDate: "2025-01-01",
  },
];


export const reportsData = [
  {
    id: 1,
    module: "AML Compliance",
    department: "Compliance Team",
    assessor: "Alice Moyo",
    employee: "Kagiso Molefe",
    date: "2025-01-01",
    type: "assessment",
    score: 88,
  },
  {
    id: 2,
    module: "KYC Fundamentals",
    department: "Onboarding & KYC",
    assessor: "Alice Moyo",
    employee: "Thabo Ditshego",
    date: "2025-01-01",
    type: "assessment",
    score: 92,
  },
  {
    id: 3,
    module: "Fraud Detection",
    department: "Fraud Detection Dept",
    assessor: "Alice Moyo",
    employee: "Naledi Modise",
    date: "2025-01-01",
    type: "exam",
    score: 85,
  },
  {
    id: 4,
    module: "Internal Audit Standards",
    department: "Audit Unit",
    assessor: "Alice Moyo",
    employee: "Tshepo Motsepe",
    date: "2025-01-01",
    type: "exam",
    score: 90,
  },
  {
    id: 5,
    module: "Cybersecurity Compliance",
    department: "Cybersecurity Ops",
    assessor: "Alice Moyo",
    employee: "Boitumelo Keaikitse",
    date: "2025-01-01",
    type: "training",
    score: 95,
  },
  {
    id: 6,
    module: "RegTech Innovation",
    department: "RegTech Division",
    assessor: "Alice Moyo",
    employee: "Dineo Lekgaba",
    date: "2025-01-01",
    type: "evaluation",
    score: 89,
  },
  {
    id: 7,
    module: "Risk Reporting",
    department: "Risk & Governance",
    assessor: "Alice Moyo",
    employee: "Kabelo Ntlhane",
    date: "2025-01-01",
    type: "assessment",
    score: 87,
  },
  {
    id: 8,
    module: "Transaction Monitoring",
    department: "Transaction Control",
    assessor: "Alice Moyo",
    employee: "Reabetswe Mpho",
    date: "2025-01-01",
    type: "exam",
    score: 91,
  },
  {
    id: 9,
    module: "Payments Infrastructure",
    department: "Payments Team",
    assessor: "Alice Moyo",
    employee: "Goitseone Ramoleta",
    date: "2025-01-01",
    type: "training",
    score: 93,
  },
  {
    id: 10,
    module: "Client Data Privacy",
    department: "Investor Support Team",
    assessor: "Alice Moyo",
    employee: "Kelebogile Segole",
    date: "2025-01-01",
    type: "assessment",
    score: 90,
  },
];


export const eventsData = [
  {
    id: 1,
    title: "Compliance Policy Workshop",
    class: "Compliance Team",
    date: "2025-01-01",
    startTime: "10:00",
    endTime: "11:00",
  },
  {
    id: 2,
    title: "Payments Infrastructure Briefing",
    class: "Payments Team",
    date: "2025-01-01",
    startTime: "10:00",
    endTime: "11:00",
  },
  {
    id: 3,
    title: "KYC Verification Training",
    class: "Onboarding & KYC",
    date: "2025-01-01",
    startTime: "10:00",
    endTime: "11:00",
  },
  {
    id: 4,
    title: "Internal Audit Drill",
    class: "Audit Unit",
    date: "2025-01-01",
    startTime: "10:00",
    endTime: "11:00",
  },
  {
    id: 5,
    title: "Cybersecurity Awareness",
    class: "Cybersecurity Ops",
    date: "2025-01-01",
    startTime: "10:00",
    endTime: "11:00",
  },
  {
    id: 6,
    title: "RegTech Innovations Demo",
    class: "RegTech Division",
    date: "2025-01-01",
    startTime: "10:00",
    endTime: "11:00",
  },
  {
    id: 7,
    title: "Risk Scenario Simulation",
    class: "Risk & Governance",
    date: "2025-01-01",
    startTime: "10:00",
    endTime: "11:00",
  },
  {
    id: 8,
    title: "Anti-Fraud System Test",
    class: "Fraud Detection Dept",
    date: "2025-01-01",
    startTime: "10:00",
    endTime: "11:00",
  },
  {
    id: 9,
    title: "Investor Relations Briefing",
    class: "Investor Support Team",
    date: "2025-01-01",
    startTime: "10:00",
    endTime: "11:00",
  },
  {
    id: 10,
    title: "Transaction Monitoring Audit",
    class: "Transaction Control",
    date: "2025-01-01",
    startTime: "10:00",
    endTime: "11:00",
  },
];


export const announcementsData = [
  {
    id: 1,
    title: "Reminder: Compliance Team Risk Assessment Due",
    class: "Compliance Team",
    date: "2025-01-01",
  },
  {
    id: 2,
    title: "Onboarding & KYC: Process Update Memo",
    class: "Onboarding & KYC",
    date: "2025-01-01",
  },
  {
    id: 3,
    title: "Fraud Detection System Upgrade Notice",
    class: "Fraud Detection Dept",
    date: "2025-01-01",
  },
  {
    id: 4,
    title: "Audit Unit: Q1 Report Submission Reminder",
    class: "Audit Unit",
    date: "2025-01-01",
  },
  {
    id: 5,
    title: "Cybersecurity Ops: Firewall Rules Update",
    class: "Cybersecurity Ops",
    date: "2025-01-01",
  },
  {
    id: 6,
    title: "Payments Team: New Transaction Policy Release",
    class: "Payments Team",
    date: "2025-01-01",
  },
  {
    id: 7,
    title: "RegTech Division: Tech Upgrade Scheduled",
    class: "RegTech Division",
    date: "2025-01-01",
  },
  {
    id: 8,
    title: "Risk & Governance: Monthly Risk Summary Ready",
    class: "Risk & Governance",
    date: "2025-01-01",
  },
  {
    id: 9,
    title: "Transaction Control: Downtime Alert",
    class: "Transaction Control",
    date: "2025-01-01",
  },
  {
    id: 10,
    title: "Investor Support Team: Client Outreach Week",
    class: "Investor Support Team",
    date: "2025-01-01",
  },
];


// YOU SHOULD CHANGE THE DATES OF THE EVENTS TO THE CURRENT DATE TO SEE THE EVENTS ON THE CALENDAR
export const calendarEvents = [
  {
    title: "AML & KYC Training",
    allDay: false,
    start: new Date(2025, 6, 15, 8, 0),
    end: new Date(2025, 6, 15, 8, 45)
  },
  {
    title: "Digital Payments Briefing",
    allDay: false,
    start: new Date(2025, 6, 15, 9, 0),
    end: new Date(2025, 6, 15, 9, 45)
  },
  {
    title: "Risk Management Workshop",
    allDay: false,
    start: new Date(2025, 6, 15, 10, 0),
    end: new Date(2025, 6, 15, 10, 45)
  },
  {
    title: "Cybersecurity Compliance",
    allDay: false,
    start: new Date(2025, 6, 15, 11, 0),
    end: new Date(2025, 6, 15, 11, 45)
  },
  {
    title: "Regulatory Checklist Review",
    allDay: false,
    start: new Date(2025, 6, 15, 13, 0),
    end: new Date(2025, 6, 15, 13, 45)
  },
  {
    title: "Internal Audit Session",
    allDay: false,
    start: new Date(2025, 6, 15, 14, 0),
    end: new Date(2025, 6, 15, 14, 45)
  },
  {
    title: "Client Onboarding Policy",
    allDay: false,
    start: new Date(2025, 6, 16, 9, 0),
    end: new Date(2025, 6, 16, 9, 45)
  },
  {
    title: "Fintech Fraud Detection",
    allDay: false,
    start: new Date(2025, 6, 16, 10, 0),
    end: new Date(2025, 6, 16, 10, 45)
  },
  {
    title: "Weekly Compliance Briefing",
    allDay: false,
    start: new Date(2025, 6, 16, 11, 0),
    end: new Date(2025, 6, 16, 11, 45)
  }
]
