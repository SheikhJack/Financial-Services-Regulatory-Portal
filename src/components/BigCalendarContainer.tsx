import prisma from "@/lib/prisma";
import BigCalendar from "./BigCalender";
import { adjustScheduleToCurrentWeek } from "@/lib/utils";

const BigCalendarContainer = async ({
  type,
  id,
}: {
  type: "advisorId" | "groupId";
  id: string | number;
}) => {
  const dataRes = await prisma.resource.findMany({
    where: {
      ...(type === "advisorId"
        ? { advisorId: id as string }
        : { groupId: id as number }),
    },
  });

  const data = dataRes.map((resource) => ({
    title: resource.name,
    name: resource.name,
    start: resource.startTime,
    end: resource.endTime,
  }));

  const schedule = adjustScheduleToCurrentWeek(data);

  return (
    <div className="">
      <BigCalendar data={schedule} />
    </div>
  );
};

export default BigCalendarContainer;
