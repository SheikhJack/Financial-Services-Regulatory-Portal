import FormContainer from "@/components/FormContainer";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import prisma from "@/lib/prisma";
import { ITEM_PER_PAGE } from "@/lib/settings";
import { Prisma } from "@prisma/client";
import Image from "next/image";
import { auth } from "@clerk/nextjs/server";

type StatusList = {
  id: number;
  title: string;
  clientName: string;
  clientSurname: string;
  advisorName: string;
  advisorSurname: string;
  score: number;
  groupName: string;
  startTime: Date;
};

const StatusListPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) => {
  const { userId, sessionClaims } = await auth();
  const role = (sessionClaims?.metadata as { role?: string })?.role;
  const currentUserId = userId;

  const columns = [
    { header: "Title", accessor: "title" },
    { header: "Client", accessor: "client" },
    { header: "Score", accessor: "score", className: "hidden md:table-cell" },
    { header: "Advisor", accessor: "advisor", className: "hidden md:table-cell" },
    { header: "Group", accessor: "group", className: "hidden md:table-cell" },
    { header: "Date", accessor: "date", className: "hidden md:table-cell" },
    ...(role === "admin" || role === "advisor"
      ? [{ header: "Actions", accessor: "action" }]
      : []),
  ];

  const renderRow = (item: StatusList) => (
    <tr
      key={item.id}
      className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight"
    >
      <td className="flex items-center gap-4 p-4">{item.title}</td>
      <td>{item.clientName + " " + item.clientSurname}</td>
      <td className="hidden md:table-cell">{item.score}</td>
      <td className="hidden md:table-cell">
        {item.advisorName + " " + item.advisorSurname}
      </td>
      <td className="hidden md:table-cell">{item.groupName}</td>
      <td className="hidden md:table-cell">
        {new Intl.DateTimeFormat("en-US").format(item.startTime)}
      </td>
      <td>
        {(role === "admin" || role === "advisor") && (
          <div className="flex items-center gap-2">
            <FormContainer table="status" type="update" data={item} />
            <FormContainer table="status" type="delete" id={item.id} />
          </div>
        )}
      </td>
    </tr>
  );

  const { page, ...queryParams } = searchParams;
  const p = page ? parseInt(page) : 1;

  const query: Prisma.StatusWhereInput = {};

  if (queryParams) {
    for (const [key, value] of Object.entries(queryParams)) {
      if (value !== undefined) {
        switch (key) {
          case "ClientId":
            query.clientId = value;
            break;
          case "search":
            query.OR = [
              { assessment: { title: { contains: value, mode: "insensitive" } } },
              { client: { name: { contains: value, mode: "insensitive" } } },
            ];
            break;
          default:
            break;
        }
      }
    }
  }

  switch (role) {
    case "admin":
      break;
    case "advisor":
      query.OR = [
        { assessment: { resource: { advisorId: currentUserId! } } },
        { report: { resource: { advisorId: currentUserId! } } },
      ];
      break;
    case "client":
      query.clientId = currentUserId!;
      break;
    case "advisor":
      query.client = {
        supervisorId: currentUserId!,
      };
      break;
    default:
      break;
  }

  const [dataRes, count] = await prisma.$transaction([
    prisma.status.findMany({
      where: query,
      include: {
        client: { select: { name: true, surname: true } },
        assessment: {
          include: {
            resource: {
              select: {
                group: { select: { name: true } },
                advisor: { select: { name: true, surname: true } },
              },
            },
          },
        },
        report: {
          include: {
            resource: {
              select: {
                group: { select: { name: true } },
                advisor: { select: { name: true, surname: true } },
              },
            },
          },
        },
      },
      take: ITEM_PER_PAGE,
      skip: ITEM_PER_PAGE * (p - 1),
    }),
    prisma.status.count({ where: query }),
  ]);

  const data: StatusList[] = dataRes
    .map((item: { assessment: any; report: any; id: any; client: { name: any; surname: any; }; score: any; }) => {
      const assessment = item.assessment ?? item.report;
      if (!assessment) return null;

      const isAssessment = "startTime" in assessment;

      return {
        id: item.id,
        title: assessment.title,
        clientName: item.client.name,
        clientSurname: item.client.surname,
        advisorName: assessment.lesson.advisor.name,
        advisorSurname: assessment.lesson.advisor.surname,
        score: item.score,
        groupName: assessment.lesson.class.name,
        startTime: isAssessment ? assessment.startTime : new Date(), // fallback if no startTime
      };
    })
    .filter(Boolean) as StatusList[];

  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
      {/* TOP */}
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-lg font-semibold">All Results</h1>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <TableSearch />
          <div className="flex items-center gap-4 self-end">
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
              <Image src="/filter.png" alt="" width={14} height={14} />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
              <Image src="/sort.png" alt="" width={14} height={14} />
            </button>
            {(role === "admin" || role === "advisor") && (
              <FormContainer table="status" type="create" />
            )}
          </div>
        </div>
      </div>
      {/* LIST */}
      <Table columns={columns} renderRow={renderRow} data={data} />
      {/* PAGINATION */}
      <Pagination page={p} count={count} />
    </div>
  );
};

export default StatusListPage;
