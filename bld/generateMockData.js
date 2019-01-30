/*
 * This script generates mock data for local development.
 * This way you don't have to point to an actual API,
 * but you can enjoy realistic, but randomized data,
 * and rapid page loads due to local, static data.
 */

/* tslint:disable:no-console */

import jsf from 'json-schema-faker'
import fs from 'fs'
import chalk from 'chalk'
import schema from './mockDataSchema'

const json = JSON.stringify(jsf(schema), null, 2)
const path = './bld/json-server/db.json'

fs.writeFile(path, json, function(err) {
  if (err) {
    return console.log(chalk.red(err))
  } else {
    console.log(chalk.green('Mock data written to ' + path))
  }
})