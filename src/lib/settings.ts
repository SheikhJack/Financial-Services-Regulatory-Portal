export const ITEM_PER_PAGE = 10;

type RouteAccessMap = {
  [key: string]: string[];
};

export const routeAccessMap: RouteAccessMap = {
  "/admin(.*)": ["admin"],
  "/client(.*)": ["client"],
  "/advisor(.*)": ["advisor"],
  "/supervisor(.*)": ["supervisor"],
  "/list/advisors": ["admin", "advisor"],
  "/list/clients": ["admin", "advisor"],
  "/list/supervisors": ["admin", "advisor"],
  "/list/regulations": ["admin"],
  "/list/groups": ["admin", "advisor"],
  "/list/assessments": ["admin", "advisor", "client", "supervisor"],
  "/list/reports": ["admin", "advisor", "client", "supervisor"],
  "/list/status": ["admin", "advisor", "client", "supervisor"],
  "/list/attendance": ["admin", "advisor", "client", "supervisor"],
  "/list/events": ["admin", "advisor", "client", "supervisor"],
  "/list/announcements": ["admin", "advisor", "client", "supervisor"],
};
