import prisma from "@/lib/prisma";
import FormModal from "./FormModal";
import { auth } from "@clerk/nextjs/server";

export type FormContainerProps = {
  table:
    | "advisor"
    | "client"
    | "supervisor"
    | "regulation"
    | "group"
    | "resource"
    | "assessment"
    | "report"
    | "status"
    | "attendance"
    | "event"
    | "content"
    | "announcement";
  type: "create" | "update" | "delete";
  data?: any;
  id?: number | string;
};

const FormContainer = async ({ table, type, data, id }: FormContainerProps) => {
  let relatedData = {};

  const { userId, sessionClaims } = await auth();
  const role = (sessionClaims?.metadata as { role?: string })?.role;
  const currentUserId = userId;

  if (type !== "delete") {
    switch (table) {
      case "regulation": {
        const advisors = await prisma.advisor.findMany({
          select: { id: true, name: true, surname: true },
        });
        relatedData = { advisors };
        break;
      }
      case "group": {
        const riskLevels = await prisma.riskLevel.findMany({
          select: { id: true, level: true },
        });
        const advisors = await prisma.advisor.findMany({
          select: { id: true, name: true, surname: true },
        });
        relatedData = { advisors, riskLevels };
        break;
      }
      case "advisor": {
        const regulations = await prisma.regulation.findMany({
          select: { id: true, name: true },
        });
        relatedData = { regulations };
        break;
      }
      case "client": {
        const riskLevels = await prisma.riskLevel.findMany({
          select: { id: true, level: true },
        });
        const groups = await prisma.group.findMany({
          include: { _count: { select: { clients: true } } },
        });
        relatedData = { groups, riskLevels };
        break;
      }
      case "assessment": {
        const resources = await prisma.resource.findMany({
          where: role === "advisor" ? { advisorId: currentUserId! } : {},
          select: { id: true, name: true },
        });
        relatedData = { resources };
        break;
      }
      // Add more new mappings as needed
    }
  }

  return (
    <div>
      <FormModal
        table={table}
        type={type}
        data={data}
        id={id}
        relatedData={relatedData}
      />
    </div>
  );
};

export default FormContainer;
