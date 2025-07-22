// IT APPEARS THAT BIG CALENDAR SHOWS THE LAST WEEK WHEN THE CURRENT DAY IS A WEEKEND.
// FOR THIS REASON WE'LL GET THE LAST WEEK AS THE REFERENCE WEEK.
// IN THE TUTORIAL WE'RE TAKING THE NEXT WEEK AS THE REFERENCE WEEK.

const getLatestMonday = (): Date => {
  const today = new Date();
  const dayOfWeek = today.getDay();
  const daysSinceMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
  const latestMonday = today;
  latestMonday.setDate(today.getDate() - daysSinceMonday);
  return latestMonday;
};

export const adjustScheduleToCurrentWeek = (
  regulations: { name: string; title: string; start: Date; end: Date }[]
): { name: string; title: string; start: Date; end: Date }[] => {
  const latestMonday = getLatestMonday();

  return regulations.map((regulation) => {
    const regulationDayOfWeek = regulation.start.getDay();

    const daysFromMonday = regulationDayOfWeek === 0 ? 6 : regulationDayOfWeek - 1;

    const adjustedStartDate = new Date(latestMonday);

    adjustedStartDate.setDate(latestMonday.getDate() + daysFromMonday);
    adjustedStartDate.setHours(
      regulation.start.getHours(),
      regulation.start.getMinutes(),
      regulation.start.getSeconds()
    );
    const adjustedEndDate = new Date(adjustedStartDate);
    adjustedEndDate.setHours(
      regulation.end.getHours(),
      regulation.end.getMinutes(),
      regulation.end.getSeconds()
    );

    return {
      title: regulation.name,
      name: regulation.name,
      start: adjustedStartDate,
      end: adjustedEndDate,
    };
  });
};
