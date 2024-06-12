# Cloud Function

Serve as backend function for app to us

## Data Model

- User
  - SubCollection: Captured Point
- Point

## End Point

### User Endpoints

1. **Get All Users**
   - `GET /users`
2. **Get a Specific User**
   - `GET /users/{userId}`
3. **Create a New User**
   - `POST /users`
4. **Update a User**
   - `PUT /users/{userId}`
5. **Delete a User**
   - `DELETE /users/{userId}`

### Point Endpoints

1. **Get All Points**
   - `GET /points`
2. **Get a Specific Point**
   - `GET /points/{pointId}`
3. **Create a New Point**
   - `POST /points`
4. **Update a Point**
   - `PUT /points/{pointId}`
5. **Delete a Point**
   - `DELETE /points/{pointId}`
6. **Get Points Captured by a Specific User**
   - `GET /users/{userId}/points`
7. **Clear the User from a Point**
   - `POST /points/{pointId}/clear`

### Capture and Upgrade Endpoints

1. **Capture a Point**
   - `POST /users/{userId}/points/{pointId}/capture`
2. **Upgrade a Point**
   - `POST /users/{userId}/points/{pointId}/upgrade`

### History Endpoints

1. **Get Capture History of a User**
   - `GET /users/{userId}/capture-history`
2. **Get Capture History of a Point**
   - `GET /points/{pointId}/capture-history`

### Other

1. **Get User Ranking**
   - `GET /users/ranking`
