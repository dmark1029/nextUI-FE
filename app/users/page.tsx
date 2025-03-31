"use client";
import axios from "axios";
import { useEffect, useState } from "react";

import { Users } from "@/components/user/data";
import UserTable from "@/components/user/user";

export default function PricingPage() {
  const [users, setUsers] = useState<Users[]>([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    /* eslint-disable no-console */
    try {
      const response = await axios.get<Users[]>(
        "http://107.189.19.248:3000/api/users",
      );

      setUsers(
        response.data.map((user) => ({
          ...user,
          startDate: new Date(user.createdAt),
        })),
      );
    } catch (error) {
      console.error("Error fetching users:", error);
    }
    /* eslint-enable no-console */
  };

  return users.length !== 0 ? (
    <div>
      <UserTable users={users} />
    </div>
  ) : (
    <div className="flex justify-center align-center mt-20">Loading...</div>
  );
}
