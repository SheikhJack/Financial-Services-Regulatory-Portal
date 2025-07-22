"use server";

import { revalidatePath } from "next/cache";
import {
  GroupSchema,
  AssessmentSchema,
  ClientSchema,
  RegulationSchema,
  AdvisorSchema,
  ContentSchema,
} from "./formValidationSchemas";
import prisma from "./prisma";
import { clerkClient } from "@clerk/nextjs/server";
import { Prisma } from "@prisma/client";

type CurrentState = { success: boolean; error: boolean };

export const createRegulation = async (
  currentState: CurrentState,
  data: RegulationSchema
) => {
  try {
    await prisma.regulation.create({
      data: {
        name: data.name,
        advisors: {
          connect: data.advisors.map((advisorId) => ({ id: advisorId })),
        },
      },
    });
    return { success: true, error: false };
  } catch (err) {
    console.log(err);
    return { success: false, error: true };
  }
};

export const updateRegulation = async (
  currentState: CurrentState,
  data: RegulationSchema
) => {
  try {
    await prisma.regulation.update({
      where: { id: data.id },
      data: {
        name: data.name,
        advisors: {
          set: data.advisors.map((regulationId) => ({ id: regulationId })),
        },
      },
    });
    return { success: true, error: false };
  } catch (err) {
    console.log(err);
    return { success: false, error: true };
  }
};

export const deleteRegulation = async (
  currentState: CurrentState,
  data: FormData
) => {
  const id = data.get("id") as string;
  try {
    await prisma.regulation.delete({
      where: { id: parseInt(id) },
    });
    return { success: true, error: false };
  } catch (err) {
    console.log(err);
    return { success: false, error: true };
  }
};

export const createGroup = async (
  currentState: CurrentState,
  data: GroupSchema
) => {
  try {
    await prisma.group.create({
      data,
    });
    return { success: true, error: false };
  } catch (err) {
    console.log(err);
    return { success: false, error: true };
  }
};



export const updateGroup = async (
  currentState: CurrentState,
  data: GroupSchema
) => {
  try {
    await prisma.group.update({
      where: { id: data.id },
      data,
    });
    return { success: true, error: false };
  } catch (err) {
    console.log(err);
    return { success: false, error: true };
  }
};

export const deleteGroup = async (
  currentState: CurrentState,
  data: FormData
) => {
  const id = data.get("id") as string;
  try {
    await prisma.group.delete({
      where: { id: parseInt(id) },
    });
    return { success: true, error: false };
  } catch (err) {
    console.log(err);
    return { success: false, error: true };
  }
};

export const createAdvisor = async (
  currentState: CurrentState,
  data: AdvisorSchema
) => {
  try {
    const user = await clerkClient.users.createUser({
      username: data.username,
      password: data.password,
      firstName: data.name,
      lastName: data.surname,
      publicMetadata: { role: "advisor" },
    });

    await prisma.advisor.create({
      data: {
        id: user.id,
        username: data.username,
        name: data.name,
        surname: data.surname,
        email: data.email || null,
        phone: data.phone || null,
        address: data.address,
        img: data.img || null,
        registrationNumber: data.registrationNumber,
        sex: data.sex,
        birthday: data.birthday,
        regulations: {
          connect: data.regulations?.map((regulationId: string) => ({
            id: parseInt(regulationId),
          })),
        },
      },
    });
    return { success: true, error: false };
  } catch (err) {
    console.log(err);
    return { success: false, error: true };
  }
};




export const updateAdvisor = async (
  currentState: CurrentState,
  data: AdvisorSchema
) => {
  if (!data.id) return { success: false, error: true };
  try {
    await clerkClient.users.updateUser(data.id, {
      username: data.username,
      ...(data.password !== "" && { password: data.password }),
      firstName: data.name,
      lastName: data.surname,
    });

    await prisma.advisor.update({
      where: { id: data.id },
      data: {
        username: data.username,
        name: data.name,
        surname: data.surname,
        email: data.email || null,
        phone: data.phone || null,
        address: data.address,
        img: data.img || null,
        registrationNumber: data.registrationNumber,
        sex: data.sex,
        birthday: data.birthday,
        ...(data.password !== "" && { password: data.password }),
        regulations: {
          set: data.regulations?.map((regulationId: string) => ({
            id: parseInt(regulationId),
          })),
        },
      },
    });
    return { success: true, error: false };
  } catch (err) {
    console.log(err);
    return { success: false, error: true };
  }
};

export const deleteAdvisor = async (
  currentState: CurrentState,
  data: FormData
) => {
  const id = data.get("id") as string;
  try {
    await clerkClient.users.deleteUser(id);
    await prisma.advisor.delete({
      where: { id },
    });
    return { success: true, error: false };
  } catch (err) {
    console.log(err);
    return { success: false, error: true };
  }
};

export const createClient = async (
  currentState: CurrentState,
  data: ClientSchema
) => {
  try {
    const classItem = await prisma.group.findUnique({
      where: { id: data.groupId },
      include: { _count: { select: { clients: true } } },
    });

    if (classItem && classItem.capacity === classItem._count.clients) {
      return { success: false, error: true };
    }

    const user = await clerkClient.users.createUser({
      username: data.username,
      password: data.password,
      firstName: data.name,
      lastName: data.surname,
      publicMetadata: { role: "client" },
    });

    await prisma.client.create({
      data: {
        id: user.id,
        username: data.username,
        name: data.name,
        surname: data.surname,
        email: data.email || null,
        phone: data.phone || null,
        address: data.address,
        img: data.img || null,
        registrationNumber: data.registrationNumber,
        sex: data.sex,
        birthday: data.birthday,
        riskLevelId: data.riskLevelId,
        groupId: data.groupId,
        supervisorId: data.supervisorId,
      },
    });
    return { success: true, error: false };
  } catch (err) {
    console.log(err);
    return { success: false, error: true };
  }
};

export const updateClient = async (
  currentState: CurrentState,
  data: ClientSchema
) => {
  if (!data.id) return { success: false, error: true };
  try {
    await clerkClient.users.updateUser(data.id, {
      username: data.username,
      ...(data.password !== "" && { password: data.password }),
      firstName: data.name,
      lastName: data.surname,
    });

    await prisma.client.update({
      where: { id: data.id },
      data: {
        username: data.username,
        name: data.name,
        surname: data.surname,
        email: data.email || null,
        phone: data.phone || null,
        address: data.address,
        img: data.img || null,
        registrationNumber: data.registrationNumber,
        sex: data.sex,
        birthday: data.birthday,
        riskLevelId: data.riskLevelId,
        groupId: data.groupId,
        supervisorId: data.supervisorId,
        ...(data.password !== "" && { password: data.password }),
      },
    });
    return { success: true, error: false };
  } catch (err) {
    console.log(err);
    return { success: false, error: true };
  }
};

export const deleteClient = async (
  currentState: CurrentState,
  data: FormData
) => {
  const id = data.get("id") as string;
  try {
    await clerkClient.users.deleteUser(id);
    await prisma.client.delete({
      where: { id },
    });
    return { success: true, error: false };
  } catch (err) {
    console.log(err);
    return { success: false, error: true };
  }
};

export const createAssessment = async (
  currentState: CurrentState,
  data: AssessmentSchema
) => {
  try {
    await prisma.assessment.create({
      data: {
        title: data.title,
        startTime: data.startTime,
        endTime: data.endTime,
        resourceId: data.resourceId,
      },
    });
    return { success: true, error: false };
  } catch (err) {
    console.log(err);
    return { success: false, error: true };
  }
};

export const updateAssessment = async (
  currentState: CurrentState,
  data: AssessmentSchema
) => {
  try {
    await prisma.assessment.update({
      where: { id: data.id },
      data: {
        title: data.title,
        startTime: data.startTime,
        endTime: data.endTime,
        resourceId: data.resourceId,
      },
    });
    return { success: true, error: false };
  } catch (err) {
    console.log(err);
    return { success: false, error: true };
  }
};

export const deleteAssessment = async (
  currentState: CurrentState,
  data: FormData
) => {
  const id = data.get("id") as string;
  try {
    await prisma.assessment.delete({
      where: { id: parseInt(id) },
    });
    return { success: true, error: false };
  } catch (err) {
    console.log(err);
    return { success: false, error: true };
  }
};

// Example delete action
export const deleteSupervisor = async (
  prevState: { success: boolean; error: boolean },
  formData: FormData
) => {
  try {
    await prisma.supervisor.delete({
      where: { id: formData.get('id') as string }
    });
    return { success: true, error: false };
  } catch (err) {
    return { success: false, error: true };
  }
};


// 👇 Use ContentSchema type instead of FormData
export async function createContent(
  prevState: { success: boolean; error: boolean },
  formData: ContentSchema
) {
  const { title, type, url } = formData;

  if (!title || !type || !url) {
    return { success: false, error: true };
  }

  try {
    await prisma.content.create({
      data: { title, type, url },
    });

    revalidatePath("/content");
    return { success: true, error: false };
  } catch (error) {
    console.error("Create Content Error:", error);
    return { success: false, error: true };
  }
}


// Update content
export async function updateContent(
  prevState: { success: boolean; error: boolean },
  formData: ContentSchema
) {

  const { title, type, url } = formData;
  if (!title || !type || !url) {
    return { success: false, error: true };
  }

  try {
    
     await prisma.content.update({
      data: { title, type, url },
    });

    revalidatePath("/content");
    return { success: true, error: false };
  } catch (error) {
    console.error("Update Content Error:", error);
    return { success: false, error: true };
  }
}

// Delete content
export async function deleteContent(
  prevState: { success: boolean; error: boolean },
  formData: FormData
) {
  try {
    const id = formData.get("id")?.toString();

    if (!id) {
      return { success: false, error: true };
    }

    await prisma.content.delete({
      where: { id },
    });

    revalidatePath("/content");
    return { success: true, error: false };
  } catch (error) {
    console.error("Delete Content Error:", error);
    return { success: false, error: true };
  }
}
















// "use server";

// import { revalidatePath } from "next/cache";
// import {
//   ClassSchema,
//   ExamSchema,
//   StudentSchema,
//   SubjectSchema,
//   TeacherSchema,
// } from "./formValidationSchemas";
// import prisma from "./prisma";
// import { clerkClient } from "@clerk/nextjs/server";

// type CurrentState = { success: boolean; error: boolean };

// export const createSubject = async (
//   currentState: CurrentState,
//   data: SubjectSchema
// ) => {
//   try {
//     await prisma.subject.create({
//       data: {
//         name: data.name,
//         teachers: {
//           connect: data.teachers.map((teacherId) => ({ id: teacherId })),
//         },
//       },
//     });

//     // revalidatePath("/list/subjects");
//     return { success: true, error: false };
//   } catch (err) {
//     console.log(err);
//     return { success: false, error: true };
//   }
// };

// export const updateSubject = async (
//   currentState: CurrentState,
//   data: SubjectSchema
// ) => {
//   try {
//     await prisma.subject.update({
//       where: {
//         id: data.id,
//       },
//       data: {
//         name: data.name,
//         teachers: {
//           set: data.teachers.map((teacherId) => ({ id: teacherId })),
//         },
//       },
//     });

//     // revalidatePath("/list/subjects");
//     return { success: true, error: false };
//   } catch (err) {
//     console.log(err);
//     return { success: false, error: true };
//   }
// };

// export const deleteSubject = async (
//   currentState: CurrentState,
//   data: FormData
// ) => {
//   const id = data.get("id") as string;
//   try {
//     await prisma.subject.delete({
//       where: {
//         id: parseInt(id),
//       },
//     });

//     // revalidatePath("/list/subjects");
//     return { success: true, error: false };
//   } catch (err) {
//     console.log(err);
//     return { success: false, error: true };
//   }
// };

// export const createClass = async (
//   currentState: CurrentState,
//   data: ClassSchema
// ) => {
//   try {
//     await prisma.class.create({
//       data,
//     });

//     // revalidatePath("/list/class");
//     return { success: true, error: false };
//   } catch (err) {
//     console.log(err);
//     return { success: false, error: true };
//   }
// };

// export const updateClass = async (
//   currentState: CurrentState,
//   data: ClassSchema
// ) => {
//   try {
//     await prisma.class.update({
//       where: {
//         id: data.id,
//       },
//       data,
//     });

//     // revalidatePath("/list/class");
//     return { success: true, error: false };
//   } catch (err) {
//     console.log(err);
//     return { success: false, error: true };
//   }
// };

// export const deleteClass = async (
//   currentState: CurrentState,
//   data: FormData
// ) => {
//   const id = data.get("id") as string;
//   try {
//     await prisma.class.delete({
//       where: {
//         id: parseInt(id),
//       },
//     });

//     // revalidatePath("/list/class");
//     return { success: true, error: false };
//   } catch (err) {
//     console.log(err);
//     return { success: false, error: true };
//   }
// };

// export const createTeacher = async (
//   currentState: CurrentState,
//   data: TeacherSchema
// ) => {
//   try {
//     const user = await clerkClient.users.createUser({
//       username: data.username,
//       password: data.password,
//       firstName: data.name,
//       lastName: data.surname,
//       publicMetadata:{role:"teacher"}
//     });

//     await prisma.teacher.create({
//       data: {
//         id: user.id,
//         username: data.username,
//         name: data.name,
//         surname: data.surname,
//         email: data.email || null,
//         phone: data.phone || null,
//         address: data.address,
//         img: data.img || null,
//         bloodType: data.bloodType,
//         sex: data.sex,
//         birthday: data.birthday,
//         subjects: {
//           connect: data.subjects?.map((subjectId: string) => ({
//             id: parseInt(subjectId),
//           })),
//         },
//       },
//     });

//     // revalidatePath("/list/teachers");
//     return { success: true, error: false };
//   } catch (err) {
//     console.log(err);
//     return { success: false, error: true };
//   }
// };

// export const updateTeacher = async (
//   currentState: CurrentState,
//   data: TeacherSchema
// ) => {
//   if (!data.id) {
//     return { success: false, error: true };
//   }
//   try {
//     const user = await clerkClient.users.updateUser(data.id, {
//       username: data.username,
//       ...(data.password !== "" && { password: data.password }),
//       firstName: data.name,
//       lastName: data.surname,
//     });

//     await prisma.teacher.update({
//       where: {
//         id: data.id,
//       },
//       data: {
//         ...(data.password !== "" && { password: data.password }),
//         username: data.username,
//         name: data.name,
//         surname: data.surname,
//         email: data.email || null,
//         phone: data.phone || null,
//         address: data.address,
//         img: data.img || null,
//         bloodType: data.bloodType,
//         sex: data.sex,
//         birthday: data.birthday,
//         subjects: {
//           set: data.subjects?.map((subjectId: string) => ({
//             id: parseInt(subjectId),
//           })),
//         },
//       },
//     });
//     // revalidatePath("/list/teachers");
//     return { success: true, error: false };
//   } catch (err) {
//     console.log(err);
//     return { success: false, error: true };
//   }
// };

// export const deleteTeacher = async (
//   currentState: CurrentState,
//   data: FormData
// ) => {
//   const id = data.get("id") as string;
//   try {
//     await clerkClient.users.deleteUser(id);

//     await prisma.teacher.delete({
//       where: {
//         id: id,
//       },
//     });

//     // revalidatePath("/list/teachers");
//     return { success: true, error: false };
//   } catch (err) {
//     console.log(err);
//     return { success: false, error: true };
//   }
// };

// export const createStudent = async (
//   currentState: CurrentState,
//   data: StudentSchema
// ) => {
//   console.log(data);
//   try {
//     const classItem = await prisma.class.findUnique({
//       where: { id: data.classId },
//       include: { _count: { select: { students: true } } },
//     });

//     if (classItem && classItem.capacity === classItem._count.students) {
//       return { success: false, error: true };
//     }

//     const user = await clerkClient.users.createUser({
//       username: data.username,
//       password: data.password,
//       firstName: data.name,
//       lastName: data.surname,
//       publicMetadata:{role:"student"}
//     });

//     await prisma.student.create({
//       data: {
//         id: user.id,
//         username: data.username,
//         name: data.name,
//         surname: data.surname,
//         email: data.email || null,
//         phone: data.phone || null,
//         address: data.address,
//         img: data.img || null,
//         bloodType: data.bloodType,
//         sex: data.sex,
//         birthday: data.birthday,
//         gradeId: data.gradeId,
//         classId: data.classId,
//         parentId: data.parentId,
//       },
//     });

//     // revalidatePath("/list/students");
//     return { success: true, error: false };
//   } catch (err) {
//     console.log(err);
//     return { success: false, error: true };
//   }
// };

// export const updateStudent = async (
//   currentState: CurrentState,
//   data: StudentSchema
// ) => {
//   if (!data.id) {
//     return { success: false, error: true };
//   }
//   try {
//     const user = await clerkClient.users.updateUser(data.id, {
//       username: data.username,
//       ...(data.password !== "" && { password: data.password }),
//       firstName: data.name,
//       lastName: data.surname,
//     });

//     await prisma.student.update({
//       where: {
//         id: data.id,
//       },
//       data: {
//         ...(data.password !== "" && { password: data.password }),
//         username: data.username,
//         name: data.name,
//         surname: data.surname,
//         email: data.email || null,
//         phone: data.phone || null,
//         address: data.address,
//         img: data.img || null,
//         bloodType: data.bloodType,
//         sex: data.sex,
//         birthday: data.birthday,
//         gradeId: data.gradeId,
//         classId: data.classId,
//         parentId: data.parentId,
//       },
//     });
//     // revalidatePath("/list/students");
//     return { success: true, error: false };
//   } catch (err) {
//     console.log(err);
//     return { success: false, error: true };
//   }
// };

// export const deleteStudent = async (
//   currentState: CurrentState,
//   data: FormData
// ) => {
//   const id = data.get("id") as string;
//   try {
//     await clerkClient.users.deleteUser(id);

//     await prisma.student.delete({
//       where: {
//         id: id,
//       },
//     });

//     // revalidatePath("/list/students");
//     return { success: true, error: false };
//   } catch (err) {
//     console.log(err);
//     return { success: false, error: true };
//   }
// };

// export const createExam = async (
//   currentState: CurrentState,
//   data: ExamSchema
// ) => {
//   // const { userId, sessionClaims } = auth();
//   // const role = (sessionClaims?.metadata as { role?: string })?.role;

//   try {
//     // if (role === "teacher") {
//     //   const teacherLesson = await prisma.lesson.findFirst({
//     //     where: {
//     //       teacherId: userId!,
//     //       id: data.lessonId,
//     //     },
//     //   });

//     //   if (!teacherLesson) {
//     //     return { success: false, error: true };
//     //   }
//     // }

//     await prisma.exam.create({
//       data: {
//         title: data.title,
//         startTime: data.startTime,
//         endTime: data.endTime,
//         lessonId: data.lessonId,
//       },
//     });

//     // revalidatePath("/list/subjects");
//     return { success: true, error: false };
//   } catch (err) {
//     console.log(err);
//     return { success: false, error: true };
//   }
// };

// export const updateExam = async (
//   currentState: CurrentState,
//   data: ExamSchema
// ) => {
//   // const { userId, sessionClaims } = auth();
//   // const role = (sessionClaims?.metadata as { role?: string })?.role;

//   try {
//     // if (role === "teacher") {
//     //   const teacherLesson = await prisma.lesson.findFirst({
//     //     where: {
//     //       teacherId: userId!,
//     //       id: data.lessonId,
//     //     },
//     //   });

//     //   if (!teacherLesson) {
//     //     return { success: false, error: true };
//     //   }
//     // }

//     await prisma.exam.update({
//       where: {
//         id: data.id,
//       },
//       data: {
//         title: data.title,
//         startTime: data.startTime,
//         endTime: data.endTime,
//         lessonId: data.lessonId,
//       },
//     });

//     // revalidatePath("/list/subjects");
//     return { success: true, error: false };
//   } catch (err) {
//     console.log(err);
//     return { success: false, error: true };
//   }
// };

// export const deleteExam = async (
//   currentState: CurrentState,
//   data: FormData
// ) => {
//   const id = data.get("id") as string;

//   // const { userId, sessionClaims } = auth();
//   // const role = (sessionClaims?.metadata as { role?: string })?.role;

//   try {
//     await prisma.exam.delete({
//       where: {
//         id: parseInt(id),
//         // ...(role === "teacher" ? { lesson: { teacherId: userId! } } : {}),
//       },
//     });

//     // revalidatePath("/list/subjects");
//     return { success: true, error: false };
//   } catch (err) {
//     console.log(err);
//     return { success: false, error: true };
//   }
// };
