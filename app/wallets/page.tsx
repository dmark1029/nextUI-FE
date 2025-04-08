"use client";
import axios from "axios";
import { useEffect, useState } from "react";

import { Wallets } from "@/components/wallets/data";
import WalletTable from "@/components/wallets/wallets";

export default function WalletPage() {
  const [wallets, setWallets] = useState<Wallets[]>([]);

  useEffect(() => {
    fetchWallets();
  }, []);

  const fetchWallets = async () => {
    try {
      const response = await axios.get<Wallets[]>(
        "http://107.189.19.248:3000/api/wallets",
      );

      setWallets(
        response.data.map((wallet) => ({
          ...wallet,
        })),
      );
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  return wallets.length !== 0 ? (
    <div>
      <WalletTable wallets={wallets} />
    </div>
  ) : (
    <div className="flex justify-center align-center mt-20">Loading...</div>
  );
}
