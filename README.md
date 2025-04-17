# video-platform

## Documentation

Documentation is contained in the [docs](./docs) directory.

## Running

To easily run the application without installing any development
dependencies, use the `docker-compose.yaml` and `Dockerfile` in this
repository. The `docker-compose.yaml` will start a mongodb server
alongside the application server and automatically populate it with
information.

```bash
# Clone the project repository
git clone https://github.com/UAF-CS-F372-The-Ethical-Group/video-platform.git

# Open project directory
cd video-platform

# Start the server using docker compose
docker compose up
```

Once the application has been started with `docker compose up`, it can
be accessed at http://localhost:3000/.

This method of running the application automatically creates several
users, and populates the database with several movies. The users are
as follows:

| Username              | Password   | Role      |
| :-------------------- | :--------- | :-------- |
| email@example.com     | `ABCabc1!` | viewer    |
| viewer@example.com    | `ABCabc1!` | viewer    |
| marketing@example.com | `ABCabc1!` | marketing |
| editor@example.com    | `ABCabc1!` | editor    |

## Development

This project uses Deno. Follow the instructions at
https://docs.deno.com/runtime/#install-deno to install it for your
platform. This project also assumes that you have mongodb running on
localhost. The `MONGODB_URI` environment variable can be used to
configure where the application tries to connect to mongodb.

```bash
# Install dependencies
deno install

# To start the dev server
deno task dev

# To start the production server
deno task start

# Seed database
deno task seed-database

# Change user password
deno task change-password <username> <password>

# Change user role
deno task change-role <username> <role>

# Format all files
deno fmt

# Lint files
deno lint src/**/*.{ts,tsx}

# Type check all files
deno check src/**/*.{ts,tsx}
```

## Database schema

### User collection

- username
- password (hashed)
- failedLoginAttempts (integer, optional)
- role (either "viewer", "marketing", or "editor")

### Movies collection

- title
- genre
- videoPath
- thumbnailPath

### Like collection

- userId (user._id)
- movieId (movie._id)
- status (boolean, true = liked, false = disliked)

## Session data schema

The user session, available on `request.session` inside a route
handler, has the following properties:

```ts
interface Session {
  userId: string; // The ID of the currently authenticated user
}
```
