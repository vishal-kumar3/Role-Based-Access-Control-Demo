# Node.js Middleware & Granular RBAC Demo

This repository demonstrates how to implement **granular Role-Based Access Control (RBAC)** using middleware in a Node.js application with Express. It enforces permissions like `read:post`, `create:post`, etc., based on user roles (e.g., admin, editor, viewer). Built with TypeScript for type safety and clarity.

This demo supports my blog post: [Middleware & Granular RBAC in Node.js: A 2025 Guide with Examples](https://vishal-kumar3.hashnode.dev/middleware-granular-rbac-nodejs-2025)

## Folder Structure

```
/src
  ├── index.ts        # Main server setup and routes
  ├── middleware.ts   # Authentication and RBAC middleware logic
README.md            # This file
package.json         # Dependencies and scripts
```

## Prerequisites

* **Node.js**: v16 or higher
* **npm**: v8 or higher
* **TypeScript**: Installed globally (`npm install -g typescript`) or locally

## Setup

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/vishal-kumar3/Role-Based-Access-Control-Demo.git
   cd your-repo
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Compile TypeScript**:
   ```bash
   tsc
   ```
   This generates JavaScript files in a `/dist` folder (assuming a basic tsconfig.json).

4. **Run the Server**:
   ```bash
   node dist/index.js
   ```
   The server starts on http://localhost:3000.

## Usage

The API simulates a blog platform with granular RBAC. Test it with cURL or Postman by passing a `user-id` header to mimic different roles:

* **Admin (user-id: 1)**: Full access (read, create, update, delete posts).
* **Editor (user-id: 2)**: Can read, create, and update posts.
* **Viewer (user-id: 3)**: Read-only access.

## Example Requests

1. **Get Posts (Read)**:
   ```bash
   curl -H "user-id: 1" http://localhost:3000/posts
   ```
   * Expected: `{ "message": "List of posts", "user": "admin" }`
   * Works for all roles.

2. **Create Post**:
   ```bash
   curl -X POST -H "user-id: 1" http://localhost:3000/posts
   ```
   * Expected: `{ "message": "Post created", "user": "admin" }`
   * Works for admin and editor roles only.

3. **Update Post**:
   ```bash
   curl -X PUT -H "user-id: 1" http://localhost:3000/posts/1
   ```
   * Expected: `{"message":"Post 1 updated","user":"admin"}`
   * Works for admin and editor roles only.

4. **Delete Post**:
   ```bash
   curl -X PUT -H "user-id: 2" http://localhost:3000/posts/1
   ```
   * Expected: `{"message":"Post 1 deleted","user":"admin"}`
   * Fails for editor and viewer.

5. **Access Denied Example**:
   ```bash
   curl -X DELETE -H "user-id: 3" http://localhost:3000/posts/1
   ```
   * Expected: `{"message":"Forbidden: viewer lacks delete:post"}`

## How It Works

* **index.ts**: Sets up the Express server, defines routes (/posts for CRUD), and applies middleware.
* **middleware.ts**: Contains:
   * authMiddleware: Simulates user authentication by checking user-id.
   * checkPermission: Enforces granular RBAC (e.g., read:post) based on role permissions.

## Extending the Demo

1. **Add a Database**: Replace the in-memory users and rolePermissions with MongoDB or PostgreSQL.
2. **JWT Auth**: Swap the header-based auth with JSON Web Tokens.
3. **More Resources**: Add permissions like read:comment or create:user.
4. **Add New Roles**:
   Edit the role-permission mapping in `middleware.ts` to add new roles with specific permission sets.
5. **Add New Resources**:
   Create new route files and add corresponding permissions (e.g., `read:comment`, `update:user`).
6. **Implement Real Authentication**:
   Replace the simplified user-id header with JWT or other authentication methods.

## License

MIT License - feel free to use, modify, and share!

## Feedback

Found a bug or have a suggestion? Open an issue or reach out via my blog!
