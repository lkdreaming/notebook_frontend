'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  BASE_API: '"http://localhost:8186/api"',
  FIGURE_BED_URL: 'http://192.168.30.100:9000'
})
