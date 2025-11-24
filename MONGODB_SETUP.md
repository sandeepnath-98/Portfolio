Local MongoDB setup (Docker)

This project already supports MongoDB via `MONGODB_URL`.

Quick steps to run a local MongoDB with Docker Compose:

1. Ensure Docker is installed and running.
2. From the project root run:

```powershell
docker-compose up -d
```

This will start a `mongodb` service and expose it on `mongodb://localhost:27017`.

3. Update your `.env` file to point at the DB (or set it in your shell):

```
MONGODB_URL=mongodb://localhost:27017/devfolio
```

4. Restart the dev server (in PowerShell):

```powershell
npm run dev
```

The server will attempt to connect to MongoDB and use it to persist messages. If the connection fails the app will fall back to in-memory storage and log a message.

Using MongoDB Atlas

If you prefer a cloud-hosted DB, create a free cluster in MongoDB Atlas and set `MONGODB_URL` to your connection string.

Security note

Don't commit production credentials to the repo. Use environment variables or secret management. `.env.example` lists recommended variables.
