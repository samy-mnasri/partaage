const Papa = require('papaparse')
const fs = require('fs')
const axios = require('axios')

const main = async () => {
  const csv = fs.readFileSync('./cities.csv', 'utf8')
  const json = Papa.parse(csv, { header: true })

  const cities = json.data.map(item => ({
    INSEE: item.INSEE_COMM,
    Département: item.DEPARTEMENT,
    Commune: item.NOM_COMM,
    PAT: item['PAT Nom du projet'],
    Avancement: item['PAT Avancement']
  }))

  fs.writeFileSync('cities.json', JSON.stringify(cities))

  const pats = JSON.parse(fs.readFileSync('./cities.json', 'utf8'))
  let count = 0

  for (const pat of pats) {
    if (!pat.geojson) {
      const url = `https://geo.api.gouv.fr/communes/${pat.INSEE.trim()}?fields=contour&format=geojson&geometry=contour`

      try {
        await new Promise(resolve => setTimeout(resolve, 200))

        // const query = encodeURIComponent(pat.Commune + ' ' + pat['Département'] + ' ' + 'France')
        // const response = await axios.get(`https://nominatim.openstreetmap.org/search.php?q=${query}&polygon_geojson=1&format=json&limit=1`)
        // pat.geojson = response.data[0].geojson

        const response = await axios.get(url)
        pat.geojson = response.data
        ++count

        if (count >= 50) {
          fs.writeFileSync('cities.json', JSON.stringify(pats))
          console.log('WROTE WROTE WROTE WROTE WROTE')
          count = 0
        }
      } catch {
        console.log(url)
      }
    }

    console.log(pat.Commune, Boolean(pat.geojson))
    // fs.writeFileSync('pat.json', JSON.stringify(pats))
  }

  fs.writeFileSync('cities.json', JSON.stringify(pats))
}

main()
