# MSME Web Application

A full-stack web application for MSMEs (Micro, Small & Medium Enterprises) with secure JWT authentication.

## Project Structure

```
.
├── backend/          # JWT Demo Application
└── frontend/         # MSME Webpage
```

## Frontend (MSME Webpage)

### Features
- Modern responsive design
- Interactive UI components
- MSME-focused content sections
- Contact forms
- Services showcase

### Tech Stack
- HTML5
- CSS3
- JavaScript
- Bootstrap
- jQuery

### Setup Instructions
1. Navigate to the frontend directory
```bash
cd frontend
```
2. Open `index.html` in your web browser

## Backend (JWT Demo)

### Prerequisites
- MongoDB running on localhost:27017
- Java 11 or higher
- Maven
- Postman

### Setup Instructions

1. Start MongoDB
```bash
mongod
```

2. Start the application
```bash
cd backend
mvn spring-boot:run
```

3. Import the Postman collection
- Open Postman
- Click on "Import"
- Select the `postman_collection.json` file

### API Endpoints

#### Auth
- POST /api/auth/register - Register new user
- POST /api/auth/login - Login user
- POST /api/auth/refresh - Refresh access token

#### Users
- GET /api/users/profile - Get user profile
- PUT /api/users/profile - Update user profile

#### Projects
- GET /api/projects - Get all projects
- POST /api/projects - Create new project
- GET /api/projects/{id} - Get project by ID
- PUT /api/projects/{id} - Update project
- DELETE /api/projects/{id} - Delete project

### Testing Tips
1. Always check response status codes
2. Verify response body matches expected format
3. Test both valid and invalid inputs
4. For protected endpoints, try accessing without a token
5. Test token expiration and refresh flow

### Common Issues & Troubleshooting
1. 401 errors indicate expired tokens - use login endpoint for new token
2. Verify MongoDB is running on port 27017
3. Check email configuration in application.properties

## Integration Instructions

1. Configure frontend API calls to use the backend endpoints
2. Update CORS settings in backend to allow frontend origin
3. Set up environment variables for API URLs

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
