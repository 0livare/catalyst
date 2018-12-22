// Tests are placed alongside files under test.
/*eslint-disable no-var*/

// This assures the .babelrc dev config (which includes
// hot module reloading code) doesn't apply for tests.
process.env.NODE_ENV = 'test'

// enzyme-adapter-react-16 because we're using v16 of react
var Adapter = require('enzyme-adapter-react-16')

// Configure the adapter required by enzyme
var Enzyme = require('enzyme')
Enzyme.configure({ adapter: new Adapter() })