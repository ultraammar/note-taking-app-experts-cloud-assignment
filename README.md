# Note Taking App for Experts Cloud
This project is a simple note taking app built as part of the Experts Cloud screening process. It utilizes React for the frontend, Vite for a faster development experience, and HMR (Hot Module Replacement) for a seamless development workflow. as choice, It's using MySQL as I never used that for a ReactJs project in the past, I normally tended to use MongoDB, Postgres, json-server etc

## Frontend Technologies
React - The frontend library for building reusable UI components.
Vite - The tool that provides a faster development experience and HMR.
Ant Design - a good UI Library
Formik - form handling library
Yup - Form Validation handling library
Sass - css pre-processor
Redux RTK - state management

## Backend Technologies
MySQL - database
NodeJS - runtime environment
ExpressJs - framework 

Getting Started
To get started, clone this repository and install both the frontend and backend dependencies using the following commands:

## Clone the repository
git clone https://github.com/ultraammar/note-taking-app-experts-cloud-assignment.git

## Navigate to the frontend directory
cd note-taking-app-experts-cloud-assignment/frontend

## Install the frontend dependencies
npm install

## Navigate to the backend directory
cd note-taking-app-experts-cloud-assignment/backend

## Install the backend dependencies
npm install
Running the Frontend
To run the frontend, use the following command:

## Run the frontend
npm run dev
This will start the development server on http://localhost:5173/ by default.

Running the Backend
To run the backend, use the following command:

## Run the backend
npm run dev
The backend will start running on http://localhost:8081/.

Project Structure
Here is a brief overview of the key files and folders in the project:

- frontend/: Contains the frontend code implemented using React and Vite.
- backend/: Contains the backend server code.
- frontend/src/App.jsx: The main entry point for the frontend.
- frontend/index.html: The entry point for the frontend, contains the HTML and boilerplate code.
- backend/server.js: The main entry point for the backend.
- backend/vercel.json: Contains configuration for deploying the backend to Vercel.
- README.md: This file containing project information.



Deployment
The backend is set up for deployment on Vercel with the appropriate configuration in the vercel.json file. To deploy the backend, follow the Vercel guidelines for deploying serverless functions.

for the backend be sure to replace the .env.example credentials with your own MySQL instance credentials, if choosing to run the backend locally.

For the backend to run, two tables must exist in the MySQL database, as it wont create it by default.
users(id, username, password)
notes(id, title, description, user_id)

Please note that this readme.md file does not cover details on the implementation of the frontend and backend; consider reviewing the source code for specific implementation details and business logic.
