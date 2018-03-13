// Tests are placed alongside files under test.
// This file does the following:
// 1. Registers babel for transpiling our code for testing
// 2. Disables Webpack-specific features that Mocha doesn't understand.
// 3. Requires jsdom so we can test via an in-memory DOM in Node
// 4. Sets up global vars that mimic a browser.

/*eslint-disable no-var*/

// This assures the .babelrc dev config (which includes
// hot module reloading code) doesn't apply for tests.
process.env.NODE_ENV = 'test';

// Make the babel pollyfill available to the test scripts
require('babel-polyfill');

// Register babel so that it will transpile the source ES6 to ES5
// before our tests run.
require("babel-register")({
  // Setting this will remove the currently hooked extensions of `.es6`, `.es`, `.jsx`
  // and `.js` so you'll have to add them back if you want them to be used again.
  extensions: ['.ts', '.tsx'],
});

// Disable webpack-specific features for tests since
// Mocha doesn't know what to do with them.
require.extensions['.scss'] = function () {return null;};
require.extensions['.css']  = function () {return null;};
require.extensions['.png']  = function () {return null;};
require.extensions['.jpg']  = function () {return null;};

// Configure JSDOM and set global variables
// to simulate a browser environment for tests.
var jsdom = require('jsdom').jsdom;

var exposedProperties = ['window', 'navigator', 'document'];

global.document = jsdom('');
global.window = document.defaultView;
Object.keys(document.defaultView).forEach((property) => {
  if (typeof global[property] === 'undefined') {
    exposedProperties.push(property);
    global[property] = document.defaultView[property];
  }
});

global.navigator = {
  userAgent: 'node.js'
};

// documentRef = document;  //eslint-disable-line no-undef


// Configure the adapter required by enzyme
var enzyme = require('enzyme');
var Adapter = require('enzyme-adapter-react-16');
enzyme.configure({ adapter: new Adapter() });

// Add chai's .should() to Object.prototype so that it's available in tests
require('chai').should()