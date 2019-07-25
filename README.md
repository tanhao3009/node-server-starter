
# Setup an Express project with Typescript

**create the default '''package.json'''**

```sh
npm init
```

**install the typescript package.**

```sh
npm install typescript -s
```

**Typescript node package**

Node.js is an engine that runs Javascript and not Typescript. The node Typescript package allows you to transpile your .ts files to .js scripts. Babel can also be used to transpile Typescript, however the market standard is to use the official Microsoft package.

Inside our package.json we will put a script called tsc:

```sh
"scripts": {
    "tsc": "tsc"
},
```

This modification allows us to call typescript functions from the command line in the project’s folder. So we can use the following command:

```sh
npm run tsc -- --init
```

**Installing express.js**

```sh
npm install express -s
```

Express and Typescript packages are independent. The consequence of this is that Typescript does not “know” types of Express classes. There is a specific npm package for the Typescript to recognize the Express types.

```sh
npm install @types/express -s
```

# Getting started

**get Hello, World `src`**

```sh
mkdir -p src
```

create a file called index.ts in `src` with the following content:

```sh
// lib/index.ts
import express = require('express');

// Create a new express application instance
const app: express.Application = express();

app.get('/', function (req, res) {
  res.send('Hello, World!');
});

app.listen(3001, function () {
  console.log('Example app listening on port 3001!');
});
```

then, compile out first express application

```sh
npm run tsc
```

```sh
node build/index.js
```

**Running TypeScript without transpiling**

You can run typescript directly on the node with the ts-node package.

This package is recommended for development only. To make the final deploy in production, always use the javascript version of your project.

The ts-node is already included as a dependency on another package, tts-node-dev. After installing,ts-node-dev we can run commands that restarts the server whenever a project file changes.

```sh
npm install ts-node-dev -s
```

**Inside our packege.json we will add two more scripts:**

```sh
"scripts": {
    "tsc": "tsc",
    "dev": "ts-node-dev --respawn --transpileOnly ./src/index.ts",
    "prod": "tsc && node ./build/index.js"
},
```

To start the development environment:

```sh
npm run dev
```

To run the server in production mode:

```sh
npm run prod
```




