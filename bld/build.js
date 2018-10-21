import webpack from 'webpack'
import webpackConfig from '../webpack.config.prod'
import chalk from 'chalk'

/* tslint:disable:no-console */

process.env.NODE_ENV = 'production'

console.log(chalk.cyanBright('Generating minified bundle for production.  This will take a moment...'))

webpack(webpackConfig).run((err, stats) => {
  if (err) {
    // So a fatal error occurred.  Stop here.
    console.log(chalk.redBright(err))
    return 1
  }

  const jsonStats = stats.toJson()

  if (jsonStats.hasErrors) {
    return jsonStats.errors.map(e => console.log(chalk.red(e)))
  }

  if (jsonStats.hasWarnings) {
    console.log(chalk.yellow('Webpack generated the following warnings: '))
    jsonStats.warnings.map(w => console.log(chalk.yellowBright(warning)))
  }

  console.log(`Webpack stats: ${stats}`)

  // If we got this far, the build succeeded
  console.log(chalk.greenBright('Your app has been built for production and written to /dist!'))

  return 0
})