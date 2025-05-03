# video-platform

## Features
- Video streaming

  Users are able to view a listing of all videos on the platform. A search box above the video listing allows users to filter videos based on their title.
- Content management

  Content editors are able to easily and effeciently upload, edit, and delete content from the platform using the content management pages.
- Marketing feedback

  Marketing managers are able to view like and dislike statistics on each video, as well as leave a comment with feedback for content editors. Content editors are then able to view this feedback to help influence content choices.

## Design Phase Documents

Documents required for the design phase of the project are contained
in the [docs](./docs) directory. Developer documentation can be viewed in [DEVELOPMENT.md](./DEVELOPMENT.md).

## Running

To easily run the application without installing any development
dependencies, use the `docker-compose.yaml` and `Dockerfile` in this
repository. The `docker-compose.yaml` will start a mongodb server
alongside the application server and automatically populate it with
information.

### Prerequisites
- A computer or server running Docker
- Docker compose

### Setup
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
