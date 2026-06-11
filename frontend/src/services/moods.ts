import type { Mood } from "../types";

export async function getMoods(token: string): Promise<Mood[]> {
  const response = await fetch(`http://localhost:8080/api/v1/moods`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch moods. Status: ${response.status}`);
  }

  return response.json();
}
