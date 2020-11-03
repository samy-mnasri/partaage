# PARTAAGE

Cet outil génère un document GeoJSON de la fusion de plusieurs villes françaises d'après leurs codes INSEE (via geo.api.gouv.fr).

Pour l'utiliser, envoyer une requête GET à https://partaage.vercel.app/api en définissant le paramètre "cities" comme une liste de codes INSEE séparés par ",".

Exemple : https://partaage.vercel.app/api?cities=67062,67063