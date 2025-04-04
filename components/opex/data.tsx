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

type Wallets =
  | "Design"
  | "Product"
  | "Marketing"
  | "Management"
  | "Engineering"
  | "Sales"
  | "Support"
  | "Other"
  | (string & {});

export type Opex = {
  id: number;
  subnetName: string;
  opexBalance: number;
  opexStakedAlpha: number;
  opexWallet: string;
  totalCollectableAlpha: number;
  userSubnets: Wallets[];
  autoCollect: boolean;
};

export type ColumnsKey =
  | "id"
  | "subnetName"
  | "opexBalance"
  | "opexStakedAlpha"
  | "opexWallet"
  | "totalCollectableAlpha"
  | "userSubnets"
  | "autoCollect";

export const INITIAL_VISIBLE_COLUMNS: ColumnsKey[] = [
  "id",
  "subnetName",
  "opexBalance",
  "opexStakedAlpha",
  "opexWallet",
  "totalCollectableAlpha",
  "userSubnets",
  "autoCollect",
];

export const columns = [
  { name: "No", uid: "id" },
  { name: "Subnet Name", uid: "subnetName" },
  { name: "OpEx Balance(tao)", uid: "opexBalance" },
  { name: "OpEx Staked Alpha", uid: "opexStakedAlpha" },
  { name: "OpEx Wallet", uid: "opexWallet" },
  { name: "Total Collectable Alpha", uid: "totalCollectableAlpha" },
  { name: "Total Collectable Wallets", uid: "userSubnets" },
  { name: "Auto Collect", uid: "autoCollect" },
];

const generateMockOpex = (count: number): Opex[] => {
  const mockData: Opex[] = [];

  for (let i = 0; i < count; i++) {
    const opex: Opex = {
      id: i,
      subnetName: "Apex",
      opexBalance: 20.12,
      opexStakedAlpha: 1.254,
      opexWallet: "elkoif9_fse9f",
      totalCollectableAlpha: 213,
      userSubnets: [
        "Design",
        "Product",
        "Marketing",
        "Management",
        "Engineering",
        "Sales",
        "Support",
        "Other",
      ].filter(() => Math.random() > 0.5),
      autoCollect: false,
    };

    mockData.push(opex);
  }

  return mockData;
};

export const opexData: Opex[] = generateMockOpex(100);
