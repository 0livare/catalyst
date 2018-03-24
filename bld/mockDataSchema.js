/*
 * The object exported from this file is a json-schema-faker
 * config file.
 *
 * To see what this schema generates, run:
 *     $ npm run generate-mock-data
 * And then check the src/api/db.json file.  Alternatively,
 * json-schema-faker hosts an online tool at http://json-schema-faker.js.org
 * that has live updates and is useful when writing the schema.
 *
 * json-schema-faker has Faker.js and Chance.js build into it
 * to allow it to generate input of specific types or randomness.  Check out
 * their GitHub pages for more information.
 *
 * In order to specify a Faker.js format a "faker" property is used in the
 * description of an object, and similarily "chance" is used for Chance.js
 *
 * This page on advanced usages of Faker and Chance in json-schema-faker
 * has also prooved very useful.
 *
 */

 /* tslint:disable */

export default
{
  "type": "object",
  "required": ["users", "courses"],
  "properties": {
    "users": {
      "type": "array",
      "minItems": 10,
      "maxItems": 15,
      "items": {
        "type": "object",
        "required": ["id", "firstName", "lastName", "email"],
        "properties": {
          "id": {
            "type": "number",
            "unique": true,
            "minimum": 1
          },
          "firstName": {
            "type": "string",
            "faker": "name.firstName"
          },
          "lastName": {
            "type": "string",
            "faker": "name.lastName"
          },
          "email": {
            "type": "string",
            "faker": "internet.email"
          }
        }
      }
    },
    "courses": {
      "type": "array",
      "minItems": 10,
      "maxItems": 15,
      "items": {
        "type": "object",
        "required": ["id", "title", "watchUrl", "authorId", "length", "category"],
        "properties": {
          "id": {
            "type": "string",
            "chance": "guid",
            "unique": true
          },
          "title": {
            "type": "string",
            "minLength": 10,
            "unique": true
          },
          "watchUrl": {
            "type": "string",
            "faker": "internet.url"
          },
          "authorId": {
            "type": "string",
            "faker": "internet.userName"
          },
          "length": {
            "type": "number",
            "chance": {
              "integer": {
                "min": 30,
                "max": 5000
              }
            }
          },
          "category": {
            "type": "string",
            "chance": {
              "pickone": [[
                "JavaScript",
                "React",
                "Redux"
              ]]
            }
          }
        }
      }
    }
  }
}