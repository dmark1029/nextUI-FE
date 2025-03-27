"use client";
import { Users } from "@/components/user/data";
import UserTable from "@/components/user/user";
import axios from "axios";
import { useEffect, useState } from "react";

export default function PricingPage() {
  const [users, setUsers] = useState<Users[]>([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get<Users[]>("http://localhost:3000/api/users");
      console.log("dasta:", response.data);
      setUsers(
        response.data.map((user) => ({
          ...user,
          startDate: new Date(user.createdAt),
        }))
      );
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  return (
    users.length !== 0 ? (
      <div>
        <UserTable users={users} />
      </div>
    ) : (
      <div className="flex justify-center align-center mt-20">Loading...</div>
    )
  );
}
