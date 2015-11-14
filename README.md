# WTC

WTC est un service qui vous permettra d'organiser vos voyages.

----
## Comment l'installer ?

Pour cela rien de plus simple, il suffit de cloner le projet, d'installer [MongoDB](https://www.mongodb.org/), puis de lancer les commandes suivantes.

    npm install
    bower install
    npm install -g grunt-cli
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

---
# Logger

Dans le cadre du suivi de l'application, nous avons mis en place un `logger` qui log dans différents environnements.

|  	| Development 	| production 	| test 	|
|---------	|-------------	|------------	|------	|
| Console 	| X 	|  	|  	|
| File 	| X 	| X 	| X 	|
| MongoDB 	|  	| X 	|  	|

pour logger, rien de plus simple, il faut intégrer le fichier du logger `server/config/logger.js` en utilisant `var logger = require(path)`.
Une fois le logger intégré, il ne reste plus qu'à l'utiliser en suivant les différents niveaux d'erreur suivants, du moins important au plus important: `debug`, `ìnfo`, `warn`, `error`.

Exemple:
  
    var logger = require('../../config/logger');
  
    logger.info("Server starting on port: %d in mode: %s", 9000, 'developpement');
    // on peut aussi sauvegarder des objets
    logger.debug("objet provider ", { url: "http://google.com", name:"google"});
  
Il vous est désormais interdit d'utiliser le bon vieux `console.log()`.

Si vous voulez en savoir plus sur le logger utilisé, rendez-vous sur ce [github](https://github.com/winstonjs/winston).
 


---
# Jenkins CI

Si vous souhaitez mettre en place un serveur d'intégration en local, des règles ont été mises en place dans grenu afin de générer des rapports sur le `checkstyle` notamment, mais surtout sur les `tests unitaires`, ce qui rend plus visuel le bon déroulement de ceux-ci.

---
## Prérequis

Avant de créer un Job, veillez à avoir bien configuré Jenkins, il faut avoir installé le plugin `Node JS`et avoir configuré un Node, sinon Jenkins ne pourra pas exécuter les tests.

---
## Création d'un Job

Une fois jenkins configuré, il faut configurer un job, le nom et la description que vous lui donnez n'à pas d'importance, ce qui est important c'est de lui spécifier un répertoire `git`afin qu'il aille récupérer les sources, il faut ensuite cocher `Ajouter le répertoire bin/ de Node/npm au PATH` afin que jenkins puisse exécuter les commandes liées à npm.

## Compiler et tester le projet

Pour compiler et tester le projet, il faut ajouter une étape au build, vous choisirez `exécuter un script shell`, le script sera le suivant:

    npm install
    bower install
    grunt test:jenkins
    grunt jshint:jenkins --force || true

Attention, les commandes `grunt test:jenkins` et `grep` ne fonctionnerons que sur une machine `UNIX` dans un premier temps, avant qu'elles fonctionne sur une machine de type `Windows` il faudra mettre en place une nouvelle stratégie de `log`.

---
## Afficher les résultats

Pour afficher les rapports de test, il suffit de rajouter deux étapes à la suite du build, la première concernera l'analyse de type `Checkstyle`, le chemin vers le fichier à consulter sera `report/jshint.xml`.

La seconde étape sera celle concernant les tests unitaire, il faudra là indiquer le chemin suivant: `report/xunit.xml`.

## Et voilà

Il ne vous reste plus qu'à `lancer un build du projet` et observer les résultats.


---
# Sonar

Sonar permet d'avoir un suivi sur la qualité du code, des un fichier de règle sera mis en place plus tard.

---
## Instalation

Je vous conseille d'instaler la version 5.2 qui est nettement plus belle et plus rapide. Vous pouvez le télécharger à cette adresse: [sonar](http://www.sonarqube.org/downloads/)

Décompressez l'archive dans le dossier qui vous convient, puis allez dans le dossier `bin/votreOS/` puis lancez la commande suivante: 

    ./sonar.sh  start   # pour Linux ou mac
    StartSonar.bat      # pour Windows

Après quelques secondes, vous pourrez accéder à Sonar à sur le port 9000 par défaut, ce qui peut être embétant, étant donné que notre application tourne sur le port 9000 elle aussi.
Pour régler ce problème, ouvrez le fichier `conf/sonar.properties` dans le répertoire de sonar, puis remlacez la ligne 

    sonar.web.port=9000

par la suivante:

    sonar.web.port=8085

et voilà, fini les conflits.

Si vous n'avez pas réussi à lancer Sonar avec les instructions précédentes, suivez le tutoriel suivant pour instaler sonar: [cliquez ici](http://docs.sonarqube.org/display/SONAR/Get+Started+in+Two+Minutes)

---
## Lancer une analyse

Pour lancer l'analyse, il vous suffit d'avoir `sonarRunner` sur votre machine, voire même en variable d'environnement idéalement, puis placez vous à la racine du projet `WTC`, puis lancez la commande suivante:

    sonar-runner

où sonar-runner est la variable d'environnement contenant le chemin vers `sonar-runner` ou le vhemin vers `sonar-runner`,
vous devriez maintenant avoir un rapport dans `sonar`


---
## Configuration

Lorsque vous créerez une branche, il peut être bien de modifier le fichier sonar.properties pour lui changer la clef et le nom.

---
## Docker

Une configuration docker est disponible pour simuler l'environnement de production en place sur `openshift` il y à cependant une impossibilité d'ajouter les images.

pour lancer le container, rien de plus simple, après avoir installé `Docker`, lancez les commandes suivantes:

  # Construction du container
  docker-compose build
  # lancement du container
  docker-compose up

----
## changelog
* 1-Novembre-2015 Ajout de l'intégration de Jenkins
* 5-Novembre-2015 Ajout de la notice Sonar
* 7-Novembre-2015 Ajout de la notice du logger
