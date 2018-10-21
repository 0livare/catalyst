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
import Chance from 'chance'
import faker from 'faker'

let chance = new Chance()

let customExtensions = { copy: val => val }

// Extend keywords with external generators
jsf.extend('chance', () => chance)
jsf.extend('faker',  () => faker)
jsf.extend('custom', () => customExtensions)

jsf.option({
  ignoreMissingRefs: false,  // If enabled, it will resolve to {} for unknown references (default: false)
  alwaysFakeOptionals: true, // When enabled, it will set optionalsProbability as 1.0 (default: false)
  requiredOnly: false,       // If enabled, only required properties will be generated (default: false)
  resolveJsonPath: true,     // If enabled, it will expand jsonPath keywords on all generated objects (default: false)
  reuseProperties: true,     // If enabled, it will try to generate missing properties from existing ones. Only when fillProperties is enabled too (default: false)
  fillProperties: true,      // If enabled, it will try to generate missing properties to fulfill the schema definition (default: true)
})

const json = JSON.stringify(jsf.generate(schema), null, 2)
const path = './bld/json-server/db.json'

fs.writeFile(path, json, function(err) {
  if (err) {
    return console.log(chalk.red(err))
  } else {
    console.log(chalk.green('Mock data written to ' + path))
  }
})