import { NextResponse } from "next/server";

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
  subnetName: string;
  opexBalance: number;
  opexStakedAlpha: number;
  opexWallet: string;
  totalCollectableAlpha: number;
  userSubnets: Wallets[];
  autoCollect: boolean;
};

const mockMinersData = [
  {
    id: 1,
    subnetName: "AlphaNet",
    opexBalance: 1200.5,
    opexStakedAlpha: 500.25,
    opexWallet: "Engineering",
    totalCollectableAlpha: 300.75,
    userSubnets: ["Engineering", "Product", "Marketing"],
    autoCollect: true,
  },
  {
    id: 2,
    subnetName: "BetaNet",
    opexBalance: 950.3,
    opexStakedAlpha: 420.6,
    opexWallet: "Marketing",
    totalCollectableAlpha: 215.4,
    userSubnets: ["Marketing", "Sales"],
    autoCollect: false,
  },
  {
    id: 3,
    subnetName: "GammaNet",
    opexBalance: 1800.8,
    opexStakedAlpha: 780.2,
    opexWallet: "Management",
    totalCollectableAlpha: 450.9,
    userSubnets: ["Management", "Support"],
    autoCollect: true,
  },
  {
    id: 4,
    subnetName: "DeltaNet",
    opexBalance: 1320.1,
    opexStakedAlpha: 600.5,
    opexWallet: "Sales",
    totalCollectableAlpha: 325.7,
    userSubnets: ["Sales", "Other"],
    autoCollect: false,
  },
  {
    id: 5,
    subnetName: "EpsilonNet",
    opexBalance: 1750.6,
    opexStakedAlpha: 900.3,
    opexWallet: "Support",
    totalCollectableAlpha: 520.1,
    userSubnets: ["Support", "Design"],
    autoCollect: true,
  },
  {
    id: 6,
    subnetName: "ZetaNet",
    opexBalance: 1430.9,
    opexStakedAlpha: 610.4,
    opexWallet: "Other",
    totalCollectableAlpha: 410.3,
    userSubnets: ["Other", "Engineering"],
    autoCollect: false,
  },
];

export async function GET() {
  return NextResponse.json(mockMinersData, { status: 200 });
}
