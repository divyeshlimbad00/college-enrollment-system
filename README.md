# College Enrollment System API

A minimal NestJS REST API for managing college courses, students, and enrollments.

## Features

- Admin user registration and login
- JWT authentication for protected routes
- Course creation and listing
- Student registration and retrieval
- Enrollment engine with duplicate and capacity guards
- MongoDB storage using Mongoose
- Swagger API documentation at `/api` and `/docs`

## Requirements implemented

- NestJS with TypeScript
- MongoDB via `@nestjs/mongoose`
- Swagger UI implemented
- Validation via `ValidationPipe` and DTOs
- Proper controllers, services, and modules separation
- Exception handling for bad requests, not found, and unauthorized access

## Setup

1. Clone the repository
2. Install dependencies

```bash
npm install
```

3. Create a `.env` file in the project root with:

```env
MONGO_URI=mongodb+srv://divyesh:Divyesh123@divyesh.7fgouap.mongodb.net/divyesh?retryWrites=true&w=majority
```

4. Start the development server

```bash
npm run start:dev
```

5. Open API documentation

- `http://localhost:3000/api`
- `http://localhost:3000/docs`

## How to use the API

### 1. Register an admin

`POST http://localhost:3000/admin`

Body:

```json
{
  "username": "adminuser",
  "password": "Pass1234"
}
```

### 2. Login as admin

`POST http://localhost:3000/auth/login`

Body:

```json
{
  "username": "adminuser",
  "password": "Pass1234"
}
```

Response:

```json
{
  "access_token": "..."
}
```

### 3. Use the JWT token

Add this header for protected routes:

```
Authorization: Bearer <access_token>
```

### 4. Create a course

`POST http://localhost:3000/course`

Headers:

- `Authorization: Bearer <access_token>`
- `Content-Type: application/json`

Body:

```json
{
  "title": "Calculus I",
  "description": "Intro to calculus",
  "capacity": 30
}
```

### 5. Get all courses

`GET http://localhost:3000/course`

### 6. Register a student

`POST http://localhost:3000/student`

Body:

```json
{
  "firstName": "Jane",
  "lastName": "Doe",
  "email": "jane.doe@example.com",
  "major": "Computer Science"
}
```

### 7. Enroll a student

`POST http://localhost:3000/enrollment`

Headers:

- `Authorization: Bearer <access_token>`
- `Content-Type: application/json`

Body:

```json
{
  "studentId": "<student id>",
  "courseId": "<course id>"
}
```

### 8. Get all enrollments

`GET http://localhost:3000/enrollment`

Headers:

- `Authorization: Bearer <access_token>`

## API behavior

- Duplicate course titles are rejected
- Duplicate student emails are rejected
- Duplicate enrollments are rejected
- Enrollment fails if course capacity is reached
- Protected routes return `401 Unauthorized` without a valid token

## Postman / Swagger testing

Use Swagger UI at `/api` or `/docs` to interact with the API.

For Postman:

1. Register admin
2. Login admin and copy token
3. Add `Authorization: Bearer <token>` header
4. Create courses and enroll students

## Commands

```bash
npm install
npm run start:dev
npm run build
```

## Notes

- The project uses `src/main.ts` to load `.env` via `dotenv`
- MongoDB connection string is read from `process.env.MONGO_URI`
- The app listens on `http://localhost:3000`

## Validation and structure

- DTOs for request validation
- `ValidationPipe` with `whitelist`, `transform`, and `forbidNonWhitelisted`
- Separate modules for `admin`, `auth`, `course`, `student`, and `enrollment`
- Mongoose schemas for each entity

## License

This project is provided as a NestJS evaluation sample.
