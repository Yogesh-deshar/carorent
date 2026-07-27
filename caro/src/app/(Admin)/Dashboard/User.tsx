"use client";

import { Button } from "@/components/ui/button";
import { useCallback, useEffect, useState } from "react";

interface UserData {
  _id: string;
  username: string;
  Email: string;
  PhoneNumber: string;
  Address: string;
  DrivingLicenseNumber: string;
}

const mergeUsers = (left: UserData[], right: UserData[]) => {
  const merged: UserData[] = [];
  let leftIndex = 0;
  let rightIndex = 0;

  while (leftIndex < left.length && rightIndex < right.length) {
    const leftName = left[leftIndex].username.toLowerCase();
    const rightName = right[rightIndex].username.toLowerCase();

    if (leftName <= rightName) {
      merged.push(left[leftIndex]);
      leftIndex++;
    } else {
      merged.push(right[rightIndex]);
      rightIndex++;
    }
  }

  return merged.concat(left.slice(leftIndex)).concat(right.slice(rightIndex));
};

const mergeSortUsers = (users: UserData[]): UserData[] => {
  if (users.length <= 1) {
    return users;
  }

  const middle = Math.floor(users.length / 2);
  const left = mergeSortUsers(users.slice(0, middle));
  const right = mergeSortUsers(users.slice(middle));

  return mergeUsers(left, right);
};

const User = () => {
  const [users, setUsers] = useState<UserData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const fetchUsers = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        "http://localhost:8000/api/users/fetchuser",
      );

      if (!response.ok) {
        throw new Error("Failed to load users");
      }

      const data = (await response.json()) as UserData[];
      setUsers(mergeSortUsers(data));
    } catch (fetchError) {
      console.error(fetchError);
      setError("Unable to load user data.");
      setUsers([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleDelete = async (userId: string, username: string) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete ${username}?`,
    );

    if (!confirmed) {
      return;
    }

    setDeletingId(userId);
    setError(null);

    try {
      const response = await fetch(
        `http://localhost:8000/api/users/delete/${userId}`,
        { method: "DELETE" },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to delete user");
      }

      setUsers((currentUsers) =>
        mergeSortUsers(currentUsers.filter((user) => user._id !== userId)),
      );
    } catch (deleteError) {
      console.error(deleteError);
      setError(
        deleteError instanceof Error
          ? deleteError.message
          : "Unable to delete user.",
      );
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <section className="p-3 bg-white w-[calc(100%-20px)] mt-3">
      <h2 className="text-3xl">Registered Users</h2>
      <p className="text-sm text-gray-500 mt-1">
        Sorted alphabetically by name using merge sort.
      </p>

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
              <tr className="text-left text-[20px]">
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
                      <Button
                        className="bg-red-500 p-3 rounded-2xl text-white hover:bg-red-600"
                        disabled={deletingId === user._id}
                        onClick={() => handleDelete(user._id, user.username)}
                      >
                        {deletingId === user._id ? "Deleting..." : "Delete"}
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
  );
};

export default User;
