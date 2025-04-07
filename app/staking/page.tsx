"use client";
import axios from "axios";
import { useEffect, useState } from "react";

import { Staking } from "@/components/staking/data";
import StakingTable from "@/components/staking/staking";

export default function OpexPage() {
  const [stakingData, setStakingData] = useState<Staking[]>([]);

  useEffect(() => {
    fetchStakingData();
  }, []);

  const fetchStakingData = async () => {
    try {
      const response = await axios.get<Staking[]>(
        "http://localhost:3000/api/staking",
      );

      setStakingData(
        response.data.map((opex) => ({
          ...opex,
        })),
      );
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  return stakingData.length !== 0 ? (
    <div>
      <StakingTable stakingData={stakingData} />
    </div>
  ) : (
    <div className="flex justify-center align-center mt-20">Loading...</div>
  );
}
