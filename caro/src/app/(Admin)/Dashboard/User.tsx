"use client";

import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

interface UserData {
  _id: string;
  username: string;
  Email: string;
  PhoneNumber: string;
  Address: string;
  DrivingLicenseNumber: string;
}

const User = () => {
  const [users, setUsers] = useState<UserData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(
          "http://localhost:8000/api/users/fetchuser",
        );
        if (!response.ok) {
          throw new Error("Failed to load users");
        }
        const data = await response.json();
        setUsers(data);
      } catch (fetchError) {
        console.error(fetchError);
        setError("Unable to load user data.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return (
    <>
      <section className="p-3 bg-white w-[calc(100%-20px)] mt-3">
        <h2 className="text-3xl">Registered Users</h2>
        <main>
          {isLoading ? (
            <p>Loading users...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : (
            <table
              className="text-start w-full"
              style={{
                tableLayout: "fixed",
                borderSpacing: "0 8px",
                borderCollapse: "separate",
              }}
            >
              <thead>
                <tr className="text-left text-[20px] ">
                  <th className="text-left w-1/7 border-b-2 border-gray-200">
                    Name
                  </th>
                  <th className="text-left w-1/7 border-b-2 border-gray-200">
                    Email
                  </th>
                  <th className="text-left w-1/7 border-b-2 border-gray-200">
                    Phone Number
                  </th>
                  <th className="text-left w-1/7 border-b-2 border-gray-200">
                    Address
                  </th>
                  <th className="text-left w-1/7 border-b-2 border-gray-200">
                    Licence Number
                  </th>
                  <th className="text-left w-1/7 border-b-2 border-gray-200">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {users.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-6 text-center text-gray-500">
                      No users found.
                    </td>
                  </tr>
                ) : (
                  users.map((user) => (
                    <tr key={user._id} className="text-gray-500">
                      <td>{user.username}</td>
                      <td>{user.Email}</td>
                      <td>{user.PhoneNumber}</td>
                      <td>{user.Address}</td>
                      <td>{user.DrivingLicenseNumber}</td>
                      <td>
                        <Button className="bg-red-500 p-3 rounded-2xl text-white">
                          Block
                        </Button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          )}
        </main>
      </section>
    </>
  );
};

export default User;
