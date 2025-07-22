import { currentUser } from "@clerk/nextjs/server";
import Image from "next/image";
import Link from "next/link";

const menuItems = [
  {
    title: "MENU",
    items: [
  {
    icon: "/dashboard.png",
    label: "Dashboard",
    href: "/",
    visible: ["admin", "advisor", "client", "supervisor"],
  },
  {
    icon: "/advisor.png",
    label: "Advisors",
    href: "/list/advisors",
    visible: ["admin", "supervisor"],
  },
  {
    icon: "/client.png",
    label: "Clients",
    href: "/list/clients",
    visible: ["admin", "advisor", "supervisor"],
  },
  {
    icon: "/supervisor.png",
    label: "Supervisors",
    href: "/list/supervisors",
    visible: ["admin"],
  },
  {
    icon: "/regulation.png",
    label: "Regulations",
    href: "/list/regulations",
    visible: ["admin", "advisor"],
  },
  {
    icon: "/group.png",
    label: "Groups",
    href: "/list/groups",
    visible: ["admin", "advisor"],
  },
  {
    icon: "/resource.png",
    label: "Resources",
    href: "/list/resources",
    visible: ["admin", "advisor"],
  },
  {
    icon: "/assessment.png",
    label: "Assessments",
    href: "/list/assessments",
    visible: ["admin", "advisor", "client", "supervisor"],
  },
  {
    icon: "/report.png",
    label: "Reports",
    href: "/list/reports",
    visible: ["admin", "advisor", "client", "supervisor"],
  },
  {
    icon: "/risk-level.png",
    label: "Results",
    href: "/list/status",
    visible: ["admin", "advisor", "client", "supervisor"],
  },
  {
    icon: "/attendance.png",
    label: "Content",
    href: "/list/content",
    visible: ["admin", "advisor", "supervisor"],
  },
  {
    icon: "/calendar.png",
    label: "Fiscal Calendar",
    href: "/list/fiscal-calendar",
    visible: ["admin", "advisor", "client", "supervisor"],
  },
  {
    icon: "/message.png",
    label: "Secure Messages",
    href: "/list/messages",
    visible: ["admin", "advisor", "client", "supervisor"],
  },
  {
    icon: "/announcement.png",
    label: "Regulatory Updates",
    href: "/list/announcements",
    visible: ["admin", "advisor", "client", "supervisor"],
  },
    ],
  },
  {
    title: "OTHER",
    items: [
      {
        icon: "/profile.png",
        label: "Profile",
        href: "/profile",
        visible: ["admin", "advisor", "client", "supervisor"],
      },
      {
        icon: "/setting.png",
        label: "Settings",
        href: "/settings",
        visible: ["admin", "advisor", "client", "supervisor"],
      },
      {
        icon: "/logout.png",
        label: "Logout",
        href: "/logout",
        visible: ["admin", "advisor", "client", "supervisor"],
      },
    ],
  },
];

const Menu = async () => {
  const user = await currentUser();
  const role = user?.publicMetadata.role as string;
  return (
    <div className="mt-4 text-sm">
      {menuItems.map((i) => (
        <div className="flex flex-col gap-2" key={i.title}>
          <span className="hidden lg:block text-gray-400 font-light my-4">
            {i.title}
          </span>
          {i.items.map((item) => {
            if (item.visible.includes(role)) {
              return (
                <Link
                  href={item.href}
                  key={item.label}
                  className="flex items-center justify-center lg:justify-start gap-4 text-gray-500 py-2 md:px-2 rounded-md hover:bg-lamaSkyLight"
                >
                  <Image src={item.icon} alt="" width={20} height={20} />
                  <span className="hidden lg:block">{item.label}</span>
                </Link>
              );
            }
          })}
        </div>
      ))}
    </div>
  );
};

export default Menu;
