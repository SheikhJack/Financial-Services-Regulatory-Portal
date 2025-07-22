import { z } from "zod";

export const regulationSchema = z.object({
  id: z.coerce.number().optional(),
  name: z.string().min(1, { message: "Regulation name is required!" }),
  advisors: z.array(z.string()), // advisor ids
});

export type RegulationSchema = z.infer<typeof regulationSchema>;

export const groupSchema = z.object({
  id: z.coerce.number().optional(),
  name: z.string().min(1, { message: "Group name is required!" }),
  capacity: z.coerce.number().min(1, { message: "Capacity is required!" }),
  riskLevelId: z.coerce.number().min(1, { message: "Score is required!" }),
  supervisorId: z.coerce.string().optional(),
});

export type GroupSchema = z.infer<typeof groupSchema>;

export const advisorSchema = z.object({
  id: z.string().optional(),
  username: z
    .string()
    .min(3, { message: "Username must be at least 3 characters long!" })
    .max(20, { message: "Username must be at most 20 characters long!" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long!" })
    .optional()
    .or(z.literal("")),
  name: z.string().min(1, { message: "First name is required!" }),
  surname: z.string().min(1, { message: "Last name is required!" }),
  email: z
    .string()
    .email({ message: "Invalid email address!" })
    .optional()
    .or(z.literal("")),
  phone: z.string().optional(),
  address: z.string(),
  img: z.string().optional(),
  registrationNumber: z.string().min(1, { message: "Registration Number is required!" }),
  birthday: z.coerce.date({ message: "Date is required!" }),
  sex: z.enum(["MALE", "FEMALE"], { message: "Sex is required!" }),
  regulations: z.array(z.string()).optional(), // regulation ids
});

export type AdvisorSchema = z.infer<typeof advisorSchema>;

export const clientSchema = z.object({
  id: z.string().optional(),
  username: z
    .string()
    .min(3, { message: "Username must be at least 3 characters long!" })
    .max(20, { message: "Username must be at most 20 characters long!" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long!" })
    .optional()
    .or(z.literal("")),
  name: z.string().min(1, { message: "First name is required!" }),
  surname: z.string().min(1, { message: "Last name is required!" }),
  email: z
    .string()
    .email({ message: "Invalid email address!" })
    .optional()
    .or(z.literal("")),
  phone: z.string().optional(),
  address: z.string(),
  img: z.string().optional(),
  registrationNumber: z.string().min(1, { message: "Registration Number is required!" }),
  birthday: z.coerce.date({ message: "Date is required!" }),
  sex: z.enum(["MALE", "FEMALE"], { message: "Sex is required!" }),
  riskLevelId: z.coerce.number().min(1, { message: "Grade is required!" }),
  groupId: z.coerce.number().min(1, { message: "Group is required!" }),
  supervisorId: z.string().min(1, { message: "Supervisor ID is required!" }),
});

export type ClientSchema = z.infer<typeof clientSchema>;

export const assessmentSchema = z.object({
  id: z.coerce.number().optional(),
  title: z.string().min(1, { message: "Title is required!" }),
  startTime: z.coerce.date({ message: "Start time is required!" }),
  endTime: z.coerce.date({ message: "End time is required!" }),
  resourceId: z.coerce.number({ message: "Resource is required!" }),
});

export type AssessmentSchema = z.infer<typeof assessmentSchema>;

export const contentSchema = z.object({
  title: z.string().min(1, "Title is required"),
  type: z.enum(["post", "pdf", "image"]),
  url: z.string().optional(),
  id: z.string().optional(),
});

export type ContentSchema = z.infer<typeof contentSchema>;
