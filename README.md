# video-platform

## Documentation

Documentation is contained in the [docs](./docs) directory.

## Development

```bash
# To start the dev server
npm run dev

# To start the production server
npm start

# Seed database
npm run seed-database

# Change user password
npm run change-password <username> <password>

# Change user role
npm run change-role <username> <role>
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
