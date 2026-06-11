import type { Entry, CreateEntryRequest, UpdateEntryRequest } from "../types";
const API_URL = import.meta.env.VITE_API_URL;

// Get All User's Entries
export async function getCurrentEntries(token: string): Promise<Entry[]> {
  const response = await fetch(`${API_URL}/api/v1/entries`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    throw new Error("Failed to fetch entries");
  }
  return response.json();
}

// Create Journal Entry
export async function createEntry(
  token: string,
  request: CreateEntryRequest,
): Promise<Entry> {
  const response = await fetch(`${API_URL}/api/v1/entries`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(request),
  });

  if (!response.ok) {
    throw new Error(
      `Failed to create journal entry. Status: ${response.status}`,
    );
  }

  return response.json();
}

// Get a Entry by ID
export async function getEntryById(
  token: string,
  entryId: string,
): Promise<Entry> {
  const response = await fetch(`${API_URL}/api/v1/entries/${entryId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch entry. Status: ${response.status}`);
  }

  return response.json();
}

// Update an Entry by ID
export async function updateEntry(
  token: string,
  entryId: string,
  request: UpdateEntryRequest,
): Promise<Entry> {
  const response = await fetch(`${API_URL}/api/v1/entries/${entryId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(request),
  });

  if (!response.ok) {
    throw new Error(`Failed to update entry. Status: ${response.status}`);
  }

  return response.json();
}

// Delete an Entry by ID
export async function deleteEntry(
  token: string,
  entryId: string,
): Promise<void> {
  const response = await fetch(`${API_URL}/api/v1/entries/${entryId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to delete entry. Status: ${response.status}`);
  }
}
