import Announcements from "@/components/Announcements";
import BigCalendarContainer from "@/components/BigCalendarContainer";
import FormContainer from "@/components/FormContainer";
import Performance from "@/components/Risklevel"; // Consider renaming to "RiskLevel"
import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

const SingleAdvisorPage = async ({
  params: { id },
}: {
  params: { id: string };
}) => {
  const { sessionClaims } = auth();
  const role = (sessionClaims?.metadata as { role?: string })?.role;

  const advisor = await prisma.advisor.findUnique({
    where: { id },
    include: {
      _count: {
        select: {
          regulations: true,
          resources: true,
          groups: true,
        },
      },
    },
  });

  if (!advisor) return notFound();

  return (
    <div className="flex-1 p-4 flex flex-col gap-4 xl:flex-row">
      {/* LEFT */}
      <div className="w-full xl:w-2/3">
        {/* TOP */}
        <div className="flex flex-col lg:flex-row gap-4">
          {/* USER INFO CARD */}
          <div className="bg-lamaSky py-6 px-4 rounded-md flex-1 flex gap-4">
            <div className="w-1/3">
              <Image
                src={advisor.img || "/noAvatar.png"}
                alt=""
                width={144}
                height={144}
                className="w-36 h-36 rounded-full object-cover"
              />
            </div>
            <div className="w-2/3 flex flex-col justify-between gap-4">
              <div className="flex items-center gap-4">
                <h1 className="text-xl font-semibold">
                  {advisor.name + " " + advisor.surname}
                </h1>
                {role === "admin" && (
                  <FormContainer table="advisor" type="update" data={advisor} />
                )}
              </div>
              <p className="text-sm text-gray-500">
                Qualified with masters in business
              </p>
              <div className="flex items-center justify-between gap-2 flex-wrap text-xs font-medium">
                <div className="w-full md:w-1/3 flex items-center gap-2">
                  <Image src="/blood.png" alt="" width={14} height={14} />
                  <span>{advisor.bloodType}</span>
                </div>
                <div className="w-full md:w-1/3 flex items-center gap-2">
                  <Image src="/date.png" alt="" width={14} height={14} />
                  <span>
                    {new Intl.DateTimeFormat("en-GB").format(advisor.birthday)}
                  </span>
                </div>
                <div className="w-full md:w-1/3 flex items-center gap-2">
                  <Image src="/mail.png" alt="" width={14} height={14} />
                  <span>{advisor.email || "-"}</span>
                </div>
                <div className="w-full md:w-1/3 flex items-center gap-2">
                  <Image src="/phone.png" alt="" width={14} height={14} />
                  <span>{advisor.phone || "-"}</span>
                </div>
              </div>
            </div>
          </div>

          {/* SMALL CARDS */}
          <div className="flex-1 flex gap-4 justify-between flex-wrap">
            {/* Attendance (Static) */}
            <div className="bg-white p-4 rounded-md flex gap-4 w-full md:w-[48%]">
              <Image src="/singleAttendance.png" alt="" width={24} height={24} />
              <div>
                <h1 className="text-xl font-semibold">90%</h1>
                <span className="text-sm text-gray-400">Attendance</span>
              </div>
            </div>

            {/* Regulations */}
            <div className="bg-white p-4 rounded-md flex gap-4 w-full md:w-[48%]">
              <Image src="/singleBranch.png" alt="" width={24} height={24} />
              <div>
                <h1 className="text-xl font-semibold">
                  {advisor._count.regulations}
                </h1>
                <span className="text-sm text-gray-400">Regulations</span>
              </div>
            </div>

            {/* Resources */}
            <div className="bg-white p-4 rounded-md flex gap-4 w-full md:w-[48%]">
              <Image src="/singleLesson.png" alt="" width={24} height={24} />
              <div>
                <h1 className="text-xl font-semibold">
                  {advisor._count.resources}
                </h1>
                <span className="text-sm text-gray-400">Resources</span>
              </div>
            </div>

            {/* Groups */}
            <div className="bg-white p-4 rounded-md flex gap-4 w-full md:w-[48%]">
              <Image src="/singleClass.png" alt="" width={24} height={24} />
              <div>
                <h1 className="text-xl font-semibold">
                  {advisor._count.groups}
                </h1>
                <span className="text-sm text-gray-400">Groups</span>
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM - Schedule */}
        <div className="mt-4 bg-white rounded-md p-4 h-[800px]">
          <h1>Advisor&apos;s Schedule</h1>
          <BigCalendarContainer type="advisorId" id={advisor.id} />
        </div>
      </div>

      {/* RIGHT */}
      <div className="w-full xl:w-1/3 flex flex-col gap-4">
        {/* Shortcuts */}
        <div className="bg-white p-4 rounded-md">
          <h1 className="text-xl font-semibold">Shortcuts</h1>
          <div className="mt-4 flex gap-4 flex-wrap text-xs text-gray-500">
            <Link
              className="p-3 rounded-md bg-lamaSkyLight"
              href={`/list/groups?supervisorId=${advisor.id}`}
            >
              Advisor&apos;s Groups
            </Link>
            <Link
              className="p-3 rounded-md bg-lamaPurpleLight"
              href={`/list/clients?advisorId=${advisor.id}`}
            >
              Advisor&apos;s Clients
            </Link>
            <Link
              className="p-3 rounded-md bg-lamaYellowLight"
              href={`/list/resources?advisorId=${advisor.id}`}
            >
              Advisor&apos;s Resources
            </Link>
            <Link
              className="p-3 rounded-md bg-pink-50"
              href={`/list/riskscore?advisorId=${advisor.id}`}
            >
              Advisor&apos;s Risk Score
            </Link>
            <Link
              className="p-3 rounded-md bg-lamaSkyLight"
              href={`/list/reports?advisorId=${advisor.id}`}
            >
              Advisor&apos;s Reports
            </Link>
          </div>
        </div>

        {/* Risk Level (was Performance) */}
        <Performance />

        {/* Announcements */}
        <Announcements />
      </div>
    </div>
  );
};

export default SingleAdvisorPage;
