# API Contracts

## Authentication

- Authentication is handled by Auth0
- All protected endpoints require a valid Auth0 JWT
- The backend derives the authenticated user from the token (auth0Id)
- The frontend never sends user IDs

---

## User Endpoints

### GET /api/v1/users/me

Returns the currently authenticated user.
If the user does not yet exist in the database, the backend creates the user automatically using data derived from the Auth0 token.

- URL Params
  None

- Data Params
  None

- Headers

```http
Authorization: Bearer <JWT>
Content-Type: application/json
```

- Success Response:
- Code: 200
  Content:

```json
{
  "id": "u123",
  "name": "Jason"
}
```

- Error Response:
  - Code: 401
    Content:

    ```json
    {
      "error": {
        "code": "UNAUTHORIZED",
        "message": "Authentication required."
      }
    }
    ```

  - Code: 500
    Content:
    ```json
    {
      "error": {
        "code": "SERVER_ERROR",
        "message": "An unexpected error occurred."
      }
    }
    ```

## Journal Entry Endpoints

### POST /api/v1/entries

Creates a new journal entry for the authenticated user.

- URL Params
  None

- Data Params

  ```json
  {
    "title": "Untitled",
    "content": "Today I felt calm.",
    "moodIds": [
      "5bb3b181-...."
    ],
  }
  ```

- Headers

```http
Authorization: Bearer <JWT>
Content-Type: application/json
```

- Success Response:
- Code: 201
  Content:

```json
{
  "id": "e123",
  "title": "Untitled",
  "content": "Today I felt calm.",
  "moods": ["calm"],
  "createdAt": "2024-06-12T21:00:00Z",
  "updatedAt": "2024-06-12T21:00:00Z"
}
```

- Error Response:
  - Code: 401
    Content:

    ```json
    {
      "error": {
        "code": "UNAUTHORIZED",
        "message": "Authentication required."
      }
    }
    ```

  - Code: 400
    Content:

    ```json
    {
      "error": {
        "code": "INVALID_REQUEST",
        "message": "Invalid entry data."
      }
    }
    ```

  - Code: 500
    Content:
    ```json
    {
      "error": {
        "code": "SERVER_ERROR",
        "message": "An unexpected error occurred."
      }
    }
    ```

### GET /api/v1/entries

Returns a list of the user’s journal entries (preview format).
Entries are returned in most-recent-first order.

- URL Params
  None

- Data Params
  None

- Headers

```http
Authorization: Bearer <JWT>
Content-Type: application/json
```

- Success Response:
- Code: 200
  Content:

```json
[
  {
    "id": "e123",
    "title": "Untitled",
    "content": "Today I felt calm.",
    "moods": ["calm"],
    "createdAt": "2024-06-12T21:00:00Z"
  },
  {
    "id": "e124",
    "title": "Reflection",
    "content": "Today I felt calm.",
    "moods": ["happy"],
    "createdAt": "2024-06-11T18:30:00Z"
  }
]
```

- Error Response:
  - Code: 401
    Content:

    ```json
    {
      "error": {
        "code": "UNAUTHORIZED",
        "message": "Authentication required."
      }
    }
    ```

  - Code: 500
    Content:
    ```json
    {
      "error": {
        "code": "SERVER_ERROR",
        "message": "An unexpected error occurred."
      }
    }
    ```

### GET /api/v1/entries/{id}

Returns a single, full journal entry.

- URL Params
  id (string, required): Journal entry ID

- Data Params
  None

- Headers

```http
Authorization: Bearer <JWT>
Content-Type: application/json
```

- Success Response:
- Code: 200
  Content:

```json
{
  "id": "e123",
  "title": "Untitled",
  "content": "Today I felt calm.",
  "moods": ["calm"],
  "createdAt": "2024-06-12T21:00:00Z",
  "updatedAt": "2024-06-12T21:00:00Z"
}
```

- Error Response:
  - Code: 401
    Content:

    ```json
    {
      "error": {
        "code": "UNAUTHORIZED",
        "message": "Authentication required."
      }
    }
    ```

  - Code: 404
    Content:

    ```json
    {
      "error": {
        "code": "ENTRY_NOT_FOUND",
        "message": "Entry not found."
      }
    }
    ```

  - Code: 500
    Content:
    ```json
    {
      "error": {
        "code": "SERVER_ERROR",
        "message": "An unexpected error occurred."
      }
    }
    ```

### PATCH /api/v1/entries/{id}

Updates a journal entry.
Only changed fields should be sent.

- URL Params
  id (string, required): Journal entry ID

- Data Params
  Update title

  ```json
  {
    "title": "Full day Hike"
  }
  ```

  Update content

  ```json
  {
    "content": "Updated journal text."
  }
  ```

  Update moods

  ```json
  {
    "moodIds": [
      "5bb3b181-....",
      "7da922bd-...."
    ]
  }
  ```

- Headers

```http
Authorization: Bearer <JWT>
Content-Type: application/json
```

- Success Response:
- Code: 200
  Content:

```json
{
  "id": "e123",
  "title": "Full day Hike",
  "content": "Updated journal text.",
  "moods": ["calm", "happy"],
  "createdAt": "2024-06-12T21:00:00Z",
  "updatedAt": "2024-06-13T10:15:00Z"
}
```

- Error Response:
  - Code: 400
    Content:

    ```json
    {
      "error": {
        "code": "INVALID_REQUEST",
        "message": "Invalid update data."
      }
    }
    ```

  - Code: 401
    Content:

    ```json
    {
      "error": {
        "code": "UNAUTHORIZED",
        "message": "Authentication required."
      }
    }
    ```

  - Code: 404
    Content:

    ```json
    {
      "error": {
        "code": "ENTRY_NOT_FOUND",
        "message": "Entry not found."
      }
    }
    ```

  - Code: 500
    Content:
    ```json
    {
      "error": {
        "code": "SERVER_ERROR",
        "message": "An unexpected error occurred."
      }
    }
    ```

### DELETE /api/v1/entries/{id}

Permanently deletes a journal entry.

- URL Params
  id (string, required): Journal entry ID

- Data Params
  None

- Headers

```http
Authorization: Bearer <JWT>
```

- Success Response:
- Code: 204
  Content: None

- Error Response:
  - Code: 401
    Content:

    ```json
    {
      "error": {
        "code": "UNAUTHORIZED",
        "message": "Authentication required."
      }
    }
    ```

  - Code: 404
    Content:

    ```json
    {
      "error": {
        "code": "ENTRY_NOT_FOUND",
        "message": "Entry not found."
      }
    }
    ```

  - Code: 500
    Content:
    ```json
    {
      "error": {
        "code": "SERVER_ERROR",
        "message": "An unexpected error occurred."
      }
    }
    ```
