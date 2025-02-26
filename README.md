# JWT Demo Application Testing Guide

## Prerequisites
1. MongoDB running on localhost:27017
2. Java 11 or higher
3. Maven
4. Postman

## Setup Instructions

1. Start MongoDB
```bash
mongod
```

2. Start the application
```bash
mvn spring-boot:run
```

3. Import the Postman collection
- Open Postman
- Click on "Import"
- Select the `postman_collection.json` file from this directory

## Testing Flow

1. **Register a new user**
   - Use the "Register User" request
   - Fill in the required user details
   - Send the request

2. **Login**
   - Use the "Login" request with the registered credentials
   - Copy the access token from the response
   - In Postman, set the environment variable `access_token` with the copied token

3. **Test Protected Endpoints**
   - All other endpoints require the access token
   - The token is automatically included in the requests through the `{{access_token}}` variable

## Available Endpoints

### Auth
- POST /api/auth/register - Register new user
- POST /api/auth/login - Login user
- POST /api/auth/refresh - Refresh access token

### Users
- GET /api/users/profile - Get user profile
- PUT /api/users/profile - Update user profile

### Projects
- GET /api/projects - Get all projects
- POST /api/projects - Create new project
- GET /api/projects/{id} - Get project by ID
- PUT /api/projects/{id} - Update project
- DELETE /api/projects/{id} - Delete project

## Testing Tips
1. Always check the response status codes
2. Verify the response body matches the expected format
3. Test both valid and invalid inputs
4. For protected endpoints, try accessing without a token to verify security
5. Test token expiration and refresh flow

## Common Issues
1. If you get a 401 error, your token might have expired. Use the login endpoint to get a new token
2. If MongoDB connection fails, ensure MongoDB is running on port 27017
3. For email-related features, ensure the email configuration is correct in application.properties
