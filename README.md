A little list containing tutorials and solutions for development problems

[To the App](https://fea17e86.github.io/dev-howtos) with search and filter functionality

- [Browser API](#browser-api)
- [Git](#git)
- [Typescript](#typescript)

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

## Git

### [Delete all branches except master](https://www.hacksparrow.com/git/delete-all-branches-except-master.html)[git]

During the normal course of a project, git repositories can accumulate a number of branches locally. A few branches may be fine, but sometimes they can pile up and lead to an unacceptably large number of branches. That's when it is time for a branch clean up!

## Typescript

### [Releasing a library written in TypeScript on NPM (YouTube)](https://youtu.be/T_4CCdkN468)[typescript,build,library]

Most of us have used or at least heard about TypeScript, but how many have released a React library written in TypeScript on NPM? In this session we will take a look at the tooling required and some best practices for publishing a library using TypeScript and Rollup.

### [Using Typescript namespaces in create-react-app](https://ostrowski.ninja/typescript-namespaces-cra/)[typescript,react,create-react-app,babel,rescripts]

Typescript namespaces have history from pre-modules JS times. Technically you should use ES Modules if you can. However there are useful cases to encapsulate your types and data in namespaces. How do they work in modern JS/TS world and can you use them in create-react-app?
