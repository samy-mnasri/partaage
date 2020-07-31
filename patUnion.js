const fs = require('fs')
const turf = require('@turf/turf')

const cities = require('./cities.json')

const main = async () => {
  const pats = {}

  for (const city of cities) {
    if (!pats[city.PAT.toUpperCase()]) {
      pats[city.PAT.toUpperCase()] = city.geojson.geometry
    } else if (city.geojson.geometry.type !== 'Point') {
      let polyPat, polyCity

      try {
        polyPat = turf.polygon(pats[city.PAT.toUpperCase()].coordinates)
      } catch {
        polyPat = turf.multiPolygon(pats[city.PAT.toUpperCase()].coordinates)
      }
      // console.log(city)
      try {
        polyCity = turf.polygon(city.geojson.geometry.coordinates)
      } catch {
        polyCity = turf.multiPolygon(city.geojson.geometry.coordinates)
      }

      console.log('City', city)
      const union = turf.union(polyPat, polyCity)
      console.log('Union', union)
      pats[city.PAT.toUpperCase()] = union.geometry
    }
  }

  fs.writeFileSync('patsGeojson.json', JSON.stringify(pats))
}

main()
