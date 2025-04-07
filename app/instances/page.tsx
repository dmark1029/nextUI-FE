"use client";
import axios from "axios";
import { useEffect, useState } from "react";

import { Instances } from "@/components/instances/data";
import InstanceTable from "@/components/instances/instances";

export default function InstancePage() {
  const [instances, setInstances] = useState<Instances[]>([]);

  useEffect(() => {
    fetchInstances();
  }, []);

  const fetchInstances = async () => {
    try {
      const response = await axios.get<Instances[]>(
        "http://localhost:3000/api/instances",
        // "http://localhost:8000/api/instances/",
      );

      setInstances(
        response.data.map((instance) => ({
          ...instance,
        })),
      );
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  return instances.length !== 0 ? (
    <div>
      <InstanceTable instances={instances} />
    </div>
  ) : (
    <div className="flex justify-center align-center mt-20">Loading...</div>
  );
}
