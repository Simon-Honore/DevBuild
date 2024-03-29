## 📌 Overview

DevBuild is a community-based learning platform for developers. It leverages essential dependencies like Prisma, DND-Kit, Radix-UI, Next.js, React Query, TailwindCSS, and more. The project aims to provide a rich and interactive learning experience for users.

## ⚙️ Setting Up

#### Your Environment Variable

```
DATABASE_URL=

GITHUB_ID=
GITHUB_SECRET=

NEXTAUTH_URL=
NEXTAUTH_SECRET=

```

- Create a Oauth on Github app and get id and secret

- Create a database PostgreSQL

## 🚀 Run Locally

1.Clone the DevBuild repository:

```sh
git clone https://github.com/Simon-Honore/DevBuild
```

2.Install the dependencies with one of the package managers listed below:

```bash
pnpm install
bun install
npm install
yarn install
```

3.Start the development mode:

```bash
pnpm dev
bun dev
npm run dev
yarn dev
```

4.Create the environnement variable file

5.Prisma

```
npx prisma db push
```

## ☁️ Deploy

[DevBuild](https://devbuild.vercel.app/)
