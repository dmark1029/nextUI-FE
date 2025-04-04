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

export type username = {
  avatar: string;
  email: string;
  name: string;
};

export type Subnets = {
  id: number;
  username: username;
  emission: number;
  reg_cost: number;
  createdAt: string;
  engineers: Engineers[];
};

const mockSubnets: Subnets[] = [
  {
    id: 1,
    username: {
      avatar: "https://i.pravatar.cc/150?img=1",
      email: "alice@example.com",
      name: "Alice Johnson",
    },
    emission: 0.5,
    reg_cost: 0.5,
    createdAt: new Date().toISOString(),
    engineers: ["Engineering", "Design", "Sales"],
  },
  {
    id: 2,
    username: {
      avatar: "https://i.pravatar.cc/150?img=2",
      email: "bob@example.com",
      name: "Bob Smith",
    },
    emission: 0.5,
    reg_cost: 0.5,
    createdAt: new Date().toISOString(),
    engineers: ["Marketing"],
  },
  {
    id: 3,
    username: {
      avatar: "https://i.pravatar.cc/150?img=3",
      email: "charlie@example.com",
      name: "Charlie Brown",
    },
    emission: 0.5,
    reg_cost: 0.5,
    createdAt: new Date().toISOString(),
    engineers: ["HR"],
  },
  {
    id: 4,
    username: {
      avatar: "https://i.pravatar.cc/150?img=4",
      email: "david@example.com",
      name: "David Wilson",
    },
    emission: 0.5,
    reg_cost: 0.5,
    createdAt: new Date().toISOString(),
    engineers: ["Analytics"],
  },
  {
    id: 5,
    username: {
      avatar: "https://i.pravatar.cc/150?img=5",
      email: "eve@example.com",
      name: "Eve Martinez",
    },
    emission: 0.5,
    reg_cost: 0.5,
    createdAt: new Date().toISOString(),
    engineers: ["Project Management"],
  },
  {
    id: 6,
    username: {
      avatar: "https://i.pravatar.cc/150?img=6",
      email: "frank@example.com",
      name: "Frank Thompson",
    },
    emission: 0.5,
    reg_cost: 0.5,
    createdAt: new Date().toISOString(),
    engineers: ["Sales"],
  },
  {
    id: 7,
    username: {
      avatar: "https://i.pravatar.cc/150?img=7",
      email: "grace@example.com",
      name: "Grace Garcia",
    },
    emission: 0.5,
    reg_cost: 0.5,
    createdAt: new Date().toISOString(),
    engineers: ["Design"],
  },
  {
    id: 8,
    username: {
      avatar: "https://i.pravatar.cc/150?img=8",
      email: "hannah@example.com",
      name: "Hannah Lee",
    },
    emission: 0.5,
    reg_cost: 0.5,
    createdAt: new Date().toISOString(),
    engineers: ["Operations"],
  },
  {
    id: 9,
    username: {
      avatar: "https://i.pravatar.cc/150?img=9",
      email: "isaac@example.com",
      name: "Isaac Anderson",
    },
    emission: 0.5,
    reg_cost: 0.5,
    createdAt: new Date().toISOString(),
    engineers: ["Product"],
  },
  {
    id: 10,
    username: {
      avatar: "https://i.pravatar.cc/150?img=10",
      email: "julia@example.com",
      name: "Julia Roberts",
    },
    emission: 0.5,
    reg_cost: 0.5,
    createdAt: new Date().toISOString(),
    engineers: ["Customer Support"],
  },
  {
    id: 11,
    username: {
      avatar: "https://i.pravatar.cc/150?img=10",
      email: "julia@example.com",
      name: "Danijel Roberts",
    },
    emission: 0.5,
    reg_cost: 0.5,
    createdAt: new Date().toISOString(),
    engineers: ["Customer Support", "Product"],
  },
];

// API Route using Next.js App Router
export async function GET() {
  console.log("GET API is called");

  return NextResponse.json(mockSubnets, { status: 200 });
}
