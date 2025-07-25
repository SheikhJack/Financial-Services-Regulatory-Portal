"use client";

import FormModal from "@/components/FormModal";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import prisma from "@/lib/prisma";
import { ITEM_PER_PAGE } from "@/lib/settings";
import { auth } from "@clerk/nextjs/server";
import { Prisma } from "@prisma/client";
import Image from "next/image";

const ContentPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) => {
  const { userId, sessionClaims } = auth();
  const role = (sessionClaims?.metadata as { role?: string })?.role;

  const { page, ...queryParams } = searchParams;
  const p = page ? parseInt(page) : 1;

 const query: Prisma.ContentWhereInput = {};

if (queryParams?.search) {
  query.title = {
    contains: queryParams.search,
    mode: "insensitive",
  };
}

  const [data, count] = await prisma.$transaction([
    prisma.content.findMany({
      where: query,
      take: ITEM_PER_PAGE,
      skip: ITEM_PER_PAGE * (p - 1),
      orderBy: { createdAt: "desc" },
    }),
    prisma.content.count({ where: query }),
  ]);

  const columns = [
    { header: "Title", accessor: "title" },
    { header: "Type", accessor: "type" },
    { header: "Created", accessor: "createdAt", className: "hidden md:table-cell" },
    ...(role === "admin" || role === "advisor"
      ? [{ header: "Actions", accessor: "action" }]
      : []),
  ];

  const renderRow = (item: any) => (
    <tr key={item.id} className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight">
      <td>{item.title}</td>
      <td>{item.type}</td>
      <td className="hidden md:table-cell">{new Date(item.createdAt).toLocaleDateString()}</td>
      <td>
        {(role === "admin" || role === "advisor") && (
          <div className="flex gap-2">
            <FormModal table="content" type="update" data={item} />
            <FormModal table="content" type="delete" id={item.id} />
          </div>
        )}
      </td>
    </tr>
  );

  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold hidden md:block">Content Library</h1>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <TableSearch />
          <div className="flex items-center gap-4 self-end">
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
              <Image src="/filter.png" alt="filter" width={14} height={14} />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
              <Image src="/sort.png" alt="sort" width={14} height={14} />
            </button>
            {(role === "admin" || role === "advisor") && <FormModal table="content" type="create" />}
          </div>
        </div>
      </div>
      <Table columns={columns} renderRow={renderRow} data={data} />
      <Pagination page={p} count={count} />
    </div>
  );
};

export default ContentPage;
