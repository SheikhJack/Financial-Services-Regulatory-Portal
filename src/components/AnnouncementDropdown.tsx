import prisma from "@/lib/prisma";
import Image from "next/image";
import Link from "next/link";

const AnnouncementDropdown = async () => {
  const announcements = await prisma.announcement.findMany({
    orderBy: { date: "desc" },
    take: 5,
  });

  return (
    <div className="relative group">
      <div className="bg-white rounded-full w-7 h-7 flex items-center justify-center cursor-pointer relative">
        <Image src="/announcement.png" alt="Announcements" width={20} height={20} />
        {announcements.length > 0 && (
          <div className="absolute -top-3 -right-3 w-5 h-5 flex items-center justify-center bg-purple-500 text-white rounded-full text-xs">
            {announcements.length}
          </div>
        )}
      </div>

      {/* DROPDOWN */}
      <div className="hidden group-hover:block absolute right-0 mt-2 w-[280px] bg-white shadow-lg rounded-md p-2 z-50">
        <h3 className="text-sm font-semibold px-2">Latest Announcements</h3>
        <ul className="mt-2 max-h-60 overflow-auto text-xs">
          {announcements.length === 0 && (
            <li className="text-gray-500 p-2">No announcements yet.</li>
          )}
          {announcements.map((a) => (
            <li
              key={a.id}
              className="border-b border-gray-100 p-2 hover:bg-gray-50"
            >
              <p className="font-medium">{a.title}</p>
              <p className="text-gray-600 text-xs line-clamp-2">{a.description}</p>
              <p className="text-[10px] text-gray-400 mt-1">
                {new Date(a.date).toLocaleDateString()}
              </p>
            </li>
          ))}
        </ul>
        <div className="text-center mt-2">
          <Link href="/announcements" className="text-blue-600 text-xs hover:underline">
            View all
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AnnouncementDropdown;
