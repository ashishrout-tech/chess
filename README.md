# A Mono repo faciliated by turbo-repo

### This monorepo houses two Next.js apps and an Express.js api, optimizing development with integrated tailwind-features and the shad-cn component library for the Next.js apps.

## Installation

You can install the `overpowered-monorepo` package from GitHub using npm.

```bash
npm install overpowered-monorepo
```

## What's inside?

This repo includes the following packages/apps:

### Apps and Packages

- `docs`: a [Next.js](https://nextjs.org/) app
- `web`: another [Next.js](https://nextjs.org/) app
- `api`: a [Express.js](http://expressjs.com/) app
- `ui`: a stub React and [shadcn](https://ui.shadcn.com/) component library shared by both `web` and `docs` applications
- `tailwind-class`: `tailwind` features are used throughout the monorepo
- `eslint-config-custom`: `eslint` configurations (includes `eslint-config-next` and `eslint-config-prettier`)
- `tsconfig`: `tsconfig.json`s used throughout the monorepo

Each package/app is 100% [TypeScript](https://www.typescriptlang.org/).

### Utilities

This monorepo has some additional tools already setup for you:

- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting
- [Prettier](https://prettier.io) for code formatting

### Build

To build all apps and packages, run the following command:

```bash
npm run build
```

### Develop

To develop all apps and packages, run the following command:

```bash
npm run dev
```