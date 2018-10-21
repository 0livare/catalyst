# Catalyst

Catalyst is a React/Redux web application starter kit built in Typescript.  It has best practices built in, making doing the right thing the easy thing!

[![Build status](https://ci.appveyor.com/api/projects/status/eey9n5ji44k00m83/branch/master?svg=true)](https://ci.appveyor.com/project/zposten/catalyst/branch/master)
[![Dependency Status](https://david-dm.org/zposten/catalyst.svg?style=flat-square)](https://david-dm.org/zposten/catalyst)


## Is Catalyst for you?

So you're building a web app:
  - Do you want to use React?
    - [React][react] is a component based library for building user interfaces.  
    - It's implementation of a virtual DOM makes it _fast_ and its introduction of JSX makes your code much easier to read and debug!
  - Is it going to be a large project, maintained by multiple developers?  
    - [Typescript][typescript] takes much of the mystery out of JavaScript, leaving you with declarative, scalable code.
  - Is it going to be data intensive?
    - [Redux's][redux] unidirectional dataflow helps you write applications that behave consistently.  It also provides a great developer experience, such as [live code editing combined with a time traveling debugger][redux-devtools].
  - Is it going to be heavily styled?
    - [SCSS][scss] is a powerful syntax over the top of CSS that makes everything better.
    - [(S)CSS modules][css-modules] allow you to not have to worry about writing CSS for one component that could affect another, everything has local scope!

If you answered yes to these four questions, Catalyst is for you.

## Getting Started

```bash
$ git clone https://github.com/zposten/Catalyst.git
$ cd Catalyst
$ npm install
$ npm start
```

## Library choices

There are many, many choices to make when establishing a JS project, this is one of the reasons that doing so is so difficult and time consuming.  I have made the following decisions for this project:

- JS Library: [React][react]
- JS flavor: [Typescript][typescript]
- Data flow architecture: [Redux][redux]
  - Asynchronous calls: [Redux thunk][redux-thunk]
- Bundler: [Webpack][webpack]
  - Module format: ES2015+
- Transpiler: [Babel][babel]
- Automation tool: npm scripts
- Styles
  - [CSS modules][css-modules]
  - [SCSS][scss]
  - [PostCSS][post-css]
    - Autoprefixer
- Linter: [ESLint][es-lint]
- Test framework: [Mocha][mocha]
  - [React test utils][react-test-utils]
  - [Enzyme][enzyme] - wraps React test utils for a better api
  - Assertion library: [Chai][chai]
    - Assertion syntax: Should
  - Test helper library: [JSDOM][jsdom]
  - Test placment: Alongside classes
  - Where to run tests: In memory
  - When to run tests: Every time you save
- CI Servers: [Travis][travis] and [AppVeyor][appveyor]
- HTTP Requests: [Fetch][fetch]
- Mock API: [json-server], [JSON Schema Faker][json-schema-faker]
- URL Navigation: [React Router 4][react-router]
- Included UI component libraries:
  - [React-Bootstrap][react-bootstrap]
  - [Material UI][material-ui]

[redux-devtools]: https://github.com/gaearon/redux-devtools
[react]: https://reactjs.org/
[typescript]: https://www.typescriptlang.org/
[redux]: https://github.com/reactjs/redux
[redux-thunk]: https://github.com/gaearon/redux-thunk
[webpack]: https://webpack.js.org/
[babel]: https://babeljs.io/
[css-modules]: https://github.com/css-modules/css-modules
[scss]: http://sass-lang.com/documentation/file.SCSS_FOR_SASS_USERS.html
[post-css]: https://github.com/postcss/postcss
[es-lint]: https://eslint.org/
[mocha]: https://mochajs.org/
[react-test-utils]: https://reactjs.org/docs/test-utils.html
[enzyme]: https://github.com/airbnb/enzyme
[chai]: http://chaijs.com/
[jsdom]: https://github.com/jsdom/jsdom
[travis]: https://travis-ci.org/
[appveyor]: https://appveyor.com
[fetch]: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API
[json-server]: https://github.com/typicode/json-server
[json-schema-faker]: https://github.com/json-schema-faker/json-schema-faker
[react-router]: https://github.com/ReactTraining/react-router
[react-bootstrap]: https://react-bootstrap.github.io/
[material-ui]: http://www.material-ui.com/








