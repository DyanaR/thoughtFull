import type {
  User,
  Entry,
  CreateEntryRequest,
  UpdateEntryRequest,
} from "../types";

// Get current user logged in
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

// Get All User's Entries
export async function getCurrentEntries(token: string): Promise<Entry[]> {
  const response = await fetch("http://localhost:8080/api/v1/entries", {
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
  const response = await fetch("http://localhost:8080/api/v1/entries", {
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
  const response = await fetch(
    `http://localhost:8080/api/v1/entries/${entryId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

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
  const response = await fetch(
    `http://localhost:8080/api/v1/entries/${entryId}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(request),
    },
  );

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
  const response = await fetch(
    `http://localhost:8080/api/v1/entries/${entryId}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  if (!response.ok) {
    throw new Error(`Failed to delete entry. Status: ${response.status}`);
  }
}
