import { DangerCircleSvg } from "../shared/danger-circle";
import { DefaultCircleSvg } from "../shared/default-circle";
import { SuccessCircleSvg } from "../shared/success-circle";
import { WarningCircleSvg } from "../shared/warning-circle";

export const statusOptions = [
  { name: "Active", uid: "active" },
  { name: "Inactive", uid: "inactive" },
  { name: "Paused", uid: "paused" },
  { name: "Vacation", uid: "vacation" },
] as const;

export type StatusOptions = (typeof statusOptions)[number]["name"];

export const statusColorMap: Record<StatusOptions, JSX.Element> = {
  Active: SuccessCircleSvg,
  Inactive: DefaultCircleSvg,
  Paused: DangerCircleSvg,
  Vacation: WarningCircleSvg,
};

type Engineers =
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

export type Subnets = {
  id: number;
  username: string;
  emission: number;
  reg_cost: number;
  // status: StatusOptions;
  createdAt: Date;
  engineers: Engineers[];
};

export type ColumnsKey =
  | "id"
  | "username"
  | "emission"
  | "reg_cost"
  | "engineers"
  | "createdAt";
// | "teams"

export const INITIAL_VISIBLE_COLUMNS: ColumnsKey[] = [
  "id",
  "username",
  "emission",
  "reg_cost",
  "engineers",
  "createdAt",
  // "teams",
];

export const columns = [
  { name: "No", uid: "id" },
  { name: "Name", uid: "username" },
  { name: "Emission (%)", uid: "emission" },
  { name: "Reg Cost (tao)", uid: "reg_cost" },
  { name: "Engineers", uid: "engineers" },
  // {name: "Status", uid: "status", info: "The user's current status"},
  { name: "Created At", uid: "createdAt" },
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

const generateMockUserData = (count: number): Subnets[] => {
  const mockData: Subnets[] = [];

  for (let i = 0; i < count; i++) {
    const selectedName = names[Math.floor(Math.random() * names.length)];

    const user: Subnets = {
      id: i,
      username: selectedName,
      emission: i / 100,
      reg_cost: i / 100,
      // status:
      //   Math.random() > 0.5
      //     ? "Active"
      //     : Math.random() > 0.5
      //       ? "Paused"
      //       : Math.random() > 0.5
      //         ? "Vacation"
      //         : "Inactive",
      createdAt: new Date(
        new Date().getTime() - Math.random() * (24 * 60 * 60 * 1000 * 40),
      ),
      engineers: [
        "Design",
        "Product",
        "Marketing",
        "Management",
        "Engineering",
        "Sales",
        "Support",
        "Other",
      ].filter(() => Math.random() > 0.5),
    };

    mockData.push(user);
  }

  return mockData;
};

export const users: Subnets[] = generateMockUserData(100);
