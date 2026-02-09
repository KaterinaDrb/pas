# PAS

## Quick Start - local setup

To spin up this template locally, follow these steps:

### Development

1. First [clone the repo](#clone) if you have not done so already
2. `cd pas && cp .env.example .env` to copy the example environment variables.
3. `pnpm install && pnpm dev` to install dependencies and start the dev server
4. open `http://localhost:3000` to open the app in your browser

That's it! Changes made in `./src` will be reflected in your app. Follow the on-screen instructions to login and create your first admin user. Then check out [Production](#production) once you're ready to build and serve your app, and [Deployment](#deployment) when you're ready to go live.

#### Docker

To do so, follow these steps:

- Modify the `POSTGRES_DB`, `POSTGRES_USER`, `POSTGRES_PASSWORD`, in your `.env`
- Modify `DATABASE_URL` with provided `POSTGRES_DB`, `POSTGRES_USER`, `POSTGRES_PASSWORD`, for example `postgresql://POSTGRES_USER:POSTGRES_PASSWORD@localhost:5432/POSTGRES_DB`
- Run `docker-compose up` to start the database, optionally pass `-d` to run in the background.

### Collections

See the [Collections](https://payloadcms.com/docs/configuration/collections) docs for details on how to extend this functionality.

- #### Users (Authentication)

  Users are auth-enabled collections that have access to the admin panel.

  For additional help, see the official [Auth Example](https://github.com/payloadcms/payload/tree/main/examples/auth) or the [Authentication](https://payloadcms.com/docs/authentication/overview#authentication-overview) docs.


## Questions

If you have any issues or questions, reach out to us on [Discord](https://discord.com/invite/payload) or start a [GitHub discussion](https://github.com/payloadcms/payload/discussions).
