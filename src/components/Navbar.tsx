import { UserButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import AnnouncementDropdown from "./AnnouncementDropdown";
import TableSearch from "./TableSearch"; 
import Image from "next/image";

const Navbar = async () => {

  const user = await currentUser();
  
  return (
    <div className="flex items-center justify-between p-4">
      {/* SEARCH BAR */}
      <TableSearch />
      {/* ICONS AND USER */}
      <div className="flex items-center gap-6 justify-end w-full">
        <div className="bg-white rounded-full w-7 h-7 flex items-center justify-center cursor-pointer">
          <Image src="/message.png" alt="" width={20} height={20} />
        </div>
        <AnnouncementDropdown />
        <div className="flex flex-col">
          <span className="text-xs leading-3 font-medium">{user?.fullName}</span>
          <span className="text-[10px] text-gray-500 text-right">
            {user?.publicMetadata?.role as string}
          </span>
        </div>
        {/* <Image src="/avatar.png" alt="" width={36} height={36} className="rounded-full"/> */}
        <UserButton />
      </div>
    </div>
  );
};

export default Navbar;
