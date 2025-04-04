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

export type Instances = {
  id: number;
  subnetName: string;
  username: UserName;
  type: string;
  ip: string;
  instanceId: string;
  provider: string;
};

export type ColumnsKey =
  | "id"
  | "subnetName"
  | "username"
  | "type"
  | "ip"
  | "port"
  | "instanceId"
  | "provider";

export const INITIAL_VISIBLE_COLUMNS: ColumnsKey[] = [
  "id",
  "username",
  "subnetName",
  "type",
  "ip",
  "port",
  "instanceId",
  "provider",
];

export const columns = [
  { name: "No", uid: "id" },
  { name: "Subnet Name", uid: "subnetName", sortDirection: "ascending" },
  { name: "Name", uid: "username", sortDirection: "ascending" },
  { name: "Type", uid: "type" },
  { name: "IP", uid: "ip" },
  { name: "Port", uid: "port" },
  { name: "Instance ID", uid: "instanceId" },
  { name: "Provider", uid: "provider" },
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

const generateMockUserData = (count: number): Instances[] => {
  const mockData: Instances[] = [];

  for (let i = 0; i < count; i++) {
    const user: Instances = {
      id: 1,
      username: {
        avatar: "https://i.pravatar.cc/150?img=1",
        email: "alice@example.com",
        name: "Alice Johnson",
      },
      subnetName: "subnet-12345678",
      type: "AWS",
      ip: "237.84.2.178",
      instanceId: "i-12345678",
      provider: "AWS",
    };

    mockData.push(user);
  }

  return mockData;
};

export const users: Instances[] = generateMockUserData(100);
