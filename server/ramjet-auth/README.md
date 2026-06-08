# Ramjet-auth

Authentication service for the Ramjet platform. Provides user registration, login, profile management, and account deletion with JWT-based session handling.

---

## API Reference

### Base URL
    http://localhost:5140

### Authentication
All protected endpoints require a session token in the request body (see /auth/profile).

---

## Endpoints

### POST /auth/login
Authenticates an existing user and returns a session token.

**Request Body:**
```json
    {
      "email": "johndoe@gmail.com",
      "password": "givebread123"
    }
```
**Response (200 OK):**
```json
    {
      "message": "Login is successful",
      "status_code": 200,
      "token": "eyJhbGciOiJIUzI1NiIs..."
    }
```
**Error Response (401 Unauthorized):**
```json
    {
      "message": "Invalid credentials",
      "status_code": 401,
      "token": null
    }
 ```   

---

### POST /auth/register
Registers a new user account.

**Request Body:**
```json
    {
      "email": "johndoe@gmail.com",
      "password": "givebread123",
      "name": "John Doe"
    }
```
**Response (201 Created):**
```json
    {
      "message": "Registration successful",
      "status_code": 201,
      "token": "eyJhbGciOiJIUzI1NiIs..."
    }
```

**Error Response (401 Conflict):**
```json
    {
      "message": "Email or name is already taken",
      "status_code": 401,
      "token": null
    }
```
---

### POST /auth/update
Updates user profile information. Only provided fields are updated.

**Request Body:**
```json
    {
      "id": 12345,
      "email": "newemail@gmail.com",
      "name": "New Name"
    }
```

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| id | u32 | Yes | User identifier |
| email | string | No | New email address |
| name | string | No | New display name |

**Response (200 OK):**
```json
    {
      "message": "Data updated successfully",
      "status_code": 200,
      "user": {
        "id": 1234,
        "name": "john doe",
        "email": "johndoe@gmail.com",
        "password": "#randomhash",
        "created_at": "2024-01-15T10:30:00Z",
        "updated_at": "2024-06-06T20:32:00Z",
        "role": "normal"
      },
      "updated": "email,name"
    }
```
**Error Response (401 Conflict):**
```json
    {
      "message": "Email or name is already taken",
      "status_code": 401,
      "user": null,
      "updated": null
    }
```
---

### POST /auth/delete
Permanently deletes a user account.

**Request Body:**
```json
    {
      "id": 12345
    }
```

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| id | u32 | Yes | User identifier |

**Response (200 OK):**
```json
    {
      "message": "Deleted data successfully",
      "status_code": 200,
      "updated": "Deleted data successfully"
    }
```
---

### POST /auth/profile
Retrieves the authenticated user's profile data.

**Request Body:**
```json
    {
      "token": "eyJhbGciOiJIUzI1NiIs..."
    }
```

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| token | string | Yes | Valid session token |

**Response (200 OK):**
```json
    {
      "id": 1234,
      "name": "john doe",
      "email": "johndoe@gmail.com",
      "password": "#randomhash",
      "created_at": "2024-01-15T10:30:00Z",
      "updated_at": "2024-06-06T20:32:00Z",
      "role": "normal"
    }
```
---

## Data Models

### User

  ```rust
    use serde::{Serialize, Deserialize};

    /// Core user model representing a registered account
    #[derive(Serialize, Deserialize, Debug, Clone)]
    pub struct User {
        pub id: u32,
        pub email: String,
        pub name: String,
        pub password: String,
        pub role: String,
        pub created_at: String,
        pub updated_at: String,
    }
 ```
### Request Types

 ```rust  
    #[derive(Serialize, Deserialize, Debug, Clone)]
    pub struct UserLoginRequest {
        pub email: String,
        pub password: String,
    }

    /// Payload for user registration requests
    #[derive(Serialize, Deserialize, Debug, Clone)]
    pub struct UserRegisterRequest {
        pub email: String,
        pub name: String,
        pub password: String,
    }

    /// Payload for updating user profile information
    #[derive(Serialize, Deserialize, Debug, Clone)]
    pub struct UserUpdateRequest {
        pub email: Option&lt;String&gt;,
        pub name: Option&lt;String&gt;,
        pub id: u32,
    }

    /// Payload for profile retrieval requests
    #[derive(Serialize, Deserialize, Debug, Clone)]
    pub struct UserProfileRequest {
        pub token: String,
    }
```
### Response Types
```rust
    /// Response returned after successful login or registration
    #[derive(Serialize, Deserialize, Debug, Clone)]
    pub struct UserLoginResponse {
        pub message: String,
        pub status_code: u16,
        pub token: String,
    }

    /// Response returned after a profile update operation
    #[derive(Serialize, Deserialize, Debug, Clone)]
    pub struct UserUpdateResponse {
        pub message: String,
        pub status_code: u16,
        pub user: Option&lt;User&gt;,
        pub updated: String,
    }
```
---

## Status Codes

| Code | Meaning | Context |
|------|---------|---------|
| 200 | OK | Successful login, update, delete, or profile fetch |
| 201 | Created | Successful registration |
| 401 | Unauthorized | Invalid credentials, duplicate email/name, or missing token |

---

## Tech Stack

- **Language:** Rust
- **Serialization:** serde with JSON support
- **Authentication:** JWT tokens

---

## License

MIT
