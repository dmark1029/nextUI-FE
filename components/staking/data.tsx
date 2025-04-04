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

export type Staking = {
  id: number;
  subnet: string;
  wallet: string;
  stakedAt: string;
  amount: number;
  reward: number;
  percentage: number;
};

export type ColumnsKey =
  | "id"
  | "subnet"
  | "wallet"
  | "stakedAt"
  | "amount"
  | "reward"
  | "percentage"
  | "unstake";

export const INITIAL_VISIBLE_COLUMNS: ColumnsKey[] = [
  "id",
  "subnet",
  "wallet",
  "stakedAt",
  "amount",
  "reward",
  "percentage",
  "unstake",
];

export const columns = [
  { name: "No", uid: "id" },
  { name: "Subnet", uid: "subnet" },
  { name: "Wallet", uid: "wallet" },
  { name: "Staked At", uid: "stakedAt" },
  { name: "Amount", uid: "amount" },
  { name: "Reward", uid: "reward" },
  { name: "Percentage(%)", uid: "percentage" },
  { name: "Action", uid: "unstake" },
];

// const names = [
//   "Alice Johnson",
//   "Bob Smith",
//   "Charlie Brown",
//   "David Wilson",
//   "Eve Martinez",
//   "Frank Thompson",
//   "Grace Garcia",
//   "Hannah Lee",
//   "Isaac Anderson",
//   "Julia Roberts",
//   "Liam Williams",
//   "Mia White",
//   "Noah Harris",
//   "Olivia Martin",
//   "Peyton Jones",
//   "Quinn Taylor",
//   "Ryan Moore",
//   "Sophia Davis",
//   "Marcus Lopez",
//   "Uma Thomas",
//   "Victoria Jackson",
//   "William Green",
//   "Xavier Hill",
//   "Yara Scott",
//   "Zoe Baker",
//   "Aaron Carter",
//   "Bella Brown",
//   "Carter Black",
//   "Daisy Clark",
//   "Ethan Hunt",
//   "Fiona Apple",
//   "George King",
//   "Harper Knight",
//   "Ivy Lane",
//   "Jack Frost",
//   "Kylie Reed",
//   "Lucas Grant",
//   "Molly Shaw",
//   "Nathan Ford",
//   "Oliver Stone",
//   "Penelope Cruz",
//   "Quentin Cook",
//   "Ruby Fox",
//   "Sarah Miles",
//   "Travis Shaw",
//   "Ursula Major",
//   "Vera Mindy",
//   "Wesley Snipes",
//   "Xena Warrior",
//   "Yvette Fielding",
// ];

const generateMockStakingData = (count: number): Staking[] => {
  const mockData: Staking[] = [];

  for (let i = 0; i < count; i++) {
    const staking: Staking = {
      id: 1,
      subnet: "subnet-xA9d8Z23",
      wallet: "ZypherStorm",
      stakedAt: "2025-04-01T10:30:00Z",
      amount: 12,
      reward: 3.5,
      percentage: 8,
    };

    mockData.push(staking);
  }

  return mockData;
};

export const users: Staking[] = generateMockStakingData(100);
