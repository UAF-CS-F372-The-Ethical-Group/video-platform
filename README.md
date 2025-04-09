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
- filePath

### Like collection

- user (user._id)
- movie (movie._id)
- status (boolean, true = liked, false = disliked)
