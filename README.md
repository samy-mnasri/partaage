# PARTAAGE

Cet outil génère un document GeoJSON de la fusion de plusieurs villes françaises d'après leurs codes INSEE (via geo.api.gouv.fr).

Pour l'utiliser, envoyer une requête GET à https://partaage.herokuapp.com/ en définissant le paramètre "cities" comme une liste de codes INSEE séparés par ",".

Exemple : https://partaage.herokuapp.com/?cities=67062,67063