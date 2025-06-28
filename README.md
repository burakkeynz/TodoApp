# FastAPI + React + MySQL ToDoApp

This repository contains a simple yet extensible ToDo application built with **FastAPI** as the backend and **React** as the frontend. It was developed as part of my learning process while exploring how to integrate FastAPI and React in a full-stack project.

The app demonstrates features like user authentication via JWT, role-based access control, profile photo upload, and basic CRUD operations for managing ToDo items.

> **Note:** This project is an early development version and intended as a simplified prototype. Future plans include adding more features, improving the architecture, and deploying the application to production environments.

---

## Project Structure
'''

ToDoApp/
├── backend/
│ ├── alembic/ # Database migration scripts
│ ├── routers/ # FastAPI route definitions
│ ├── database.py # SQLAlchemy database connection setup
│ ├── models.py # SQLAlchemy ORM models
│ ├── main.py # FastAPI application entry point
│ ├── .env.example # Example environment variables for backend
│
├── frontend/
│ ├── src/ # React components, pages, and assets
│ ├── package.json # Frontend dependencies
│ ├── .env.example # Example environment variables for frontend
│
└── .gitignore

'''

---

## Features

- User registration and login with JWT tokens
- Role-based access control (admin and user)
- Profile photo upload
- CRUD operations for ToDos
- SQLAlchemy models and Alembic migrations
- Integration between React frontend and FastAPI backend using Axios

---


## Technologies Used

- FastAPI (Python)
- SQLAlchemy
- Alembic
- MySQL
- React
- Axios
- JWT Authentication
- Passlib (password hashing)
- CORS middleware

---

- **Backend:**  
    - Set up a Python virtual environment and install requirements.
    - Configure the `.env` file based on `.env.example`.
    - Run Alembic migrations.
    - Start the FastAPI server.

- **Frontend:**  
    - Navigate to `frontend` folder.
    - Run `npm install`.
    - Configure `.env` based on `.env.example`.
    - Run `npm start`.

See `.env.example` files for required environment variables.

---

## License

All rights reserved.

