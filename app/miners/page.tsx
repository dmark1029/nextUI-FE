"use client";
import axios from "axios";
import { useEffect, useState } from "react";

import { Miners } from "@/components/miners/data";
import MinerTable from "@/components/miners/miners";

export default function MinerPage() {
  const [miners, setMiners] = useState<Miners[]>([]);

  useEffect(() => {
    fetchMiners();
  }, []);

  const fetchMiners = async () => {
    try {
      const response = await axios.get<Miners[]>(
        "http://107.189.19.248:3000/api/miners",
        // "http://localhost:8000/api/miners/",
      );

      setMiners(
        response.data.map((miner) => ({
          ...miner,
        })),
      );
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  return miners.length !== 0 ? (
    <div>
      <MinerTable miners={miners} />
    </div>
  ) : (
    <div className="flex justify-center align-center mt-20">Loading...</div>
  );
}
