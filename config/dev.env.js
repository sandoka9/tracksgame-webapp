'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  FIREBASE_ENV: '"dev"',
  STORAGE_ENV: '"loc"' // 'dev' for firebase
})
