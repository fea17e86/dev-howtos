A little list containing tutorials and solutions for development problems

[To the App](https://fea17e86.github.io/dev-howtos) with search and filter functionality

- [Browser API](#browser-api)
  - [Use FileSaver to save PDFs[browser-api,file-saver,blob,array-buffer]](#use-filesaver-to-save-pdfsbrowser-apifile-saverblobarray-buffer)
- [Git](#git)
  - [Delete all branches except master[git]](#delete-all-branches-except-mastergit)
- [HTTP](#http)
- [React](#react)
- [Testing](#testing)
- [Typescript](#typescript)
  - [Releasing a library written in TypeScript on NPM (YouTube)[typescript,build,library]](#releasing-a-library-written-in-typescript-on-npm-youtubetypescriptbuildlibrary)
  - [Using Typescript namespaces in create-react-app[typescript,react,create-react-app,babel,rescripts]](#using-typescript-namespaces-in-create-react-apptypescriptreactcreate-react-appbabelrescripts)

## Browser API

### [Use FileSaver to save PDFs](https://www.npmjs.com/package/file-saver)[browser-api,file-saver,blob,array-buffer]

For downloading a PDF you need to transform it into a [Blob](https://developer.mozilla.org/en-US/docs/Web/API/Blob/Blob), for example by converting it into an [ArrayBuffer](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer) first, before you can download it with [FileSaver](https://www.npmjs.com/package/file-saver).

```typescript
import { saveAs } from "file-saver";

function downloadPdf(pdfData: ArrayBuffer, filename: string = "save.pdf") {
  const blob = new Blob([pdfData], { type: "application/pdf" });
  saveAs(blob, filename);
}

function toArrayBuffer(pdfBinaryString: string) {
  const buffer = new ArrayBuffer(binaries.length);
  const view = new Uint8Array(buffer);
  for (let i = 0; i < binaries.length; i++) {
    view[i] = binaries.charCodeAt(i);
  }
  return buffer;
}
```

### [Converting JavaScript callbacks to Promise and Async-Await](https://medium.com/javascript-in-plain-english/converting-javascript-callbacks-to-promise-and-async-await-replacing-async-waterfall-method-with-3c8b7487e0b9)[browser-api,javascript,async-await,callback,promise]

On regular day of a developer, we have to convert quite a bit of legacy code that uses traditional callbacks to Promises and async-await, both for taking advantage of the latest features of ES6 and also to avoid callback-hell and making the code more beautiful and compact and human readable.

## Git

### [Delete all branches except master](https://www.hacksparrow.com/git/delete-all-branches-except-master.html)[git]

During the normal course of a project, git repositories can accumulate a number of branches locally. A few branches may be fine, but sometimes they can pile up and lead to an unacceptably large number of branches. That's when it is time for a branch clean up!

## HTTP

### [Content-Security-Ploicy Header (CSP)](https://content-security-policy.com/)[csp,http,security]

The new Content-Security-Policy HTTP response header helps you reduce XSS risks on modern browsers by declaring, which dynamic resources are allowed to load.

## React

### [Runtime environment variables — create-react-app](https://medium.com/@andrewmclagan_64462/runtime-environment-variables-create-react-app-84f7c261856c)[react,create-react-app,env]

We simply need to create static JSON containing the white listed `REACT_APP` variables when the app starts. To do this [`react-env`](https://github.com/andrewmclagan/react-env) reads your environment as per the CRA standards and generates a `env.js` file before you app starts. This file can be statically served during development or in production. The environment configuration will be available via `window._env`. Simple.

### [Content Security Policy (CSP) in Create-React-App (CRA)](https://medium.com/@nrshahri/csp-cra-324dd83fe5ff)[create-react-app,csp,http,react,security,webpack]

Writing suitable CSP policy may require some changes to your app build pipeline to fetch and calculate hashes for inline scripts and styles, which are used.

I encountered a few challenges with restrictiions through CSPs:
- Some libraries, for example `@fortawesome/react-fontawesome`, use inline styling. That means I had to use the `'unsafe-inline'` `style-src` policy.
- For the `'unsafe-inline'` policy to work no `hash` or `nonce` `style-src` policies are allowed.
- I had to add the `data:` policy to `connect-src` otherwise the `libsodium` library couldn't load it's `octet-stream`.
- Last but not least I had to add the `'unsafe-eval'` policy to `script-src` because otherwise the WebAssembly module for the `argon2-browser` library couldn't be used.

As you can see there were quite a few restrictions. To be fair, I have not enough knowledge about CSP, WebAssembly or Webpack to guarantee that there is no other solutions to those issues. Here is my `config-overrides.js` for `react-app-rewired` to adjust the `webpack` configuration.

```javascript
const { override } = require("customize-cra");
const cspHtmlWebpackPlugin = require("csp-html-webpack-plugin");

const cspConfigPolicy = {
  "default-src": "'self'",
  "connect-src": [
    "'self'",
    "backend-api-url.com",
    "data:",
  ],
  "script-src": ["'self'", "'unsafe-eval'"],
  "style-src": ["'self'", "'unsafe-inline'"],
};

const cspOptions = {
  hashEnabled: {
    "script-src": true,
    "style-src": false,
  },
  nonceEnabled: {
    "script-src": true,
    "style-src": false,
  },
};

function addCspHtmlWebpackPlugin(config) {
  if (process.env.NODE_ENV === "production") {
    config.plugins.push(new cspHtmlWebpackPlugin(cspConfigPolicy, cspOptions));
  }

  return config;
}

module.exports = {
  webpack: override(addCspHtmlWebpackPlugin),
};
```

### [8 ways to deploy a React app for free](https://blog.logrocket.com/8-ways-to-deploy-a-react-app-for-free/)[react,deployment]

It’s time that you took your applications out of development and into production. The process of deploying an application built on top of a framework such as React, Vue, or Angular is much different from that of deploying a site built with HTML, CSS, and JavaScript.

In this tutorial, we’ll demonstrate how to deploy a React application in eight different ways. All the services described in this post are completely free with no hidden credit card requirements.

## Testing

### [How to Test React Components: the Complete Guide](https://www.freecodecamp.org/news/testing-react-hooks/)[testing,react,enzyme,react-testing-library,cypress,ci]

Complete Guide, huh, are you going to cover every possible testing scenario? Of course not. However, it will be a complete foundational guide to testing and will be enough to build off of for most other edge cases.

Also I have curated an extensive collection of blog posts, articles and tutorials in the further reading section at the end that should give you enough knowledge to be in the top 10% of developers in terms of testing.

You can find the completed project here:

https://github.com/iqbal125/react-hooks-testing-complete

## Typescript

### [Releasing a library written in TypeScript on NPM (YouTube)](https://youtu.be/T_4CCdkN468)[typescript,build,library]

Most of us have used or at least heard about TypeScript, but how many have released a React library written in TypeScript on NPM? In this session we will take a look at the tooling required and some best practices for publishing a library using TypeScript and Rollup.

### [Using Typescript namespaces in create-react-app](https://ostrowski.ninja/typescript-namespaces-cra/)[typescript,react,create-react-app,babel,rescripts]

Typescript namespaces have history from pre-modules JS times. Technically you should use ES Modules if you can. However there are useful cases to encapsulate your types and data in namespaces. How do they work in modern JS/TS world and can you use them in create-react-app?
