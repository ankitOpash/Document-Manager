# FastAPI + SQLAlchemy + Supabase Backend

This project sets up a backend server using **Python** and **FastAPI**, with **SQLAlchemy** for ORM, and **Supabase** (PostgreSQL) as the database. This guide will take you through the setup process step by step.

## Prerequisites

- **Python 3.8+**
- **PostgreSQL** (Supabase Cloud)
- **pip** (Python package installer)

## Setup Instructions

### 1. Clone the Repository

First, clone the project repository to your local machine:

```bash
git clone https://github.com/yourusername/yourprojectname.git
cd yourprojectname
```

### 2. Set Up Environment Variables

Create a `.env` file and add your `DATABASE_URL`:

```
DATABASE_URL=postgresql://<username>:<password>@<host>:<port>/<database>
```

### 3. Create a Virtual Environment

Create and activate a virtual environment:

```bash
python -m venv venv
```

For Windows:

```bash
venv\Scripts\activate
```

For macOS/Linux:

```bash
source venv/bin/activate
```

### 4. Install Dependencies

Install the required Python packages:

```bash
pip install -r requirements.txt
```

### 5. Initialize the Database

Run the ORM to create tables in the database:

```bash
python init_db.py
```

### 6. Run the Backend Project

Start the FastAPI server:

```bash
uvicorn app.main:app --reload
```

## Additional Information

- Ensure your PostgreSQL database is running and accessible.
- Modify the `DATABASE_URL` in the `.env` file according to your database credentials.
- Use `--reload` for development purposes to auto-reload the server on code changes.
