import FormModal from "@/components/FormModal";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import prisma from "@/lib/prisma";
import { ITEM_PER_PAGE } from "@/lib/settings";
import { Report, Group, Prisma, Regulation, Advisor } from "@prisma/client";
import Image from "next/image";
import { auth } from "@clerk/nextjs/server";

type ReportList = Report & {
  resource: {
    regulation: Regulation;
    group: Group;
    advisor: Advisor;
  };
};

const ReportListPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) => {

  const { userId, sessionClaims } = auth();
  const role = (sessionClaims?.metadata as { role?: string })?.role;
  const currentUserId = userId;
  
  
  const columns = [
    {
      header: "Regulation Name",
      accessor: "name",
    },
    {
      header: "Group",
      accessor: "group",
    },
    {
      header: "Advisor",
      accessor: "advisor",
      className: "hidden md:table-cell",
    },
    {
      header: "Due Date",
      accessor: "dueDate",
      className: "hidden md:table-cell",
    },
    ...(role === "admin" || role === "advisor"
      ? [
          {
            header: "Actions",
            accessor: "action",
          },
        ]
      : []),
  ];
  
  const renderRow = (item: ReportList) => (
    <tr
      key={item.id}
      className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight"
    >
      <td className="flex items-center gap-4 p-4">{item.resource.regulation.name}</td>
      <td>{item.resource.regulation.name}</td>
      <td className="hidden md:table-cell">
        {item.resource.advisor.name + " " + item.resource.advisor.surname}
      </td>
      <td className="hidden md:table-cell">
        {new Intl.DateTimeFormat("en-US").format(item.dueDate)}
      </td>
      <td>
        <div className="flex items-center gap-2">
          {(role === "admin" || role === "advisor") && (
            <>
              <FormModal table="report" type="update" data={item} />
              <FormModal table="report" type="delete" id={item.id} />
            </>
          )}
        </div>
      </td>
    </tr>
  );

  const { page, ...queryParams } = searchParams;

  const p = page ? parseInt(page) : 1;

  // URL PARAMS CONDITION

  const query: Prisma.ReportWhereInput = {};

  query.resource = {};

  if (queryParams) {
    for (const [key, value] of Object.entries(queryParams)) {
      if (value !== undefined) {
        switch (key) {
          case "groupId":
            query.resource.groupId = parseInt(value);
            break;
          case "advisorId":
            query.resource.advisorId = value;
            break;
          case "search":
            query.resource.regulation = {
              name: { contains: value, mode: "insensitive" },
            };
            break;
          default:
            break;
        }
      }
    }
  }

  // ROLE CONDITIONS

  switch (role) {
    case "admin":
      break;
    case "advisor":
      query.resource.advisorId = currentUserId!;
      break;
    case "client":
      query.resource.group = {
        clients: {
          some: {
            id: currentUserId!,
          },
        },
      };
      break;
    case "supervisor":
      query.resource.group = {
        clients: {
          some: {
            supervisorId: currentUserId!,
          },
        },
      };
      break;
    default:
      break;
  }

  const [data, count] = await prisma.$transaction([
    prisma.report.findMany({
      where: query,
      include: {
        resource: {
          select: {
            regulation: { select: { name: true } },
            advisor: { select: { name: true, surname: true } },
            group: { select: { name: true } },
          },
        },
      },
      take: ITEM_PER_PAGE,
      skip: ITEM_PER_PAGE * (p - 1),
    }),
    prisma.report.count({ where: query }),
  ]);
  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
      {/* TOP */}
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-lg font-semibold">
          All Reports
        </h1>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <TableSearch />
          <div className="flex items-center gap-4 self-end">
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
              <Image src="/filter.png" alt="" width={14} height={14} />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
              <Image src="/sort.png" alt="" width={14} height={14} />
            </button>
            {role === "admin" ||
              (role === "advisor" && (
                <FormModal table="report" type="create" />
              ))}
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

export default ReportListPage;
