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

## Usage

1. Start the development server:

   ```bash
   pnpm dev

   # or start the server and open the app in a new browser tab
   pnpm dev --open
   ```

2. Open your browser and navigate to [http://localhost:5173](http://localhost:5173).

3. Explore the authentication features implemented in the application.

## Configuration

1. Authentication settings such as API endpoints and token expiration can be configured in the `.env` file.

## Dependencies

- [Lucia](https://github.com/aidenybai/lucia): A tiny state management library for reactive web applications.
- [Drizzle](https://github.com/your-username/drizzle): An ORM (Object-Relational Mapping) library for SvelteKit applications.

## Contributing

Contributions are welcome! Please feel free to submit issues, feature requests, or pull requests.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
