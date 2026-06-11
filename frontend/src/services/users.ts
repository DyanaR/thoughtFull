import type { User } from "../types";
const API_URL = import.meta.env.VITE_API_URL;

export async function getCurrentUser(token: string): Promise<User> {
  const response = await fetch(`${API_URL}/api/v1/users/me`, {
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
  const response = await fetch(`${API_URL}/api/v1/users/me`, {
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
