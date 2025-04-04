import { NextResponse } from "next/server";

type Subnets =
  | "Design"
  | "Product"
  | "Marketing"
  | "Management"
  | "Engineering"
  | "Sales"
  | "Support"
  | "Other"
  | (string & {});

export type Keys = {
  id: number;
  subnetName: string;
  accountName: string;
  userSubnets: Subnets[];
  accountPassword: string;
  apiKey: string;
  serviceLink: string;
};
const mockKeys = [
  {
    id: 1,
    subnetName: "Engineering",
    accountName: "ZypherStorm",
    userSubnets: ["Engineering", "Product"],
    accountPassword: "p@ssw0rd123",
    apiKey: "api-key-12345",
    serviceLink: "https://service.example.com/1",
  },
  {
    id: 2,
    subnetName: "Marketing",
    accountName: "QuantumEcho99",
    userSubnets: ["Marketing", "Sales"],
    accountPassword: "securePass456",
    apiKey: "api-key-67890",
    serviceLink: "https://service.example.com/2",
  },
  {
    id: 3,
    subnetName: "Product",
    accountName: "NebulaFury_17",
    userSubnets: ["Product"],
    accountPassword: "nebulaPass789",
    apiKey: "api-key-11223",
    serviceLink: "https://service.example.com/3",
  },
  {
    id: 4,
    subnetName: "Management",
    accountName: "GlitchVortex",
    userSubnets: ["Management", "Support"],
    accountPassword: "glitchPass321",
    apiKey: "api-key-44556",
    serviceLink: "https://service.example.com/4",
  },
  {
    id: 5,
    subnetName: "Sales",
    accountName: "CyberNova77",
    userSubnets: ["Sales"],
    accountPassword: "novaSecurePass",
    apiKey: "api-key-77889",
    serviceLink: "https://service.example.com/5",
  },
  {
    id: 6,
    subnetName: "Support",
    accountName: "WarpDriveX",
    userSubnets: ["Support", "Other"],
    accountPassword: "warpSecretPass",
    apiKey: "api-key-99000",
    serviceLink: "https://service.example.com/6",
  },
  {
    id: 7,
    subnetName: "Other",
    accountName: "EtherPhantom",
    userSubnets: ["Other"],
    accountPassword: "etherShadow99",
    apiKey: "api-key-22334",
    serviceLink: "https://service.example.com/7",
  },
  {
    id: 8,
    subnetName: "Design",
    accountName: "PixelRaider_5",
    userSubnets: ["Design", "Marketing"],
    accountPassword: "pixelR4ider!",
    apiKey: "api-key-55667",
    serviceLink: "https://service.example.com/8",
  },
  {
    id: 9,
    subnetName: "Product",
    accountName: "MetaShadowX",
    userSubnets: ["Product", "Engineering"],
    accountPassword: "metaXpass789",
    apiKey: "api-key-88990",
    serviceLink: "https://service.example.com/9",
  },
  {
    id: 10,
    subnetName: "Engineering",
    accountName: "NanoGhost_13",
    userSubnets: ["Engineering"],
    accountPassword: "nanoGhostP@ss",
    apiKey: "api-key-11234",
    serviceLink: "https://service.example.com/10",
  },
  {
    id: 11,
    subnetName: "Management",
    accountName: "NanoGhost_14",
    userSubnets: ["Management"],
    accountPassword: "nanoGhostSecure",
    apiKey: "api-key-44567",
    serviceLink: "https://service.example.com/11",
  },
];

export async function GET() {
  return NextResponse.json(mockKeys, { status: 200 });
}
