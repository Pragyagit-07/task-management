# Task Management system
A full stack task management system that is designed for small teams to help manage their tasks efficiently. It includes essential functionalities such as user authentication, task management(CRUD) and more.

## Features
- **User Authentication**
  - Register and log in securely
  - JWT-based session management
- **Task Management**
  - Create, Read, Update, Delete (CRUD) tasks
  - Task attributes: Title, Description, Due Date, Priority, Status
- **Team Collaboration**
  - Assign tasks to other users
  - Notifications on task assignments
- **User Dashboard**
  - View created and assigned tasks
  - See overdue tasks
- **Search & Filter**
  - Search by title or description
  - Filter by status, priority, and due date
---
## Tech Stack

### Frontend
- [Next.js]
- [React 19]
- [Tailwind CSS]
- [React Hook Form]
- [Zustand]
- [Axios]
- [Zod]

### Backend
- [Node.js]
- [Express]
- [MongoDB]
- [Mongoose]
- [bcryptjs]
- [jsonwebtoken]
- [dotenv]
- [CORS]

  ---
  ## Project Structure

  ```
  Task Management System/
  |-Task-manager-backend/
  | |-models/  # mongoose models(User, Task)
  | |-middleware/ # Auth and error middleware
  | |-routes/ # API route handler
  | |-.env # Enviornment variable
  | |-index.js # main server file
  | └── package.json
  |
  | |-task-manager-frontend/
  | |-public/ # static assests
  | |-src/ # sourecode( pages, components, hooks)
  | |-.env.local # envuiornment variable
  | |-tailwind.config.js # Tailwind CSS configuration
  │ ├── next.config.ts # Next.js configuration
  │ └── package.json
  |
  |-README.md
  |-LICENSE

  ```

  ## Installation
  ### Frontend
  
  ```bash
  cd task-manager-frontend
  npm install
  npm run dev
  ```
  
  ### Backend

  ```bash
  cd Task-manager-backend
  npm install
  npm run start
  ```

  ## Deployment

  ### Frontend Deployment: Vercel
  - Frontend is hosted on: https://vercel.com/
  - Acesses the live app: https://task-management-zf2n.vercel.app/
  
  
