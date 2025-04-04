import { NextResponse } from "next/server";

export type Staking = {
  id: number;
  subnet: string;
  wallet: string;
  stakedAt: string;
  amount: number;
  reward: number;
  percentage: number;
};

const mockStakingData: Staking[] = [
  {
    id: 1,
    subnet: "subnet-xA9d8Z23",
    wallet: "ZypherStorm",
    stakedAt: "2025-04-01T10:30:00Z",
    amount: 12,
    reward: 3.5,
    percentage: 8,
  },
  {
    id: 2,
    subnet: "subnet-Vb8xZk72",
    wallet: "QuantumEcho99",
    stakedAt: "2025-03-28T14:15:00Z",
    amount: 8,
    reward: 2.8,
    percentage: 7,
  },
  {
    id: 3,
    subnet: "subnet-Qy1LpX34",
    wallet: "NebulaFury_17",
    stakedAt: "2025-03-29T16:45:00Z",
    amount: 15,
    reward: 4.2,
    percentage: 9,
  },
  {
    id: 4,
    subnet: "subnet-Az7JpM56",
    wallet: "GlitchVortex",
    stakedAt: "2025-04-02T08:10:00Z",
    amount: 20,
    reward: 5.5,
    percentage: 10,
  },
  {
    id: 5,
    subnet: "subnet-Nb2XqT98",
    wallet: "CyberNova77",
    stakedAt: "2025-03-30T12:00:00Z",
    amount: 10,
    reward: 3.0,
    percentage: 6,
  },
  {
    id: 6,
    subnet: "subnet-Yu5LmP11",
    wallet: "WarpDriveX",
    stakedAt: "2025-04-01T09:20:00Z",
    amount: 18,
    reward: 4.8,
    percentage: 9,
  },
  {
    id: 7,
    subnet: "subnet-Kt9ZxL42",
    wallet: "EtherPhantom",
    stakedAt: "2025-04-03T11:40:00Z",
    amount: 12,
    reward: 3.2,
    percentage: 8,
  },
  {
    id: 8,
    subnet: "subnet-Jh3XpN76",
    wallet: "PixelRaider_5",
    stakedAt: "2025-03-27T15:55:00Z",
    amount: 25,
    reward: 6.0,
    percentage: 11,
  },
  {
    id: 9,
    subnet: "subnet-Lx2MzQ88",
    wallet: "MetaShadowX",
    stakedAt: "2025-04-02T07:30:00Z",
    amount: 7,
    reward: 2.0,
    percentage: 5,
  },
  {
    id: 10,
    subnet: "subnet-Pq4XnZ55",
    wallet: "NanoGhost_13",
    stakedAt: "2025-03-31T13:25:00Z",
    amount: 30,
    reward: 7.5,
    percentage: 12,
  },
  {
    id: 11,
    subnet: "subnet-Pq4XnZ55dsf",
    wallet: "NanoGhost_14",
    stakedAt: "2025-04-03T18:00:00Z",
    amount: 30,
    reward: 7.0,
    percentage: 11,
  },
];

export async function GET() {
  return NextResponse.json(mockStakingData, { status: 200 });
}
