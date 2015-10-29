# WTC

WTC est un service qui vous permettra d'organiser vos voyages.

----
## Comment l'installer ?

Pour cela rien de plus simple, il suffit de cloner le projet, d'installer [MongoDB](https://www.mongodb.org/), puis de lancer les commandes suivantes.

    npm install
    bower install
Et c'est fait.

----
## Lancer le serveur
Pas plus compliqué, vérifiez que votre base ``MongoDB`` est lancée, puis éxécutez la tache suivante:
 
    grunt serve

ça y est, votre serveur est lancé, et votre page devrais s'ouvrir dans votre navigateur favori.

----
## Générer la documentation

La documentation des API utilise [apidoc](https://apidocjs.com), insérez les annotations qui vont bien dans votre code (Je vous l'accorde, c'est long (trés long)), puis lancez la commande:

    npm run-script docgen
La documentation sera disponible dans le dossier ``apidoc`` à la racine du projet. Si vous avez lancé le serveur, la documentation se regénérera automatiquement lors de la modification d'un fichier est sera disponible à l'adresse suivante: [http://localhost:9000/doc](http://localhost:9000/doc)

#TODO
A vous de jouer.
