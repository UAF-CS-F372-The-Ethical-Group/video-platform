# video-platform

## Documentation

Documentation is contained in the [docs](./docs) directory.

## Development

This project uses Deno. Follow the instructions at
https://docs.deno.com/runtime/#install-deno to install it for your platform.

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

The user session, available on `request.session` inside a route handler, has the
following properties:

```ts
interface Session {
  userId: string; // The ID of the currently authenticated user
}
```
