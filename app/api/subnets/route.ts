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

export type Subnets = {
  id: number;
  username: string;
  emission: number;
  reg_cost: number;
  createdAt: string;
  engineers: Engineers[];
};

const mockSubnets: Subnets[] = [
  {
    id: 1,
    username: "Apex",
    emission: 0.5,
    reg_cost: 0.5,
    createdAt: new Date().toISOString(),
    engineers: ["Alex", "Danijel", "Sales"],
  },
  {
    id: 2,
    username: "omron",
    emission: 0.5,
    reg_cost: 0.5,
    createdAt: new Date().toISOString(),
    engineers: ["Marketing"],
  },
  {
    id: 3,
    username: "Targon",
    emission: 0.5,
    reg_cost: 0.5,
    createdAt: new Date().toISOString(),
    engineers: ["HR"],
  },
  {
    id: 4,
    username: "Dippy",
    emission: 0.5,
    reg_cost: 0.5,
    createdAt: new Date().toISOString(),
    engineers: ["Analytics"],
  },
  {
    id: 5,
    username: "Web genie AI",
    emission: 0.5,
    reg_cost: 0.5,
    createdAt: new Date().toISOString(),
    engineers: ["Project Management"],
  },
  {
    id: 6,
    username: "Chute",
    emission: 0.5,
    reg_cost: 0.5,
    createdAt: new Date().toISOString(),
    engineers: ["Sales"],
  },
  {
    id: 7,
    username: "ReadyAI",
    emission: 0.5,
    reg_cost: 0.5,
    createdAt: new Date().toISOString(),
    engineers: ["Design"],
  },
  {
    id: 8,
    username: "Gaia",
    emission: 0.5,
    reg_cost: 0.5,
    createdAt: new Date().toISOString(),
    engineers: ["Operations"],
  },
  {
    id: 9,
    username: "Efficient Frontier",
    emission: 0.5,
    reg_cost: 0.5,
    createdAt: new Date().toISOString(),
    engineers: ["Product"],
  },
  {
    id: 10,
    username: "NOVA",
    emission: 0.5,
    reg_cost: 0.5,
    createdAt: new Date().toISOString(),
    engineers: ["Customer Support"],
  },
  {
    id: 11,
    username: "FakeNews",
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
