import type { Mood } from "../types";
const API_URL = import.meta.env.VITE_API_URL;

export async function getMoods(token: string): Promise<Mood[]> {
  const response = await fetch(`${API_URL}/api/v1/moods`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch moods. Status: ${response.status}`);
  }

  return response.json();
}
