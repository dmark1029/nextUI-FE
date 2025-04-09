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

export type Instances = {
  id: number;
  subnetName: string;
  username: string;
  type: string;
  ip: string;
  instanceId: string;
  provider: string;
  port: number;
};

const mochInstances: Instances[] = [
  {
    id: 1,
    username: "instance1",
    subnetName: "subnet-12345678",
    type: "AWS",
    ip: "237.84.2.178",
    instanceId: "i-12345678",
    provider: "AWS",
    port: 80,
  },
  {
    id: 2,
    username: "instance1",
    subnetName: "subnet-87654321",
    type: "GCP",
    ip: "244.178.44.111",
    instanceId: "i-87654321",
    provider: "GCP",
    port: 80,
  },
  {
    id: 3,
    username: "instance13",
    subnetName: "subnet-34567890",
    type: "Azure",
    ip: "237.84.2.178",
    instanceId: "i-34567890",
    provider: "Azure",
    port: 80,
  },
  {
    id: 4,
    username: "instance14",
    subnetName: "subnet-01234567",
    type: "AWS",
    ip: "244.178.44.111",
    instanceId: "i-01234567",
    provider: "AWS",
    port: 80,
  },
  {
    id: 5,
    username: "instance15",
    subnetName: "subnet-67890123",
    type: "GCP",
    ip: "237.84.2.178",
    instanceId: "i-67890123",
    provider: "GCP",
    port: 80,
  },
  {
    id: 6,
    username: "instance16",
    subnetName: "subnet-23456789",
    type: "Azure",
    ip: "244.178.44.111",
    instanceId: "i-23456789",
    provider: "Azure",
    port: 80,
  },
  {
    id: 7,
    username: "instance17",
    subnetName: "subnet-90123456",
    type: "AWS",
    ip: "237.84.2.178",
    instanceId: "i-90123456",
    provider: "AWS",
    port: 80,
  },
  {
    id: 8,
    username: "instance18",
    subnetName: "subnet-34567890",
    type: "GCP",
    ip: "244.178.44.111",
    instanceId: "i-34567890",
    provider: "GCP",
    port: 80,
  },
  {
    id: 9,
    username: "instance19",
    subnetName: "subnet-01234567",
    type: "Azure",
    ip: "237.84.2.178",
    instanceId: "i-01234567",
    provider: "Azure",
    port: 80,
  },
  {
    id: 10,
    username: "instance10",
    subnetName: "subnet-67890123",
    type: "AWS",
    ip: "244.178.44.111",
    instanceId: "i-67890123",
    provider: "AWS",
    port: 80,
  },
  {
    id: 11,
    username: "instance11",
    subnetName: "subnet-23456789",
    type: "GCP",
    ip: "244.178.44.111",
    instanceId: "i-23456789",
    provider: "GCP",
    port: 80,
  },
];

export async function GET() {
  return NextResponse.json(mochInstances, { status: 200 });
}
