# A little list containing tutorials and solutions for development problems

**[To the App](https://fea17e86.github.io/dev-howtos) with search and filter functionality**

1. [A little list containing tutorials and solutions for development problems](#a-little-list-containing-tutorials-and-solutions-for-development-problems)
   1. [Architecture](#architecture)
      1. [Client-Side Architecture Basics[architecture,frontend,model-view-presenter,observer,react]](#client-side-architecture-basicsarchitecturefrontendmodel-view-presenterobserverreact)
   2. [Browser API](#browser-api)
      1. [Use FileSaver to save PDFs[browser-api,file-saver,blob,array-buffer]](#use-filesaver-to-save-pdfsbrowser-apifile-saverblobarray-buffer)
      2. [Converting JavaScript callbacks to Promise and Async-Await[browser-api,javascript,async-await,callback,promise]](#converting-javascript-callbacks-to-promise-and-async-awaitbrowser-apijavascriptasync-awaitcallbackpromise)
   3. [CSS](#css)
      1. [Stop using CSS in JavaScript for web development[css,css-in-js,css-modules,styled-components]](#stop-using-css-in-javascript-for-web-developmentcsscss-in-jscss-modulesstyled-components)
      2. [Why I Write CSS in JavaScript[css,css-in-js,styled-components]](#why-i-write-css-in-javascriptcsscss-in-jsstyled-components)
      3. [Styled Components vs. CSS Stylesheets[css,css-in-js,css-modules,styled-components]](#styled-components-vs-css-stylesheetscsscss-in-jscss-modulesstyled-components)
   4. [Git](#git)
      1. [Delete all branches except master[git]](#delete-all-branches-except-mastergit)
   5. [HTTP](#http)
      1. [Content-Security-Ploicy Header (CSP)[csp,http,security]](#content-security-ploicy-header-cspcsphttpsecurity)
   6. [React](#react)
      1. [Runtime environment variables — create-react-app[react,create-react-app,env]](#runtime-environment-variables--create-react-appreactcreate-react-appenv)
      2. [Content Security Policy (CSP) in Create-React-App (CRA)[create-react-app,csp,http,react,security,webpack]](#content-security-policy-csp-in-create-react-app-cracreate-react-appcsphttpreactsecuritywebpack)
      3. [8 ways to deploy a React app for free[react,deployment]](#8-ways-to-deploy-a-react-app-for-freereactdeployment)
      4. [Examples of large production-grade, open-source React apps[react,real-world-app]](#examples-of-large-production-grade-open-source-react-appsreactreal-world-app)
   7. [State Management](#state-management)
      1. [State Machines in React[state-management,react,state-machine,xstate]](#state-machines-in-reactstate-managementreactstate-machinexstate)
      2. [Async Guards with XState[state-management,async,state-machine,xstate]](#async-guards-with-xstatestate-managementasyncstate-machinexstate)
      3. [Multistep form handling with Finite State Machines, Formik and TypeScript[state-management,form,formik,react,react-native,state-machine,typescript,validation,xstate,yup]](#multistep-form-handling-with-finite-state-machines-formik-and-typescriptstate-managementformformikreactreact-nativestate-machinetypescriptvalidationxstateyup)
      4. [MobX with XState for elegent React State Management (video)[state-management,mobx,react,state-machine,xstate]](#mobx-with-xstate-for-elegent-react-state-management-videostate-managementmobxreactstate-machinexstate)
   8. [Testing](#testing)
      1. [How to Test React Components: the Complete Guide[testing,react,enzyme,react-testing-library,cypress,ci]](#how-to-test-react-components-the-complete-guidetestingreactenzymereact-testing-librarycypressci)
      2. [An in-depth beginner's guide to testing React applications[testing,jest,mocking,react,react-testing-library]](#an-in-depth-beginners-guide-to-testing-react-applicationstestingjestmockingreactreact-testing-library)
   9. [Typescript](#typescript)
      1. [Releasing a library written in TypeScript on NPM (YouTube)[typescript,build,library]](#releasing-a-library-written-in-typescript-on-npm-youtubetypescriptbuildlibrary)
      2. [Using Typescript namespaces in create-react-app[typescript,react,create-react-app,babel,rescripts]](#using-typescript-namespaces-in-create-react-apptypescriptreactcreate-react-appbabelrescripts)

## Architecture

### [Client-Side Architecture Basics](https://khalilstemmler.com/articles/client-side-architecture/introduction/)[architecture,frontend,model-view-presenter,observer,react]

Though the tools we use to build client-side web apps have changed substantially over the years, the fundamental principles behind designing robust software have remained relatively the same. In this guide, we go back to basics and discuss a better way to think about the front-end architecture using modern tools like React, Redux, xState, and Apollo Client.

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

## CSS

### [Stop using CSS in JavaScript for web development](https://medium.com/@gajus/stop-using-css-in-javascript-for-web-development-fa32fb873dcc)[css,css-in-js,css-modules,styled-components]

CSS isn’t going anywhere. A lot of the projects choose to style documents in JavaScript for wrong reasons. This article lists common misconceptions (myths) and the existing CSS solutions to those problems.

`styled-components` (just like CSS modules) take away the responsibility of the naming away from the human. Humans make mistakes; computers make them less often so.
On its own, it is not a good enough reason to start using `styled-components`.

Most (if not all) of these things can be addressed long term, either by the community, changes in React or in `styled-components` itself. But whats the point? CSS is already widely supported, it has massive community around it and it just works.
The point of this article is not to deter the reader from using “CSS” in JavaScript or from using `styled-components`. Styling using `styled-components` has a great use case: a better cross-platform support. Don’t use it for wrong reasons.

Use CSS with either of the naming conventions (I recommend [BEM](http://getbem.com/)). If you are worried about class name collisions (or too lazy to use BEM), use [CSS modules](https://github.com/css-modules/css-modules). If you are developing for React web, consider using [babel-plugin-react-css-modules](https://github.com/gajus/babel-plugin-react-css-modules). If you are developing for React native, [styled-components](https://styled-components.com/) is great.

### [Why I Write CSS in JavaScript](https://mxstbr.com/thoughts/css-in-js)[css,css-in-js,styled-components]

Primarily, CSS-in-JS boosts my confidence. I can add, change and delete CSS without any unexpected consequences. My changes to the styling of a component will not affect anything else. If I delete a component, I delete its CSS too. No more [append-only stylesheets](https://css-tricks.com/oh-no-stylesheet-grows-grows-grows-append-stylesheet-problem/)! ✨

- **Confidence**: Add, change and delete CSS without any unexpected consequences and avoid dead code.
- **Painless Maintenance**: Never go on a hunt for CSS affecting your components ever again.
- **Enhanced Teamwork**: Avoid common CSS frustrations to keep a neat codebase and moving quickly, regardless of experience levels.
- **Fast Performance**: Send only the critical CSS to the user for a rapid first paint.
- **Dynamic Styling**: Simply style your components with a global theme or based on different states.

### [Styled Components vs. CSS Stylesheets](https://getstream.io/blog/styled-components-vs-css-stylesheets/)[css,css-in-js,css-modules,styled-components]

There’s a hot debate around standard CSS stylesheets vs. “CSS-in-JS” solutions when building in modern front-end frameworks. In this post, I’m going to weigh up the pros and cons of CSS vs. Styled Components and how it affects the way I write React components.

**Pros**

- No Globally Scoped Selectors
- Consistency
- Sass Syntax Out-Of-The-Box
- Theming
- Dynamic Styling

**Cons**

- Learning Curve
- Integration With Legacy CSS Can Be Painful
- Potentially a "Fad"
- Performance

## Git

### [Delete all branches except master](https://www.hacksparrow.com/git/delete-all-branches-except-master.html)[git]

During the normal course of a project, git repositories can accumulate a number of branches locally. A few branches may be fine, but sometimes they can pile up and lead to an unacceptably large number of branches. That's when it is time for a branch clean up!

First, make sure you are on master:

```sh
git checkout master
```

Then run this command:

```sh
git branch | grep -v '^*' | xargs git branch -D
```

It will delete all the local branches, whether they have been merged to master or not.

Now, what if you want to be a little less adventurous and delete only branches that have been merged to master?

This command will do that for you:

```sh
git branch | grep -v '^*' | xargs git branch -d
```

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
  "connect-src": ["'self'", "backend-api-url.com", "data:"],
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

### [Examples of large production-grade, open-source React apps](https://maxrozen.com/examples-of-large-production-grade-open-source-react-apps/)[react,real-world-app]

It’s bloody hard to find a good example of a large production-grade, open-source React app.

There are a few reasons for this:

1. No one writes amazing code the first time they write it

   - Experienced product engineers know there’s a trade-off between quality and getting features in the hands of customers. You’re more likely to find ugly tech debt with a //TODO: Improve this later! comment than best practices

2. Most companies keep their apps in private repos

   - Trade secrets and all that jazz.

3. There’s a lot of beginner-grade repos out there

   - Without a ton of experience, it’s hard to tell the good from the bad

On that note, I’ve reviewed the following well-known open-source React apps, and reckon they’re worth checking out.

## State Management

### [State Machines in React](https://mastery.games/post/state-machines-in-react/)[state-management,react,state-machine,xstate]

One of the biggest pain points when developing an app is the tricky business of managing state. Many bugs are caused by things getting into unexpected states, or by race conditions. Finite state machines can help eliminate both types of bugs entirely, while providing a welcome, structured way to build components.

### [Async Guards with XState](https://github.com/davidkpiano/xstate/issues/533#issuecomment-510459432)[state-management,async,state-machine,xstate]

With state machines and statecharts, all states (including intermediate states) must be explicit. So instead of:

![A -- EVENT [async guard] --> B](https://user-images.githubusercontent.com/1093738/61049718-2ebb2180-a3b3-11e9-8ca1-1d08dd5de0b3.png "A -- EVENT [async guard] --> B")

You would model this with some sort of intermediate "checking" state that invokes the async guard:

![A -- EVENT --> CHECKING -- GUARD.SUCCESS --> B](https://user-images.githubusercontent.com/1093738/61049734-38448980-a3b3-11e9-8ac6-077a8605cee0.png "A -- EVENT --> CHECKING -- GUARD.SUCCESS --> B")

Which might look something like:

```javascript
CHECKING: {
  invoke: {
    src: 'asyncGuard',
    onDone: 'B',
    onError: 'A'
  }
}
```

### [Multistep form handling with Finite State Machines, Formik and TypeScript](https://thewidlarzgroup.com/multistep-form-xstate-formik/)[state-management,form,formik,react,react-native,state-machine,typescript,validation,xstate,yup]

Lately, I had a chance to work on a mobile app that utilizes this concept of finite state machines. Having no prior knowledge on such thing as a state machine, I quickly got to liking it!

Basically, the concept of such state machines is that we have a finite number of states and we can transition between these states while also exchanging some data. We can declare multiple machines which can handle different tasks and behave in a different way, as well as declare some universal ones that can be re-used. That being said, we can think of our app as a combination of state machines that, based on their states, render different parts of UI. For example, fetching data from the back-end - we are either in a fetching state (we can render some kind of a loader at this time) or in a done state where we can display all the fetched data along with some kind of information about our request status, e.g. whether it was successful or not.

If you want to start developing an app based on state machines, there’s this cool library called XState - the one that I used in the aforementioned project and got familiar with (but not entirely, at least yet! 🙂).

In this article, I will try to share some knowledge about it with you. We will develop a simple React Native app, which handles multi-step forms. Apart from XState, we will use Formik and TypeScript.

### [MobX with XState for elegent React State Management (video)](https://youtu.be/Va_d5JmDHnA?t=480)[state-management,mobx,react,state-machine,xstate]

## Testing

### [How to Test React Components: the Complete Guide](https://www.freecodecamp.org/news/testing-react-hooks/)[testing,react,enzyme,react-testing-library,cypress,ci]

Complete Guide, huh, are you going to cover every possible testing scenario? Of course not. However, it will be a complete foundational guide to testing and will be enough to build off of for most other edge cases.

Also I have curated an extensive collection of blog posts, articles and tutorials in the further reading section at the end that should give you enough knowledge to be in the top 10% of developers in terms of testing.

You can find the completed project here:

https://github.com/iqbal125/react-hooks-testing-complete

### [An in-depth beginner's guide to testing React applications](https://jkettmann.com/beginners-guide-to-testing-react/)[testing,jest,mocking,react,react-testing-library]

Unfortunately, writing tests can be a real struggle for beginners. It's like developing in a completely new environment. You may not know what to test. You might spend hours to write a simple test case because you hit error after error. You're used to developing in the browser and it's great dev tools. But testing just doesn't work the same way.

It doesn't have to be that difficult though. With the right approach, you can start writing tests with confidence even as a beginner.

The goal of this blog post is to act as a guide for your first tests. We'll take a small application as an example and cover it with tests. We will discuss what we should test and why we should test it. We will see different techniques that can help us to write tests with confidence without relying on trial and error.

## Typescript

### [Releasing a library written in TypeScript on NPM (YouTube)](https://youtu.be/T_4CCdkN468)[typescript,build,library]

Most of us have used or at least heard about TypeScript, but how many have released a React library written in TypeScript on NPM? In this session we will take a look at the tooling required and some best practices for publishing a library using TypeScript and Rollup.

### [Using Typescript namespaces in create-react-app](https://ostrowski.ninja/typescript-namespaces-cra/)[typescript,react,create-react-app,babel,rescripts]

Typescript namespaces have history from pre-modules JS times. Technically you should use ES Modules if you can. However there are useful cases to encapsulate your types and data in namespaces. How do they work in modern JS/TS world and can you use them in create-react-app?
