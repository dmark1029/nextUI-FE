"use client";
import axios from "axios";
import { useEffect, useState } from "react";

import { Opex } from "@/components/opex/data";
import OpexTable from "@/components/opex/opex";

export default function OpexPage() {
  const [opexData, setOpexData] = useState<Opex[]>([]);

  useEffect(() => {
    fetchOpexData();
  }, []);

  const fetchOpexData = async () => {
    try {
      const response = await axios.get<Opex[]>(
        "http://localhost:3000/api/opex",
      );

      setOpexData(
        response.data.map((opex) => ({
          ...opex,
        })),
      );
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  return opexData.length !== 0 ? (
    <div>
      <OpexTable opexData={opexData} />
    </div>
  ) : (
    <div className="flex justify-center align-center mt-20">Loading...</div>
  );
}
