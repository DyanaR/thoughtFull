// Shared frontend types
// Defines the shape of data returned by the API so all components
// use the same source of truth, get autocomplete, and catch type
// errors at compile time instead of runtime

export type User = {
  id: string;
  name: string;
};

export type Entry = {
  id: string;
  title: string;
  content: string;
  moods: string[];
  createdAt: string;
  updatedAt: string;
};

export type CreateEntryRequest = {
  title: string;
  content: string;
  moodIds?: string[];
};

export type UpdateEntryRequest = {
  title?: string;
  content?: string;
  moodIds?: string[];
};
