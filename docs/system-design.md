# System Design

## Tech Stack

- Frontend: React (component-based UI, easy state management)
- Backend: Spring Boot (strong REST support, scalable)
- Database: PostgreSQL (relational, structured data)
- Authentication: Auth0 (secure, offloads auth complexity)

---

## Key Design Decisions

### Auth0 for Authentication

Authentication is handled externally using Auth0 to avoid storing credentials and to improve security. The backend does not implement a `POST /users` endpoint and does not directly create user accounts through client requests.

#### Reasoning

Auth0 is responsible for:

- User sign-up and logins
- Credential storage (email, password)
- Identity verification
- Issuing JWT tokens

Because of this, the backend does not need to duplicate user creation logic.

---

#### Flow

1. User clicks "Sign Up" or "Log In" in the frontend
2. Frontend uses Auth0 SDK to authenticate the user
3. Auth0 returns a JWT token to the frontend
4. Frontend sends a request to the backend:
5. Backend:

- Extracts `auth0Id` from the JWT
- Checks if the user exists in the database
- If not, creates a new user record using token data (e.g., name)
- Returns the user

---

#### Why No `POST /users` Endpoint

A `POST /users` endpoint is intentionally omitted because:

- Auth0 already creates and manages user accounts
- The backend should not trust client-provided identity data
- Prevents duplication of authentication logic
- Simplifies API design
- Reduces security risks (e.g., spoofing `auth0Id`)

---

#### Business Logic Placement

User creation logic still exists, but is handled internally within:

This follows a "get-or-create" pattern:

- If user exists → return user
- If user does not exist → create user → return user

---

#### Design Principle

> Authentication is handled externally (Auth0), while the backend only stores and manages application-specific user data.

---

#### Benefits

- Cleaner architecture
- Improved security
- Reduced backend complexity
- Better separation of concerns
- Easier scalability

### No POST /users Endpoint

Users are created automatically on first authenticated request to simplify the flow and avoid duplication with Auth0.

### REST API Design

Endpoints follow REST conventions using resource-based routing.

### UUIDs for IDs

UUIDs are used instead of integers for better scalability and security.

### Separate Moods Table

A normalized schema is used to support many-to-many relationships between entries and moods.

---

## System Architecture

Frontend (React)
↓
Backend (Spring Boot Controllers)
↓
Service Layer (Business Logic)
↓
Repository Layer (JPA)
↓
Database (PostgreSQL)

---

## Example Flow: Creating an Entry

1. User records or types journal entry
2. Frontend sends POST /entries
3. Backend:
   - extracts user from Auth0 token
   - creates entry
   - saves to database
4. Response returned with entry ID

---

## Future Improvements

- AI mood detection
- Mobile app (React Native)
- Real-time updates
- Entry search and filtering
