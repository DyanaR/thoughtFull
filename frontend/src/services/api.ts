export async function getCurrentUser(token: string) {
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
export async function getCurrentEntries(token: string) {
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

type CreateEntryRequest = {
  title: string;
  content: string;
  moodIds?: string[];
};

export async function createEntry(token: string, request: CreateEntryRequest) {
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
export async function getEntryById(token: string, entryId: string) {
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

// Edit an Entry by ID
type UpdateEntryRequest = {
  title?: string;
  content?: string;
  moodIds?: string[];
};

export async function updateEntry(
  token: string,
  entryId: string,
  request: UpdateEntryRequest,
) {
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
export async function deleteEntry(token: string, entryId: string) {
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
