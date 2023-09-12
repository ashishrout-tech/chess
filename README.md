# Chess Mania

<b>Landing Page</b> <br />
<img src="https://github.com/ashishrout-tech/chess/assets/77796540/da3d1126-ce89-4475-b0c0-06aa51d29b0e" width="800" /> <br /> <br />

<b>Create a game. You'll join as white</b> <br />
<img src="https://github.com/ashishrout-tech/chess/assets/77796540/03ee3b06-3494-420b-be17-9be0df6dd508" width="800" /> <br /> <br />

<b>Other user joins the game with same id as black</b> <br />
<img src="https://github.com/ashishrout-tech/chess/assets/77796540/0b4d0f8d-ec30-4502-8523-8a92b50a31f9" width="800" /> <br /> <br />

<b>Game begins as soon as black joins</b> <br />
<img src="https://github.com/ashishrout-tech/chess/assets/77796540/b0fb7268-01e6-4f9d-9c6a-0fb6e74084c8" width="800" /> <br /> <br />

<img src="https://github.com/ashishrout-tech/chess/assets/77796540/341a182f-4d42-46d0-b537-93460d15762d" width="800" /> <br /> <br />


### This monorepo houses two Next.js apps and an Express.js api, optimizing development with integrated tailwind-features and the shad-cn component library for the Next.js apps.


Clone the repository. Then, run

```bash
npm install
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
