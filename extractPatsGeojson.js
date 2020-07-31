const fs = require('fs')

const pats = require('./patsGeojson.json')

Object.keys(pats).map(key => {
  fs.writeFileSync(`./pats/${key}.json`, JSON.stringify(pats[key]))
})
