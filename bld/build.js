import webpack from 'webpack'
import webpackConfig from '../webpack.config.prod'
import chalk from 'chalk'

/* tslint:disable:no-console */

process.env.NODE_ENV = 'production'

console.log(chalk.blue('Generating minified bundle for production.  This will take a moment...'))

webpack(webpackConfig).run((err, stats) => {
  if (err) {
    // So a fatal error occurred.  Stop here.
    console.log(chalk.red(err))
    return 1
  }

  const jsonStats = stats.toJson()

  if (jsonStats.hasErrors) {
    return jsonStats.errors.map(e => console.log(chalk.red(e)))
  }

  if (jsonStats.hasWarnings) {
    console.log(chalk.yellow('Webpack generated the following warnings: '))
    jsonStats.warnings.map(w => console.log(chalk.yellow(warning)))
  }

  console.log(`Webpack stats: ${stats}`)

  // If we got this far, the build succeeded
  console.log(chalk.green('Your app has been built for production and written to /dist!'))

  return 0
})