# # Requirements

## Overview

The ThoughtFull database is designed to support secure, scalable journal entry storage for authenticated users. Authentication is handled externally by Auth0. The database stores application-specific user information and journal entries, along with optional mood associations.

Relationships:

- A user can have many journal entries.
- A journal entry can have multiple moods.
- A mood can belong to multiple journal entries.
- A join table is used to support the many-to-many - relationship between entries and moods.

---

## Tables

### users

Stores application-specific user information derived from Auth0 authentication.

| Column Name | Type         | Constraints      | Description                     |
| ----------- | ------------ | ---------------- | ------------------------------- |
| id          | UUID         | PRIMARY KEY      | Internal user identifier        |
| auth0_id    | VARCHAR(255) | UNIQUE, NOT NULL | Auth0 user identifier           |
| name        | VARCHAR(255) | NOT NULL         | User display name               |
| created_at  | TIMESTAMP    | NOT NULL         | Timestamp when user was created |

**Notes:**

- The `auth0_id` links this record to the Auth0 authenticated user.
- Email and password are NOT stored in this database.
- Auth0 fully manages authentication credentials.

---

### entries

Stores journal entries created by users.

| Column Name | Type         | Constraints                       | Description                |
| ----------- | ------------ | --------------------------------- | -------------------------- |
| id          | UUID         | PRIMARY KEY                       | Journal entry identifier   |
| user_id     | UUID         | FOREIGN KEY → users(id), NOT NULL | Owner of the journal entry |
| title       | VARCHAR(255) | NOT NULL                          | Entry title                |
| content     | TEXT         | NOT NULL                          | Journal entry text content |
| created_at  | TIMESTAMP    | NOT NULL                          | Entry creation timestamp   |
| updated_at  | TIMESTAMP    | NOT NULL                          | Last update timestamp      |

**Relationships:**

- Many entries belong to one user.

---

### moods

Stores available moods that can be associated with journal entries.

| Column Name | Type         | Constraints      | Description                        |
| ----------- | ------------ | ---------------- | ---------------------------------- |
| id          | UUID         | PRIMARY KEY      | Mood identifier                    |
| name        | VARCHAR(100) | UNIQUE, NOT NULL | Mood name (e.g., calm, happy)      |
| color       | VARCHAR(20)  | NULL             | Optional color code for UI display |

**Notes:**

- This table allows moods to be reused across entries.
- Enables future analytics and filtering.

---

Stores available moods that can be associated with journal entries.

| Column Name | Type         | Constraints      | Description                        |
| ----------- | ------------ | ---------------- | ---------------------------------- |
| id          | UUID         | PRIMARY KEY      | Mood identifier                    |
| name        | VARCHAR(100) | UNIQUE, NOT NULL | Mood name (e.g., calm, happy)      |
| color       | VARCHAR(20)  | NULL             | Optional color code for UI display |

**Notes:**

- This table allows moods to be reused across entries.
- Enables future analytics and filtering.

**Primary Key:\***
(entry_id, mood_id)

**Purpose:**

- Supports many-to-many relationship between entries and moods.

---

## Relationships Diagram (Conceptual)

users
└── entries
└── entry_moods
└── moods

---

## Data Ownership and Security

- Users can only access entries associated with their own `user_id`.
- `user_id` is derived securely from the Auth0 token.
- The frontend never sends or controls `user_id` directly.
- All ownership enforcement occurs in the backend.

---

## Future Extensibility

This schema supports future features including:

- Mood analytics
- Mood trends over time
- Mood-based filtering
- Soft deletion (if introduced later)
- AI mood classification
- Mobile application support
