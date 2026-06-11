# API TESTING

## 1. Setup

Base URL: http://localhost:8080
Auth: Auth0 JWT (Bearer token)

---

## 2. How to get token

```bash
POST https://<your-domain>.us.auth0.com/oauth/token
```

Body:

```json
{
  "client_id": "...",
  "client_secret": "...",
  "audience": "https://thoughtfull-api",
  "grant_type": "client_credentials"
}
```

---

## 3. Example requests

### Get current user (or creates user if does NOT exist)

```bash
GET /api/v1/users/me
Authorization: Bearer <token>
```

Response

```json
{
  "id": "...",
  "name": "User"
}
```

### Important Note: Token Renewal Notes

Auth0 access tokens expire, so a `401 Unauthorized` response in Postman may mean the token is old or invalid.

To renew the token, send the Auth0 token request again:

```bash
POST https://<auth0-domain>/oauth/token
```

---

### Create entry

```bash
POST /api/v1/entries
Authorization: Bearer <token>
Content-Type: application/json
```

```json
{
  "title": "Test Entry",
  "content": "This is a test"
}
```

---

### Get entries

```bash
GET /api/v1/entries
Authorization: Bearer <token>
```

---

## 4. Notes / Observations

- User is auto-created on first request
- Name defaults to "User" for machine tokens
- All endpoints require JWT (401 if missing)
