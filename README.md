# DreamCatcher Backend

This is the backend for the **DreamCatcher** application, a platform where users can log, analyze, and explore their dreams. The backend is built with **Express.js** and provides a RESTful API for managing user profiles, dreams, comments, and analytics. 

The frontend repository can be found here: [DreamCatcher Frontend](LINK_TO_FRONTEND_REPOSITORY).

---

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [API Documentation](#api-documentation)
  - [Authentication Routes](#authentication-routes)
  - [User Routes](#user-routes)
  - [Admin Routes](#admin-routes)
  - [Dream Routes](#dream-routes)
  - [Comment Routes](#comment-routes)
  - [Analysis Routes](#analysis-routes)
- [Contributing](#contributing)
- [License](#license)

---

## Features

- User authentication with JWT
- Role-based access control (Admin/User)
- CRUD operations for dreams and comments
- Public and private dream management
- Dream analytics (tags, emotions, trends)
- Secure password management with hashing
- Filtering and searching dreams by tags, emotions, and date range

---

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/YOUR_USERNAME/DreamCatcher-Backend.git
   cd DreamCatcher-Backend