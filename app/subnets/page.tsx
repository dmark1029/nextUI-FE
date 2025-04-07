"use client";
import axios from "axios";
import { useEffect, useState } from "react";

import SubnetTable from "@/components/subnets/subnets";
import { Subnets } from "@/components/subnets/data";

export default function PricingPage() {
  const [users, setUsers] = useState<Subnets[]>([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get<Subnets[]>(
        "http://localhost:3000/api/subnets",
      );

      setUsers(
        response.data.map((user) => ({
          ...user,
          createdAt: new Date(user.createdAt),
        })),
      );
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  return users.length !== 0 ? (
    <div>
      <SubnetTable users={users} />
    </div>
  ) : (
    <div className="flex justify-center align-center mt-20">Loading...</div>
  );
}
