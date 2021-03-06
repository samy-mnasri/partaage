const axios = require('axios')
const query = require('micro-query')
const turf = require('@turf/turf')

module.exports = async (req, res) => {
  let { cities } = query(req)
  cities = (cities || '').split(',')
  console.log(cities)
  const geojsons = []
  let union

  for (const city of cities) {
    const url = `https://geo.api.gouv.fr/communes/${city}?fields=contour&format=geojson&geometry=contour`

    try {
      geojsons.push((await axios.get(url)).data)
    } catch {
      console.error('City not found')
    }
  }

  for (const geojson of geojsons) {
    if (!union) {
      union = geojson.geometry
    } else if (geojson.geometry.type !== 'Point') {
      let polyUnion, polyCity

      try {
        polyUnion = turf.polygon(union.coordinates)
      } catch {
        polyUnion = turf.multiPolygon(union.coordinates)
      }

      try {
        polyCity = turf.polygon(geojson.geometry.coordinates)
      } catch {
        polyCity = turf.multiPolygon(geojson.geometry.coordinates)
      }

      union = turf.union(polyUnion, polyCity).geometry
    }
  }

  res.end(JSON.stringify(union))
}
