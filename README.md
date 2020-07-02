A little list containing tutorials and solutions for development problems

[To the App](https://fea17e86.github.io/dev-howtos) with search and filter functionality

- [Browser API](#browser-api)
  - [Use FileSaver to save PDFs[browser-api,file-saver,blob,array-buffer]](#use-filesaver-to-save-pdfsbrowser-apifile-saverblobarray-buffer)
- [Git](#git)
  - [Delete all branches except master[git]](#delete-all-branches-except-mastergit)
- [React](#react)
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

## React

### [Runtime environment variables — create-react-app](https://medium.com/@andrewmclagan_64462/runtime-environment-variables-create-react-app-84f7c261856c)[react,create-react-app,env]

We simply need to create static JSON containing the white listed `REACT_APP` variables when the app starts. To do this [`react-env`](https://github.com/andrewmclagan/react-env) reads your environment as per the CRA standards and generates a `env.js` file before you app starts. This file can be statically served during development or in production. The environment configuration will be available via `window._env`. Simple.

## Typescript

### [Releasing a library written in TypeScript on NPM (YouTube)](https://youtu.be/T_4CCdkN468)[typescript,build,library]

Most of us have used or at least heard about TypeScript, but how many have released a React library written in TypeScript on NPM? In this session we will take a look at the tooling required and some best practices for publishing a library using TypeScript and Rollup.

### [Using Typescript namespaces in create-react-app](https://ostrowski.ninja/typescript-namespaces-cra/)[typescript,react,create-react-app,babel,rescripts]

Typescript namespaces have history from pre-modules JS times. Technically you should use ES Modules if you can. However there are useful cases to encapsulate your types and data in namespaces. How do they work in modern JS/TS world and can you use them in create-react-app?
