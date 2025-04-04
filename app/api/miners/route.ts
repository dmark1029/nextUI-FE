import { NextResponse } from "next/server";

export type Miners = {
  id: number;
  uid: number;
  instanceID: string;
  wallet: string;
  healthy: string;
  repo: string;
  port: number;
};

const mockMiners = [
  {
    id: 1,
    uid: 12,
    instanceID: "i-12345678",
    wallet: "ZypherStorm",
    healthy: "running",
    repo: "Updated",
    port: 8080,
  },
  {
    id: 2,
    uid: 34,
    instanceID: "i-87654321",
    wallet: "QuantumEcho99",
    healthy: "expired",
    repo: "Not updated",
    port: 9090,
  },
  {
    id: 3,
    uid: 56,
    instanceID: "i-34567890",
    wallet: "NebulaFury_17",
    healthy: "running",
    repo: "Not updated",
    port: 7070,
  },
  {
    id: 4,
    uid: 78,
    instanceID: "i-01234567",
    wallet: "GlitchVortex",
    healthy: "expired",
    repo: "Updated",
    port: 6060,
  },
  {
    id: 5,
    uid: 90,
    instanceID: "i-67890123",
    wallet: "CyberNova77",
    healthy: "running",
    repo: "Updated",
    port: 5050,
  },
  {
    id: 6,
    uid: 21,
    instanceID: "i-23456789",
    wallet: "WarpDriveX",
    healthy: "running",
    repo: "Not updated",
    port: 4040,
  },
  {
    id: 7,
    uid: 43,
    instanceID: "i-90123456",
    wallet: "EtherPhantom",
    healthy: "expired",
    repo: "Updated",
    port: 3030,
  },
  {
    id: 8,
    uid: 65,
    instanceID: "i-34567890",
    wallet: "PixelRaider_5",
    healthy: "running",
    repo: "Not updated",
    port: 2020,
  },
  {
    id: 9,
    uid: 87,
    instanceID: "i-01234567",
    wallet: "MetaShadowX",
    healthy: "expired",
    repo: "Updated",
    port: 8081,
  },
  {
    id: 10,
    uid: 99,
    instanceID: "i-67890123",
    wallet: "NanoGhost_13",
    healthy: "running",
    repo: "Updated",
    port: 9091,
  },
  {
    id: 11,
    uid: 12,
    instanceID: "i-367890123",
    wallet: "NanoGhost_14",
    healthy: "expired",
    repo: "Not updated",
    port: 7071,
  },
];

export async function GET() {
  return NextResponse.json(mockMiners, { status: 200 });
}
