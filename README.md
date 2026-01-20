tore Rating System (2026)

A full-stack web application built with **Node.js, Express, Sequelize, and React**. This system features a **Single Login System** with role-based access for Admins, Store Owners, and Normal Users.

---

## 🚀 Features

* **Single Login System**: One portal for all users; roles (Admin, Owner, User) are determined by the JWT token.
* **System Administrator**: Manage users and view platform-wide statistics.
* **Store Owner**: Manage a specific store and view customer ratings/feedback.
* **Normal User**: Browse registered stores and submit ratings (1 to 5 stars).
* **Data Validation**: 
    * User and Store names must be between **20 and 60 characters**.
    * Passwords are stored in **Plain Text** (for testing purposes).
    * Ratings are restricted to a **1-5 range**.

---

## 🛠️ Tech Stack

- **Frontend**: React.js, Tailwind CSS, Axios
- **Backend**: Node.js, Express.js
- **Database**: MySQL, Sequelize ORM
- **Authentication**: JSON Web Tokens (JWT)