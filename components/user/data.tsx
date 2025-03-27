import {DangerCircleSvg} from "./danger-circle";
import {DefaultCircleSvg} from "./default-circle";
import {SuccessCircleSvg} from "./success-circle";
import {WarningCircleSvg} from "./warning-circle";

export const statusOptions = [
  {name: "Active", uid: "active"},
  {name: "Inactive", uid: "inactive"},
  {name: "Paused", uid: "paused"},
  {name: "Vacation", uid: "vacation"},
] as const;

export type StatusOptions = (typeof statusOptions)[number]["name"];

export const statusColorMap: Record<StatusOptions, JSX.Element> = {
  Active: SuccessCircleSvg,
  Inactive: DefaultCircleSvg,
  Paused: DangerCircleSvg,
  Vacation: WarningCircleSvg,
};

type Teams =
  | "Design"
  | "Product"
  | "Marketing"
  | "Management"
  | "Engineering"
  | "Sales"
  | "Support"
  | "Other"
  | (string & {});

export type UserName = {
  avatar: string;
  email: string;
  name: string;
};

export type Users = {
  id: number;
  userID: number;
  externalWorkerID: string;
  username: UserName;
  subnets: string;
  role: "Contractor" | "Employee";
  // status: StatusOptions;
  createdAt: Date;
  // teams: Teams[];
};

export type ColumnsKey =
  | "userID"
  | "externalWorkerID"
  | "username"
  | "subnets"
  | "role"
  | "status"
  | "createdAt"
  // | "teams"
  | "actions"
  | "permission";

export const INITIAL_VISIBLE_COLUMNS: ColumnsKey[] = [
  "userID",
  "externalWorkerID",
  "username",
  "subnets",
  "role",
  "status",
  "createdAt",
  // "teams",
  "actions",
  "permission"
];

export const columns = [
  {name: "User ID", uid: "userID"},
  {name: "Name", uid: "username", sortDirection: "ascending"},
  {name: "Subnets", uid: "subnets"},
  {name: "Role", uid: "role"},
  // {name: "Status", uid: "status", info: "The user's current status"},
  {name: "Created At", uid: "createdAt"},
  // {name: "Teams", uid: "teams"},
  {name: "Actions", uid: "actions"},
  {name: "Permission", uid: "permission"},
];

const names = [
  "Alice Johnson",
  "Bob Smith",
  "Charlie Brown",
  "David Wilson",
  "Eve Martinez",
  "Frank Thompson",
  "Grace Garcia",
  "Hannah Lee",
  "Isaac Anderson",
  "Julia Roberts",
  "Liam Williams",
  "Mia White",
  "Noah Harris",
  "Olivia Martin",
  "Peyton Jones",
  "Quinn Taylor",
  "Ryan Moore",
  "Sophia Davis",
  "Marcus Lopez",
  "Uma Thomas",
  "Victoria Jackson",
  "William Green",
  "Xavier Hill",
  "Yara Scott",
  "Zoe Baker",
  "Aaron Carter",
  "Bella Brown",
  "Carter Black",
  "Daisy Clark",
  "Ethan Hunt",
  "Fiona Apple",
  "George King",
  "Harper Knight",
  "Ivy Lane",
  "Jack Frost",
  "Kylie Reed",
  "Lucas Grant",
  "Molly Shaw",
  "Nathan Ford",
  "Oliver Stone",
  "Penelope Cruz",
  "Quentin Cook",
  "Ruby Fox",
  "Sarah Miles",
  "Travis Shaw",
  "Ursula Major",
  "Vera Mindy",
  "Wesley Snipes",
  "Xena Warrior",
  "Yvette Fielding",
];

const subnets = ["Argentina", "Portugal", "Germany", "United States", "China"]

const generateMockUserData = (count: number): Users[] => {
  const mockData: Users[] = [];

  for (let i = 0; i < count; i++) {
    const selectedName = names[Math.floor(Math.random() * names.length)];
    const selectedSubnet = subnets[Math.floor(Math.random() * subnets.length)];

    const user: Users = {
      id: i,
      userID: Math.floor(Math.random() * 1000),
      externalWorkerID: `EXT-${Math.floor(Math.random() * 1000)}`,
      username: {
        avatar: `https://i.pravatar.cc/150?img=${i}`,
        email: `${selectedName.toLowerCase().replace(/\s+/g, ".")}@example.com`,
        name: selectedName,
      },
      subnets: selectedSubnet,
      role: Math.random() > 0.5 ? "Contractor" : "Employee",
      // status:
      //   Math.random() > 0.5
      //     ? "Active"
      //     : Math.random() > 0.5
      //       ? "Paused"
      //       : Math.random() > 0.5
      //         ? "Vacation"
      //         : "Inactive",
      createdAt: new Date(new Date().getTime() - Math.random() * (24 * 60 * 60 * 1000 * 40)),
      // teams: [
      //   "Design",
      //   "Product",
      //   "Marketing",
      //   "Management",
      //   "Engineering",
      //   "Sales",
      //   "Support",
      //   "Other",
      // ].filter(() => Math.random() > 0.5),
    };

    mockData.push(user);
  }

  return mockData;
};

export const users: Users[] = generateMockUserData(100);
