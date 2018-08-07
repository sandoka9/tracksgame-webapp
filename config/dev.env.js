'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  DEBUG: true,
  LOG_LEVEL: 1,
  FIREBASE_ENV: '"dev"',
  STORAGE_ENV: '"dev"' // 'dev' for firebase | 'loc' for static
})
