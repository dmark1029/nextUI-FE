"use client";
import axios from "axios";
import { useEffect, useState } from "react";

import { Users } from "@/components/user/data";
import Component from "@/components/user/user";

export default function PricingPage() {
  const [users, setUsers] = useState<Users[]>([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get<Users[]>(
        "http://localhost:3000/api/users",
      );

      console.log("dasta:", response.data);
      setUsers(
        response.data.map((user) => ({
          ...user,
          startDate: new Date(user.createdAt),
        })),
      );
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  if (users.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Component users={users} />
    </div>
  );
}
