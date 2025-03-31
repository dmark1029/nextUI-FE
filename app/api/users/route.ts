import { NextResponse } from "next/server";

/* eslint-disable @typescript-eslint/no-unused-vars */
const statusOptions = [
  { name: "Active", uid: "active" },
  { name: "Inactive", uid: "inactive" },
  { name: "Paused", uid: "paused" },
  { name: "Vacation", uid: "vacation" },
] as const;
/* eslint-enable @typescript-eslint/no-unused-vars */

export type StatusOptions = (typeof statusOptions)[number]["name"];

type Teams =
  | "Design"
  | "Product"
  | "Marketing"
  | "Management"
  | "Engineering"
  | "Sales"
  | "Support"
  | "Other"
  | (string & {});

export type username = {
  avatar: string;
  email: string;
  name: string;
};

export type Users = {
  id: number;
  userID: number;
  externalWorkerID: string;
  username: username;
  subnets: string;
  role: "Admin" | "User";
  status: StatusOptions;
  startDate: string;
  teams: Teams[];
};

const mockUsers: Users[] = [
  {
    id: 1,
    userID: 1001,
    externalWorkerID: "EXT12345",
    username: {
      avatar: "https://i.pravatar.cc/150?img=1",
      email: "alice@example.com",
      name: "Alice Johnson",
    },
    subnets: "Apex",
    role: "User",
    status: "Active",
    startDate: new Date().toISOString(),
    teams: ["Engineering"],
  },
  {
    id: 2,
    userID: 1002,
    externalWorkerID: "EXT12346",
    username: {
      avatar: "https://i.pravatar.cc/150?img=2",
      email: "bob@example.com",
      name: "Bob Smith",
    },
    subnets: "Targon",
    role: "Admin",
    status: "Inactive",
    startDate: new Date().toISOString(),
    teams: ["Marketing"],
  },
  {
    id: 3,
    userID: 1003,
    externalWorkerID: "EXT12347",
    username: {
      avatar: "https://i.pravatar.cc/150?img=3",
      email: "charlie@example.com",
      name: "Charlie Brown",
    },
    subnets: "Chutes",
    role: "User",
    status: "Paused",
    startDate: new Date().toISOString(),
    teams: ["HR"],
  },
  {
    id: 4,
    userID: 1004,
    externalWorkerID: "EXT12348",
    username: {
      avatar: "https://i.pravatar.cc/150?img=4",
      email: "david@example.com",
      name: "David Wilson",
    },
    subnets: "Celium",
    role: "User",
    status: "Vacation",
    startDate: new Date().toISOString(),
    teams: ["Analytics"],
  },
  {
    id: 5,
    userID: 1005,
    externalWorkerID: "EXT12349",
    username: {
      avatar: "https://i.pravatar.cc/150?img=5",
      email: "eve@example.com",
      name: "Eve Martinez",
    },
    subnets: "Dojo",
    role: "Admin",
    status: "Active",
    startDate: new Date().toISOString(),
    teams: ["Project Management"],
  },
  {
    id: 6,
    userID: 1006,
    externalWorkerID: "EXT12350",
    username: {
      avatar: "https://i.pravatar.cc/150?img=6",
      email: "frank@example.com",
      name: "Frank Thompson",
    },
    subnets: "Gradients",
    role: "User",
    status: "Inactive",
    startDate: new Date().toISOString(),
    teams: ["Sales"],
  },
  {
    id: 7,
    userID: 1007,
    externalWorkerID: "EXT12351",
    username: {
      avatar: "https://i.pravatar.cc/150?img=7",
      email: "grace@example.com",
      name: "Grace Garcia",
    },
    subnets: "Sturdy",
    role: "Admin",
    status: "Paused",
    startDate: new Date().toISOString(),
    teams: ["Design"],
  },
  {
    id: 8,
    userID: 1008,
    externalWorkerID: "EXT12352",
    username: {
      avatar: "https://i.pravatar.cc/150?img=8",
      email: "hannah@example.com",
      name: "Hannah Lee",
    },
    subnets: "Templar",
    role: "User",
    status: "Active",
    startDate: new Date().toISOString(),
    teams: ["Operations"],
  },
  {
    id: 9,
    userID: 1009,
    externalWorkerID: "EXT12353",
    username: {
      avatar: "https://i.pravatar.cc/150?img=9",
      email: "isaac@example.com",
      name: "Isaac Anderson",
    },
    subnets: "France",
    role: "Admin",
    status: "Vacation",
    startDate: new Date().toISOString(),
    teams: ["Product"],
  },
  {
    id: 10,
    userID: 1010,
    externalWorkerID: "EXT12354",
    username: {
      avatar: "https://i.pravatar.cc/150?img=10",
      email: "julia@example.com",
      name: "Julia Roberts",
    },
    subnets: "404-GEN",
    role: "User",
    status: "Active",
    startDate: new Date().toISOString(),
    teams: ["Customer Support"],
  },
  {
    id: 11,
    userID: 1710,
    externalWorkerID: "EXT12354",
    username: {
      avatar: "https://i.pravatar.cc/150?img=10",
      email: "julia@example.com",
      name: "Danijel Roberts",
    },
    subnets: "Argentina",
    role: "User",
    status: "Active",
    startDate: new Date().toISOString(),
    teams: ["Customer Support"],
  },
];

// API Route using Next.js App Router
export async function GET() {
  return NextResponse.json(mockUsers, { status: 200 });
}
