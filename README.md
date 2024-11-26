# Full Stack Application

This repository contains a full stack application with a **FastAPI** backend and a **Vite + React + TypeScript** frontend.

## Table of Contents

1. [Overview](#overview)
2. [Tech Stack](#tech-stack)
3. [Getting Started](#getting-started)
4. [Project Structure](#project-structure)
5. [Contributing](#contributing)
6. [License](#license)

## Overview

The application is designed to provide a seamless integration between a FastAPI backend and a React frontend. The backend uses SQLAlchemy for ORM and Supabase (PostgreSQL) as the database, while the frontend is built with Vite, React, and TypeScript.

## Tech Stack

### Backend

- **FastAPI** - Modern, fast (high-performance) web framework for building APIs with Python 3.8+
- **SQLAlchemy** - SQL toolkit and ORM for Python
- **Supabase** - PostgreSQL database as a service

### Frontend

- **Vite** - Next-generation, fast build tool for React apps
- **React** - JavaScript library for building user interfaces
- **TypeScript** - JavaScript with type safety
- **Axios** - Promise-based HTTP client for making API requests

## Getting Started

### Prerequisites

- **Node.js** and **npm** for the frontend
- **Python 3.8+** and **pip** for the backend
- **PostgreSQL** (Supabase Cloud)

### Setup Instructions

#### Backend

1. **Clone the Repository**

   ```bash
   git clone https://github.com/yourusername/yourprojectname.git
   cd yourprojectname/Backend
   ```

2. **Set Up Environment Variables**

   Create a `.env` file and add your `DATABASE_URL`:

   ```
   DATABASE_URL=postgresql://<username>:<password>@<host>:<port>/<database>
   ```

3. **Create a Virtual Environment**

   ```bash
   python -m venv venv
   ```

   Activate the virtual environment:

   - For Windows:

     ```bash
     venv\Scripts\activate
     ```

   - For macOS/Linux:

     ```bash
     source venv/bin/activate
     ```

4. **Install Dependencies**

   ```bash
   pip install -r requirements.txt
   ```

5. **Initialize the Database**

   ```bash
   python init_db.py
   ```

6. **Run the Backend Server**

   ```bash
   uvicorn app.main:app --reload
   ```

#### Frontend

1. **Navigate to the Frontend Directory**

   ```bash
   cd ../Frontend
   ```

2. **Install Dependencies**

   ```bash
   npm install
   ```

3. **Set Up Environment Variables**

   Copy the `.env.example` file to `.env` and configure the backend server URL.

4. **Run the Frontend Development Server**

   ```bash
   npm run dev
   ```

## Project Structure

- **Backend/**: Contains the FastAPI backend code.
- **Frontend/**: Contains the Vite + React + TypeScript frontend code.

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request for any improvements or bug fixes.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.