"use client";
import axios from "axios";
import { useEffect, useState } from "react";

import KeyTable from "@/components/keys/keys";
import { Keys } from "@/components/keys/data";

export default function PricingPage() {
  const [keys, setKeys] = useState<Keys[]>([]);

  useEffect(() => {
    fetchKeys();
  }, []);

  const fetchKeys = async () => {
    try {
      const response = await axios.get<Keys[]>(
        "http://107.189.19.248:3000/api/keys",
      );

      setKeys(
        response.data.map((key) => ({
          ...key,
        })),
      );
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  return keys.length !== 0 ? (
    <div>
      <KeyTable keys={keys} />
    </div>
  ) : (
    <div className="flex justify-center align-center mt-20">Loading...</div>
  );
}
