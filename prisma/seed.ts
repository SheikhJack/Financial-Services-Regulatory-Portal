import { Day, PrismaClient, UserSex } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  // ADMIN
  await prisma.admin.create({ data: { id: "admin1", username: "admin1" } });
  await prisma.admin.create({ data: { id: "admin2", username: "admin2" } });

  // RISK LEVEL
  for (let i = 1; i <= 6; i++) {
    await prisma.riskLevel.create({ data: { level: i } });
  }

  // GROUP
  for (let i = 1; i <= 6; i++) {
    await prisma.group.create({
      data: {
        name: `${i}A`,
        riskLevelId: i,
        capacity: Math.floor(Math.random() * (20 - 15 + 1)) + 15,
      },
    });
  }

  // REGULATION
  const regulationData = [
    // Core Central Bank Regulations
    { name: "Bank of Botswana Act" },
    { name: "Banking Act" },
    { name: "Financial Institutions Act" },
    { name: "National Credit Act" },
    { name: "Anti-Money Laundering (AML) Regulations" },
    { name: "Counter-Terrorism Financing (CTF) Regulations" },
    { name: "Foreign Exchange Regulations" },
    { name: "Prudential Guidelines for Banks" },
    { name: "Basel III Compliance Framework" },
    { name: "Payment Systems Act" },

    // Parastatals & Regulatory Bodies
    { name: "Non-Bank Financial Institutions Regulatory Authority (NBFIRA)" },
    { name: "Botswana Accountancy Oversight Authority (BAOA)" },
    { name: "Botswana Stock Exchange (BSE) Listing Rules" },
    { name: "Botswana Insurance Regulatory Authority (BIRA)" },
    { name: "Pensions and Provident Funds Act" },

    // Consumer Protection & Compliance
    { name: "Consumer Protection Regulations" },
    { name: "Data Protection Act (Financial Sector)" },
    { name: "Corporate Governance Code for Banks" },
    { name: "Interest Rate Regulations" },
    { name: "Large Exposure Framework" },
  ];
  for (const regulation of regulationData) {
    await prisma.regulation.create({ data: regulation });
  }

  // ADVISOR
  for (let i = 1; i <= 15; i++) {
    await prisma.advisor.create({
      data: {
        id: `advisor${i}`,
        username: `advisor${i}`,
        name: `TName${i}`,
        surname: `TSurname${i}`,
        email: `advisor${i}@example.com`,
        phone: `123-456-789${i}`,
        address: `Address${i}`,
        registrationNumber: "0000",
        sex: i % 2 === 0 ? UserSex.MALE : UserSex.FEMALE,
        regulations: { connect: [{ id: (i % 10) + 1 }] },
        img: `https://example.com/avatars/client${i}.jpg`,
        groups: { connect: [{ id: (i % 6) + 1 }] },
        birthday: new Date(new Date().setFullYear(new Date().getFullYear() - 30)),
      },
    });
  }

  // RESOURCE
  for (let i = 1; i <= 30; i++) {
    await prisma.resource.create({
      data: {
        name: `Resource${i}`,
        day: Day[Object.keys(Day)[Math.floor(Math.random() * Object.keys(Day).length)] as keyof typeof Day],
        startTime: new Date(new Date().setHours(new Date().getHours() + 1)),
        endTime: new Date(new Date().setHours(new Date().getHours() + 3)),
        regulationId: (i % 10) + 1,
        groupId: (i % 6) + 1,
        advisorId: `advisor${(i % 15) + 1}`,
      },
    });
  }

  // SUPERVISOR
  for (let i = 1; i <= 25; i++) {
    await prisma.supervisor.create({
      data: {
        id: `supervisorId${i}`,
        username: `supervisorId${i}`,
        name: `PName ${i}`,
        surname: `PSurname ${i}`,
        email: `supervisor${i}@example.com`,
        phone: `123-456-789${i}`,
        address: `Address${i}`,
      },
    });
  }

  // CLIENT
  for (let i = 1; i <= 50; i++) {
    await prisma.client.create({
      data: {
        id: `client${i}`,
        username: `client${i}`,
        name: `SName${i}`,
        surname: `SSurname ${i}`,
        email: `client${i}@example.com`,
        phone: `987-654-321${i}`,
        address: `Address${i}`,
        registrationNumber: "0000",
        sex: i % 2 === 0 ? UserSex.MALE : UserSex.FEMALE,
        supervisorId: `supervisorId${Math.ceil(i / 2) % 25 || 25}`,
        img: `https://example.com/avatars/client${i}.jpg`,
        riskLevelId: (i % 6) + 1,
        groupId: (i % 6) + 1,
        birthday: new Date(new Date().setFullYear(new Date().getFullYear() - 10)),
      },
    });
  }

  // ASSESSMENT
  for (let i = 1; i <= 10; i++) {
    await prisma.assessment.create({
      data: {
        title: `Assessment ${i}`,
        startTime: new Date(new Date().setHours(new Date().getHours() + 1)),
        endTime: new Date(new Date().setHours(new Date().getHours() + 2)),
        resourceId: (i % 30) + 1,
      },
    });
  }

  // REPORT
  for (let i = 1; i <= 10; i++) {
    await prisma.report.create({
      data: {
        title: `Report ${i}`,
        startDate: new Date(new Date().setHours(new Date().getHours() + 1)),
        dueDate: new Date(new Date().setDate(new Date().getDate() + 1)),
        resourceId: (i % 30) + 1,
      },
    });
  }

  // STATUS
  for (let i = 1; i <= 10; i++) {
    await prisma.status.create({
      data: {
        score: 90,
        clientId: `client${i}`,
        ...(i <= 5 ? { assessmentId: i } : { reportId: i - 5 }),
      },
    });
  }

  // ATTENDANCE
  for (let i = 1; i <= 10; i++) {
    await prisma.attendance.create({
      data: {
        date: new Date(),
        present: true,
        clientId: `client${i}`,
        resourceId: (i % 30) + 1,
      },
    });
  }

  // EVENT
  for (let i = 1; i <= 5; i++) {
    await prisma.event.create({
      data: {
        title: `Event ${i}`,
        description: `Description for Event ${i}`,
        startTime: new Date(new Date().setHours(new Date().getHours() + 1)),
        endTime: new Date(new Date().setHours(new Date().getHours() + 2)),
        groupId: (i % 5) + 1,
      },
    });
  }

  // ANNOUNCEMENT
  for (let i = 1; i <= 5; i++) {
    await prisma.announcement.create({
      data: {
        title: `Announcement ${i}`,
        description: `Description for Announcement ${i}`,
        date: new Date(),
        groupId: (i % 5) + 1,
      },
    });
  }

  // CONTENT
  const contentTypes = ['pdf', 'post', 'image', 'video', 'document'];
  for (let i = 1; i <= 20; i++) {
    await prisma.content.create({
      data: {
        title: `Content ${i}`,
        type: contentTypes[i % contentTypes.length],
        url: `https://example.com/content/${i}.${contentTypes[i % contentTypes.length]}`,
      },
    });
  }

  console.log("Seeding completed successfully.");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });