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

export type Miners = {
  id: number;
  uid: number;
  instanceID: string;
  wallet: string;
  healthy: string;
  repo: string;
  port: number;
};

export type ColumnsKey =
  | "id"
  | "uid"
  | "instanceID"
  | "wallet"
  | "healthy"
  | "repo"
  | "port";

export const INITIAL_VISIBLE_COLUMNS: ColumnsKey[] = [
  "id",
  "uid",
  "instanceID",
  "wallet",
  "healthy",
  "repo",
  "port",
];

export const columns = [
  { name: "No", uid: "id" },
  { name: "UID", uid: "uid", sortDirection: "ascending" },
  { name: "Instance ID", uid: "instanceID" },
  { name: "Wallet", uid: "wallet", sortDirection: "ascending" },
  { name: "Healthy", uid: "healthy" },
  { name: "Repo", uid: "repo" },
  { name: "Port", uid: "port" },
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

const generateMockMinerData = (count: number): Miners[] => {
  const mockData: Miners[] = [];

  for (let i = 0; i < count; i++) {
    const wallet: Miners = {
      id: 1,
      uid: 1,
      instanceID: "i-12345678",
      wallet: "wallet-12345678",
      healthy: "running",
      repo: "updated",
      port: 42,
    };

    mockData.push(wallet);
  }

  return mockData;
};

export const users: Miners[] = generateMockMinerData(100);
