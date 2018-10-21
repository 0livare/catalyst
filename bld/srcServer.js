import express from 'express'
import path from 'path'
import open from 'open'
import webpack from 'webpack'
import config from '../webpack.config.dev'
import chalk from 'chalk'

/* tslint:disable:no-console */

console.log(chalk.cyanBright([
  '\n',
  '----------------------------------------------',
  '|                                            |',
  '|         Starting app in dev mode           |',
  '|                                            |',
  '----------------------------------------------',
  '\n',
].join('\n')))

const port = 3000
const app = express()
const compiler = webpack(config)

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath,
}))

app.use(require('webpack-hot-middleware')(compiler));

app.use('/images', express.static('images'))

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '../src/index.html'))
})

app.listen(port, function(err) {
  if (err) {
    console.log(err)
  } else {
    open('http://localhost:' + port)
  }
})