# PARTAAGE

This tool creates a merged GeoJSON document of multiple French cities according to their INSEE code (and thanks to geo.api.gouv.fr).

To use it, send a GET request to https://partaage.vercel.app/api and set the query parameter "cities" to a list of INSEE codes separated by ",".

Example: https://partaage.vercel.app/api?cities=67062,67063