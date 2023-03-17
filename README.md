# React Server Components with Prisma + TypeScript

## Setting Environment

### Install core libraries

```sh
npm install react@0.0.0-experimental-0cc724c77-20211125 react-dom@0.0.0-experimental-0cc724c77-20211125 react-server-dom-webpack@0.0.0-experimental-0cc724c77-20211125 react-fetch@0.0.0-experimental-0cc724c77-20211125
```

```sh
npm install --save-dev @types/react @types/react-dom typescript webpack webpack-cli
```

```sh
npx tsc --init
```

```sh
npm init @eslint/config

✔ How would you like to use ESLint? · style
✔ What type of modules does your project use? · esm
✔ Which framework does your project use? · react
✔ Does your project use TypeScript? · Yes
✔ Where does your code run? · browser
✔ How would you like to define a style for your project? · guide
✔ Which style guide do you want to follow? · standard-with-typescript
✔ What format do you want your config file to be in? · YAML
✔ Would you like to install them now? · Yes
✔ Which package manager do you want to use? · npm
```

```sh
npm install --save-dev --save-exact prettier
echo {}> .prettierrc.json
```

```
npm install --save-dev eslint-config-prettier
npm install --save-dev eslint-plugin-import eslint-plugin-unused-imports
```

```sh
npm install --save-dev concurrently
```

### Create client-side app

```sh
mkdir public
touch public/index.html
touch public/style.css
```

```sh
mkdir src
touch src/index.client.tsx
touch src/App.client.tsx
```

```sh
npm install react-error-boundary --force
```

```sh
touch webpack.config.client.js
touch webpack.config.server.js
npm install --save-dev html-webpack-plugin
npm install --save-dev ts-loader
```

```sh
npm install --save-dev @babel/core @babel/preset-env @babel/preset-react @babel/preset-typescript babel-loader
touch .babelrc
```

### Create server-side app

```sh
mkdir server
touch server/api.server.ts
touch server/package.json
```

```sh
npm install express compression
npm install --save-dev @babel/register
```
