Sure! Here's an updated README file for your project that includes a comprehensive sitemap for your backend, a tree-like structure for the routes, and other relevant information.

---

# Lacodemy AI EdTech App

![alt text](image.png)

![alt text](image-1.png)

![alt text](image-2.png)

![alt text](image-3.png)

## Project Overview

Lacodemy AI EdTech App is a comprehensive platform designed for educational purposes, offering a range of features for managing courses, users, reviews, and more.

## Repository

[GitHub Repository](https://github.com/Ham12-3/canva_hackathon/)

## Project Structure

### Frontend (Client)

- **`/client`**: Contains the frontend application built with React and Next.js.

### Backend (Server)

- **`/server`**: Contains the backend application built with Express.js and MongoDB.

## Backend Directory Structure

```
/server
├── /controllers
│   ├── course.controller.ts
│   └── user.controller.ts
├── /middleware
│   └── auth.ts
├── /models
│   ├── course.model.ts
│   └── notification.model.ts
├── /services
│   └── course.service.ts
├── /utils
│   ├── ErrorHandler.ts
│   ├── redis.ts
│   └── sendMail.ts
├── /routes
│   └── course.routes.ts
├── app.ts
└── server.ts
```

## API Endpoints

### Course Routes

```
POST /create-course
  - Middleware: updateAccessToken, isAuthenticated, authorizeRoles("admin")
  - Controller: uploadCourse

PUT /edit-course/:id
  - Middleware: updateAccessToken, isAuthenticated, authorizeRoles("admin")
  - Controller: editCourse

GET /get-course/:id
  - Controller: getSingleCourse

GET /get-courses
  - Controller: getCourses

GET /get-course-content/:id
  - Middleware: updateAccessToken, isAuthenticated
  - Controller: getCourseByUser

PUT /add-question
  - Middleware: updateAccessToken, isAuthenticated
  - Controller: addQuestion

PUT /add-answer
  - Middleware: updateAccessToken, isAuthenticated
  - Controller: addAnswer

PUT /add-review/:id
  - Middleware: updateAccessToken, isAuthenticated
  - Controller: addReview

PUT /add-reply
  - Middleware: updateAccessToken, isAuthenticated, authorizeRoles("admin")
  - Controller: addReplyToReview

GET /get-all-courses
  - Middleware: updateAccessToken, isAuthenticated, authorizeRoles("admin")
  - Controller: getAllCourses

POST /getVdoCipherOTP
  - Controller: generateVideoUrl

DELETE /delete-course/:id
  - Middleware: updateAccessToken, isAuthenticated, authorizeRoles("admin")
  - Controller: deleteCourse
```

## Running the Project

### Prerequisites

- Node.js
- MongoDB
- Redis (for caching)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Ham12-3/canva_hackathon/
   ```

2. Navigate to the project directory:

   ```bash
   cd canva_hackathon
   ```

3. Install dependencies for both client and server:

   ```bash
   cd client
   npm install
   cd ../server
   npm install
   ```

### Running the Server

1. Navigate to the server directory:

   ```bash
   cd server
   ```

2. Start the server:

   ```bash
   npm start
   ```

### Running the Client

1. Navigate to the client directory:

   ```bash
   cd client
   ```

2. Start the client:

   ```bash
   npm run dev
   ```

## Contributing

Feel free to submit issues, suggest improvements, or contribute code via pull requests.

## License

This project is licensed under the MIT License.

---

Feel free to adjust any sections or add more details as needed!
# Lacodemy AI EdTech App

![alt text](image.png)

![alt text](image-1.png)

![alt text](image-2.png)

![alt text](image-3.png)

## Project Overview

Lacodemy AI EdTech App is a comprehensive platform designed for educational purposes, offering a range of features for managing courses, users, reviews, and more.

## Repository

[GitHub Repository](https://github.com/Ham12-3/canva_hackathon/)

## Project Structure

### Frontend (Client)

- **`/client`**: Contains the frontend application built with React and Next.js.

### Backend (Server)

- **`/server`**: Contains the backend application built with Express.js and MongoDB.

## Backend Directory Structure

```
/server
├── /controllers
│   ├── course.controller.ts
│   └── user.controller.ts
├── /middleware
│   └── auth.ts
├── /models
│   ├── course.model.ts
│   └── notification.model.ts
├── /services
│   └── course.service.ts
├── /utils
│   ├── ErrorHandler.ts
│   ├── redis.ts
│   └── sendMail.ts
├── /routes
│   └── course.routes.ts
├── app.ts
└── server.ts
```

## API Endpoints

### Course Routes

```
POST /create-course
  - Middleware: updateAccessToken, isAuthenticated, authorizeRoles("admin")
  - Controller: uploadCourse

PUT /edit-course/:id
  - Middleware: updateAccessToken, isAuthenticated, authorizeRoles("admin")
  - Controller: editCourse

GET /get-course/:id
  - Controller: getSingleCourse

GET /get-courses
  - Controller: getCourses

GET /get-course-content/:id
  - Middleware: updateAccessToken, isAuthenticated
  - Controller: getCourseByUser

PUT /add-question
  - Middleware: updateAccessToken, isAuthenticated
  - Controller: addQuestion

PUT /add-answer
  - Middleware: updateAccessToken, isAuthenticated
  - Controller: addAnswer

PUT /add-review/:id
  - Middleware: updateAccessToken, isAuthenticated
  - Controller: addReview

PUT /add-reply
  - Middleware: updateAccessToken, isAuthenticated, authorizeRoles("admin")
  - Controller: addReplyToReview

GET /get-all-courses
  - Middleware: updateAccessToken, isAuthenticated, authorizeRoles("admin")
  - Controller: getAllCourses

POST /getVdoCipherOTP
  - Controller: generateVideoUrl

DELETE /delete-course/:id
  - Middleware: updateAccessToken, isAuthenticated, authorizeRoles("admin")
  - Controller: deleteCourse
```

## Running the Project

### Prerequisites

- Node.js
- MongoDB
- Redis (for caching)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Ham12-3/canva_hackathon/
   ```

2. Navigate to the project directory:

   ```bash
   cd canva_hackathon
   ```

3. Install dependencies for both client and server:

   ```bash
   cd client
   npm install
   cd ../server
   npm install
   ```

### Running the Server

1. Navigate to the server directory:

   ```bash
   cd server
   ```

2. Start the server:

   ```bash
   npm start
   ```

### Running the Client

1. Navigate to the client directory:

   ```bash
   cd client
   ```

2. Start the client:

   ```bash
   npm run dev
   ```

## Contributing

Feel free to submit issues, suggest improvements, or contribute code via pull requests.

## License

This project is licensed under the MIT License.

---

Feel free to adjust any sections or add more details as needed!
