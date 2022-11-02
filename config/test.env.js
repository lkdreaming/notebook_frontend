'use strict'
const merge = require('webpack-merge')
const devEnv = require('./dev.env')

module.exports = merge(devEnv, {
  NODE_ENV: '"testing"',
  BASE_API: '"http://localhost:8186/api"',
  FIGURE_BED_URL: '"http://192.168.30.100:9000"'
})
