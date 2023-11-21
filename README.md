# Welcome to Blogify
Blogify is a simple, easy-to-use blogging platform built with Django and ReactJS. It allows users to view blogs posted by other users and post their own blogs too.

[![Netlify Status](https://api.netlify.com/api/v1/badges/1cbb61a6-afd4-46e3-9782-9cb465f5bd65/deploy-status)](https://app.netlify.com/sites/blogifywebapp/deploys)

Visit the live app at [blogify.](https://blogifywebapp.netlify.app/).

## Features
- Login / Register
- Minimal Design
- Create / View / Edit / Delete Your Posts
- User Profile
- View / Edit Your Details
- Light / Dark mode

## Installation

### Backend Setup
- Clone this repository: `git clone https://github.com/toufeeqgoudia/blogify.git`.
- Change the current directory to `backend` folder: `cd backend`.
- Create a virtual environment: `python -m venv venv`.
- Activate the virtual environment: 
  - On Windows: `venv/Scripts/activate`.
  - On Unix or MacOS: `source venv/bin/activate`.
- Make sure that pip is up-to-date by running: `python -m pip install --upgrade pip`.
- Install all backend dependencies: `pip install -r requirements.txt`.
- Run `python manage.py makemigrations`.
- Run `python manage.py migrate`.
- Create a superuser: `python manage.py createsuperuser`.
- Run the server: `python manage.py runserver`.

### Frontend Setup
- Open a new terminal
- Change the current directory to `frontend` folder: `cd frontend`.
- Install all the frontend dependencies: `npm install`.
- Run the server: `npm run dev`.

### Contribution Guidelines
- Found a bug or have a suggestion? [Open an issue](https://github.com/toufeeqgoudia/blogify/issues).

### Acknowledgements
- Backend built with Django.
- Frontend built with ReactJS.

