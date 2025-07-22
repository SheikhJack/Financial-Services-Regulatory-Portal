import Link from "next/link";
import Image from "next/image";
import prisma from "@/lib/prisma";

const MAX_ITEMS = 4;

const DashboardContentFeed = async () => {
  const contents = await prisma.content.findMany({
    take: MAX_ITEMS,
    orderBy: { createdAt: "desc" },
  });

  if (contents.length === 0) {
    return (
      <div className="bg-white p-4 rounded-md shadow">
        <h2 className="text-lg font-semibold mb-2">Latest Content</h2>
        <p className="text-sm text-gray-500">No content available yet.</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-4 rounded-md shadow">
      <h2 className="text-lg font-semibold mb-4">Latest Content</h2>
      <ul className="space-y-3">
        {contents.map((item: any) => (
          <li key={item.id} className="border-b pb-2 last:border-b-0">
            <div className="flex justify-between items-start">
              <div>
                <p className="font-medium text-sm">{item.title}</p>
                <p className="text-xs text-gray-500">
                  {item.type} • {new Date(item.createdAt).toLocaleDateString()}
                </p>
              </div>
              {item.type === "image" && item.url && (
                <Image
                  src={item.url}
                  alt={item.title}
                  width={40}
                  height={40}
                  className="rounded object-cover"
                />
              )}
              {item.type === "pdf" && item.url && (
                <Link
                  href={item.url}
                  target="_blank"
                  className="text-blue-600 text-xs underline"
                >
                  View PDF
                </Link>
              )}
              {item.type === "post" && item.url && (
                <Link
                  href={item.url}
                  target="_blank"
                  className="text-blue-600 text-xs underline"
                >
                  View Post
                </Link>
              )}
            </div>
          </li>
        ))}
      </ul>
      <div className="mt-4 text-right">
        <Link
          href="/content"
          className="text-sm text-blue-600 hover:underline font-medium"
        >
          View all content →
        </Link>
      </div>
    </div>
  );
};

export default DashboardContentFeed;
