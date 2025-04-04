import { NextResponse } from "next/server";

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

// export type username = {
//   avatar: string;
//   email: string;
//   name: string;
// };

export type Wallets = {
  id: number;
  walletName: string;
  uid: number;
  walletHotkey: string;
  alphaStakes: number;
  instance: string;
  balance: number;
};

const mockWallets: Wallets[] = [
  {
    id: 1,
    walletName: "ZypherStorm",
    walletHotkey: "subnet-xA9d8Z23",
    uid: 12,
    alphaStakes: 12,
    instance: "i-12345678",
    balance: 80,
  },
  {
    id: 2,
    walletName: "QuantumEcho99",
    walletHotkey: "subnet-Vb8xZk72",
    uid: 34,
    alphaStakes: 8,
    instance: "i-87654321",
    balance: 65,
  },
  {
    id: 3,
    walletName: "NebulaFury_17",
    walletHotkey: "subnet-Qy1LpX34",
    uid: 56,
    alphaStakes: 15,
    instance: "i-34567890",
    balance: 92,
  },
  {
    id: 4,
    walletName: "GlitchVortex",
    walletHotkey: "subnet-Az7JpM56",
    uid: 78,
    alphaStakes: 20,
    instance: "i-01234567",
    balance: 45,
  },
  {
    id: 5,
    walletName: "CyberNova77",
    walletHotkey: "subnet-Nb2XqT98",
    uid: 90,
    alphaStakes: 10,
    instance: "i-67890123",
    balance: 70,
  },
  {
    id: 6,
    walletName: "WarpDriveX",
    walletHotkey: "subnet-Yu5LmP11",
    uid: 21,
    alphaStakes: 18,
    instance: "i-23456789",
    balance: 88,
  },
  {
    id: 7,
    walletName: "EtherPhantom",
    walletHotkey: "subnet-Kt9ZxL42",
    uid: 43,
    alphaStakes: 12,
    instance: "i-90123456",
    balance: 55,
  },
  {
    id: 8,
    walletName: "PixelRaider_5",
    walletHotkey: "subnet-Jh3XpN76",
    uid: 65,
    alphaStakes: 25,
    instance: "i-34567890",
    balance: 100,
  },
  {
    id: 9,
    walletName: "MetaShadowX",
    walletHotkey: "subnet-Lx2MzQ88",
    uid: 87,
    alphaStakes: 7,
    instance: "i-01234567",
    balance: 40,
  },
  {
    id: 10,
    walletName: "NanoGhost_13",
    walletHotkey: "subnet-Pq4XnZ55",
    uid: 99,
    alphaStakes: 30,
    instance: "i-67890123",
    balance: 110,
  },
  {
    id: 11,
    walletName: "NanoGhost_14",
    walletHotkey: "subnet-Pq4XnZ55dsf",
    uid: 12,
    alphaStakes: 30,
    instance: "i-367890123",
    balance: 10,
  },
];

export async function GET() {
  return NextResponse.json(mockWallets, { status: 200 });
}
