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

export type Wallets = {
  id: number;
  walletName: string;
  uid: number;
  walletHotkey: string;
  alphaStakes: number;
  instance: string;
  balance: number;
};

export type ColumnsKey =
  | "id"
  | "walletName"
  | "uid"
  | "walletHotkey"
  | "alphaStakes"
  | "instance"
  | "balance";

export const INITIAL_VISIBLE_COLUMNS: ColumnsKey[] = [
  "id",
  "walletName",
  "uid",
  "walletHotkey",
  "alphaStakes",
  "instance",
  "balance",
];

export const columns = [
  { name: "No", uid: "id" },
  { name: "Wallet Name", uid: "walletName", sortDirection: "ascending" },
  { name: "UID", uid: "uid", sortDirection: "ascending" },
  { name: "Wallet Hotkey", uid: "walletHotkey" },
  { name: "Alpha Stakes", uid: "alphaStakes" },
  { name: "Instance", uid: "instance" },
  { name: "Balance", uid: "balance" },
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

const generateMockUserData = (count: number): Wallets[] => {
  const mockData: Wallets[] = [];

  for (let i = 0; i < count; i++) {
    const wallet: Wallets = {
      id: 1,
      walletName: "wallet-12345678",
      uid: 1,
      walletHotkey: "wallet-12345678",
      alphaStakes: 450,
      instance: "i-12345678",
      balance: 42,
    };

    mockData.push(wallet);
  }

  return mockData;
};

export const users: Wallets[] = generateMockUserData(100);
