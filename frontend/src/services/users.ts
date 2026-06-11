import type { User } from "../types";

export async function getCurrentUser(token: string): Promise<User> {
  const response = await fetch("http://localhost:8080/api/v1/users/me", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch current user");
  }

  return response.json();
}

export async function updateCurrentUser(token: string, data: { name: string }) {
  const response = await fetch("http://localhost:8080/api/v1/users/me", {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Failed to update user");
  }

  return response.json();
}
