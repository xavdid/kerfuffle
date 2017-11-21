const path = require('path')

const BUILD_DIR = path.resolve(__dirname, 'lib/client')
const APP_DIR = path.resolve(__dirname, 'src/client')

const config = {
  entry: APP_DIR + '/index.tsx',
  output: {
    path: BUILD_DIR,
    filename: 'bundle.js'
  },
  resolve: {
    // Add '.ts' and '.tsx' as resolvable extensions.
    extensions: ['.ts', '.tsx', '.js', '.json']
  },
  module: {
    rules: [
      // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
      { test: /\.tsx?$/, loader: 'awesome-typescript-loader' }
    ]
  }
}

module.exports = config
