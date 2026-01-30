# Movie Ticket Booking Application

A full-stack microservices application for booking movie tickets with user authentication, booking management, and payment processing.

## Architecture

### Services

1. **Auth Service** (Python Flask) - Port 5000
   - User registration with password hashing
   - Login with JWT authentication
   - Password reset functionality
   - Email validation

2. **Booking Service** (Node.js Express) - Port 6000
   - Movie listing
   - Booking creation and management
   - Seat selection

3. **Frontend** (React) - Port 3000
   - User registration and login
   - Protected routes
   - User profile dashboard
   - Booking interface
   - Payment processing

4. **Payment Service** (.NET) - Ready for implementation

## Features

✅ **Authentication**
- Secure password hashing with bcrypt
- JWT token-based authentication
- Token expiry (24 hours)
- Forgot password with reset links
- Email validation

✅ **Security**
- CORS enabled for microservices
- Input validation and sanitization
- Password minimum length requirement (6 characters)
- Secure password reset with time-limited tokens
- Environment variables for sensitive data

✅ **User Experience**
- Protected routes (only authenticated users)
- Persistent login with localStorage
- User profile display
- Error handling with user-friendly messages
- Responsive UI

✅ **Code Quality**
- Structured logging
- Error handling improvements
- Input validation
- Consistent error responses
- Environment configuration

## Setup

### Prerequisites
- Node.js 14+
- Python 3.8+
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/Saurabh-081/movie_tkt_booking.git
cd movie_tkt_booking
```

2. **Auth Service Setup**
```bash
cd auth-service-python
python -m venv venv

# Windows
venv\Scripts\activate
# macOS/Linux
source venv/bin/activate

pip install -r requirements.txt
python app.py
```

3. **Booking Service Setup**
```bash
cd booking-service-node
npm install
npm start
# or
node index.js
```

4. **Frontend Setup**
```bash
cd frontend-react
npm install
npm start
```

## Running the Application

All services should run simultaneously:

```bash
# Terminal 1 - Auth Service
cd auth-service-python
python app.py

# Terminal 2 - Booking Service
cd booking-service-node
node index.js

# Terminal 3 - Frontend
cd frontend-react
npm start
```

Then open http://localhost:3000 in your browser.

## API Endpoints

### Auth Service (http://localhost:5000)

- `POST /register` - Register new user
  ```json
  {
    "email": "user@example.com",
    "password": "password123"
  }
  ```

- `POST /login` - Login user
  ```json
  {
    "email": "user@example.com",
    "password": "password123"
  }
  ```

- `POST /forgot` - Request password reset
  ```json
  {
    "email": "user@example.com"
  }
  ```

- `POST /reset` - Reset password
  ```json
  {
    "token": "jwt_token",
    "password": "newpassword123"
  }
  ```

### Booking Service (http://localhost:6000)

- `GET /health` - Service health check
- `GET /movies` - List all movies
- `POST /bookings` - Create new booking
- `GET /bookings/:id` - Get booking details
- `GET /bookings?userEmail=email@example.com` - Get user bookings
- `PUT /bookings/:id` - Update booking
- `DELETE /bookings/:id` - Cancel booking

## Environment Variables

Create `.env` file in `auth-service-python`:

```
JWT_SECRET=your-super-secret-key-here
FLASK_ENV=production
```

## Validation & Error Handling

### Input Validation
- Email format validation
- Password minimum length (6 characters)
- Required field checks
- Token expiry validation

### Error Responses
- 400: Bad Request (invalid input)
- 401: Unauthorized (invalid credentials)
- 404: Not Found
- 500: Internal Server Error

## Security Best Practices Implemented

1. ✅ Password hashing with bcrypt
2. ✅ JWT tokens with expiry
3. ✅ CORS protection
4. ✅ Environment variables for secrets
5. ✅ Input sanitization (trim, lowercase)
6. ✅ Structured logging
7. ✅ Error message sanitization
8. ✅ Token validation

## Improvements Made (Professional Standards)

### Code Quality
- Added structured logging throughout
- Improved error handling with specific error types
- Input validation and sanitization
- Environment variable support
- Consistent error response format

### Security
- JWT token expiry (24 hours for login, 1 hour for reset)
- Secure password validation
- Email format validation
- Sensitive error messages (don't leak user info)

### Maintainability
- Clear code comments
- Consistent naming conventions
- Organized endpoint structure
- Professional error logging

## Testing

1. **Register a new user**
   - Visit http://localhost:3000
   - Fill registration form
   - Should see success message

2. **Login with correct credentials**
   - Email and password should be accepted
   - Should navigate to profile page

3. **Login with wrong password**
   - Should show error message
   - Should not login

4. **Forgot password flow**
   - Request reset link
   - Should receive reset link
   - Reset password successfully

5. **Protected routes**
   - Try accessing /booking without login
   - Should redirect to login page

## Deployment

### For Production

1. Change JWT_SECRET in environment variables
2. Update API URLs (remove localhost)
3. Enable HTTPS
4. Use production database (replace in-memory store)
5. Add rate limiting
6. Enable request logging
7. Add monitoring and alerting

## Future Enhancements

- [ ] Database integration (MongoDB)
- [ ] Email service for password reset
- [ ] Payment gateway integration
- [ ] Seat availability management
- [ ] Admin panel
- [ ] User profile management
- [ ] Booking history
- [ ] Reviews and ratings

## Troubleshooting

### Port already in use
```bash
# Find and kill process on port
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# macOS/Linux
lsof -i :5000
kill -9 <PID>
```

### JWT errors
- Clear browser localStorage and try again
- Check if JWT_SECRET is consistent

### CORS errors
- Ensure all services are running
- Check frontend API URLs

## License

MIT License

## Author

Saurabh Kurkute

## Repository

https://github.com/Saurabh-081/movie_tkt_booking.git
