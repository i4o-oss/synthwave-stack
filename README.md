# Remix Synthwave Stack

![Synthwave Stack](https://raw.githubusercontent.com/ilangorajagopal/images/main/synthwave%20stack.png)

Learn more about [Remix Stacks](https://remix.run/stacks).

```
npx create-remix --template ilangorajagopal/synthwave-stack
```

## What's in the stack

- [Vercel deployment](https://vercel.com)
- [PlanetScale Database](https://planetscale.com)
- [GitHub Actions](https://github.com/features/actions) for deploy on merge to production and staging environments
- Database ORM with [Prisma](https://prisma.io)
- Magic Links, Google and Twitter Auth with [remix-auth](https://github.com/sergiodxa/remix-auth/)
- Health check API route
- Upload API with AWS S3
- Transactional emails with [SendGrid](https://sendgrid.com/)
- UI with [Radix UI](https://radix-ui.com)
- Styling with [TailwindCSS](https://tailwindcss.com)
- Code formatting with [Prettier](https://prettier.io)
- Linting with [ESLint](https://eslint.org)
- Static Types with [TypeScript](https://typescriptlang.org)
- End-to-end testing with [Cypress](https://cypress.io) (Coming Soon)
- Local third party request mocking with [MSW](https://mswjs.io) (Coming Soon)
- Unit testing with [Vitest](https://vitest.dev) and [Testing Library](https://testing-library.com) (Coming Soon)

Not a fan of bits of the stack? Fork it, change it, and use `npx create-remix --template your/repo`! Make it your own.

## Development

-   Initial setup: _If you just generated this project, this step has been done for you._

    ```sh
    npm run setup
    ```

-   Start dev server:

    ```sh
    npm run dev
    ```

This starts your app in development mode, rebuilding assets on file changes.

### Relevant code:

The main functionality is creating users, logging in and out.

-   creating users, and logging in and out [./app/models/user.server.ts](./app/models/user.server.ts)
-   user sessions, and verifying them [./app/session.server.ts](./app/session.server.ts)

## Deployment

This Remix Stack handles automatically deploying your app to production and staging environments on Vercel.

All you have to do is to create a project on Vercel and choose your repo. Vercel handles setting up CI/CD.

### Connecting to your database

The database lives on [planetscale.com](https://planetscale.com). Prisma has been configured to connect to Planetscale and will work in local environment. Update the database name in `DATABASE_URL` variable in your `.env` for local development use. Use the connection string provided on Planetscale dashboard as `DATABASE_URL` in production.

### Type Checking

This project uses TypeScript. It's recommended to get TypeScript set up for your editor to get a really great in-editor experience with type checking and auto-complete. To run type checking across the whole project, run `npm run typecheck`.

### Linting

This project uses ESLint for linting. That is configured in `.eslintrc.js`.

### Formatting

We use [Prettier](https://prettier.io/) for auto-formatting in this project. It's recommended to install an editor plugin (like the [VSCode Prettier plugin](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)) to get auto-formatting on save. There's also a `npm run format` script you can run to format all files in the project.

## Testing (Coming soon)

### Cypress

We use Cypress for our End-to-End tests in this project. You'll find those in the `cypress` directory. As you make changes, add to an existing file or create a new file in the `cypress/e2e` directory to test your changes.

We use [`@testing-library/cypress`](https://testing-library.com/cypress) for selecting elements on the page semantically.

To run these tests in development, run `npm run test:e2e:dev` which will start the dev server for the app as well as the Cypress client. Make sure the database is running in docker as described above.

We have a utility for testing authenticated features without having to go through the login flow:

```ts
cy.login();
// you are now logged in as a new user
```

We also have a utility to auto-delete the user at the end of your test. Just make sure to add this in each test file:

```ts
afterEach(() => {
	cy.cleanupUser();
});
```

That way, we can keep your local db clean and keep your tests isolated from one another.
