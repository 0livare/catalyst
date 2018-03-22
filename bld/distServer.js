import express from 'express'
import path from 'path'
import open from 'open'
import compression from 'compression'

/* tslint:disable:no-console */

/******************************************************************
 *
 * This server is NOT for actual production use.  This is just
 * useful for hosting the minified production build for local
 * debugging purposes
 *
 ******************************************************************/

const port = 3000
const app = express()

app.use(compression())
app.use(express.static('dist'))

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '../dist/index.html'))
})

app.get('/courses', function(req, res) {
  // Hard coding for simplicity. Pretend this hits a real database
  res.json(courses)
})

app.listen(port, function(err) {
  if (err) {
    console.log(err)
  } else {
    open('http://localhost:' + port)
  }
})

let courses = [
  {
    id: 'b002ec4f-209d-5fb7-953c-fdf42c8b24bf',
    title: 'A psychological study of Dr. Seuss',
    authorId: 'cat-in-the-hat',
    length: 115215,
    category: 'Psychology',
  },
  {
    id: 'fbc31ac4-738d-55fd-800e-04e9a21506d7',
    title: 'An introduction to Astrophysics',
    authorId: 'carl-sagen',
    length: 10000000001,
    category: 'Science',
  },
  {
    id: '6433da25-82f5-5890-b5c2-c9d5b86f1fe0',
    title: 'On the art of awesomeness',
    authorId: 'zach-posten',
    length: 4444,
    category: 'Life',
  },
]