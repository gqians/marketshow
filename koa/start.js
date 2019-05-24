require('babel-register') ({
    presets: [ 'env' ],
    plugins: ['transform-async-to-generator']
})

module.exports = require('./index.js')