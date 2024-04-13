# SvelteKit Auth Example with Lucia and Drizzle

This is an example project showcasing authentication processes using Lucia for state management and Drizzle for ORM (Object-Relational Mapping) in a SvelteKit application.

## Overview

This project demonstrates how to implement authentication features such as user signup, login, logout, and protected routes using Lucia for state management and Drizzle for ORM.

## Features

- User signup: Allow users to create a new account.
- User login: Allow existing users to authenticate themselves.
- User logout: Allow authenticated users to log out of their accounts.
- Protected routes: Restrict access to certain routes to authenticated users only.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/hrasekj/sveltekit-auth-example.git
   ```

2. Navigate into the project directory:

   ```bash
   cd sveltekit-auth-example
   ```

3. Install dependencies:

   ```bash
   pnpm install
   ```

4. Use .env.example to create a new .env file:

   ```bash
   cp .env.example .env
   ```

5. Initialize database:

   ```bash
   docker-compose up -d
   ```

6. Push migrations to the database:

   ```bash
   npx drizzle-kit push:mysql
   ```

## Usage

1. Start the development server:

   ```bash
   pnpm dev

   # or start the server and open the app in a new browser tab
   pnpm dev --open
   ```

2. In browser navigate to [http://localhost:5173](http://localhost:5173).

3. Explore the authentication features implemented in the application.

## Development

To create new migration files, run:

```bash
npx drizzle-kit generate:mysql
```

Then push the new migration to the database.

## Dependencies

- [SvelteKit](https://github.com/sveltejs/kit): A framework for building web applications.
- [Lucia](https://github.com/lucia-auth/lucia): Authentication library.
- [Drizzle ORM](https://github.com/drizzle-team/drizzle-orm): An ORM (Object-Relational Mapping) library.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
