# Synthwave Stack

![Synthwave Stack](https://raw.githubusercontent.com/ilangorajagopal/images/main/synthwave%20stack.png)

Learn more about [Remix Stacks](https://remix.run/stacks).

```
pnpm create remix@latest --template i4o-oss/synthwave-stack
```

## What's in the box (well, stack)

- Built with/for [Remix](https://remix.run)
- Written in [TypeScript](https://typescriptlang.org)
- Deploys to [Fly](https://fly.io)/[Railway](https://railway.app)
- Database - [PlanetScale](https://planetscale.com)
- ORM - [Prisma](https://prisma.io)
- Built-in magic links, sign in with Google and Twitter - [remix-auth](https://github.com/sergiodxa/remix-auth/)
- Upload Files to [Cloudflare R2](https://www.cloudflare.com/products/r2/)
- Transactional emails - [Resend](https://resend.com/)
- Component Library - [Catalyst UI](https://catalyst-ui.com)
- Styling - [TailwindCSS](https://tailwindcss.com)
- Analytics - [Amplitude](https://amplitude.com)
- Error Tracking - [Sentry](https://sentry.io)
- Code formatting and linting
- Health check API route
- Billing and Subscriptions using LemonSqueezy (Coming Soon)

Not a fan of bits of the stack? Fork it, change it, and use `npx create-remix --template your/repo`! Make it your own.

## Development

Install dependencies:

```sh
pnpm i
```

Start dev server:

```sh
pnpm dev
```

_Note: Uses Remix App Server with HMR/HDR. Feel free to switch to a different server._

## Documentation:

Coming Soon

## Deployment

This Remix Stack handles automatically deploying your app to production and staging environments on Railway.

All you have to do is to create a project on Railway and choose your repo. Railway handles setting up CI/CD.

### Connecting to your database

The database lives on [planetscale.com](https://planetscale.com). Prisma has been configured to connect to Planetscale and will work in local environment. Update the database name in `DATABASE_URL` variable in your `.env` for local development use. Use the connection string provided on Planetscale dashboard as `DATABASE_URL` in production.

### Type Checking

This project uses TypeScript. It's recommended to get TypeScript set up for your editor to get a really great in-editor experience with type checking and auto-complete. To run type checking across the whole project, run `pnpm typecheck`.

### Linting

This project uses ESLint for linting. That is configured in `.eslintrc.js`.

### Formatting

We use [Prettier](https://prettier.io/) for auto-formatting in this project. It's recommended to install an editor plugin (like the [VSCode Prettier plugin](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)) to get auto-formatting on save. There's also a `pnpm format` script you can run to format all files in the project.
