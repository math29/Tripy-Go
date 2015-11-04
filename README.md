# WTC

WTC est un service qui vous permettra d'organiser vos voyages.

----
## Comment l'installer ?

Pour cela rien de plus simple, il suffit de cloner le projet, d'installer [MongoDB](https://www.mongodb.org/), puis de lancer les commandes suivantes.

    npm install
    bower install
    sudo npm install grunt -g
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
    grep '^<.*>$' report/xunit.xml > report/xunit1.xml
    grunt jshint:jenkins --force || true

Attention, les commandes `grunt test:jenkins` et `grep` ne fonctionnerons que sur une machine `UNIX` dans un premier temps, avant qu'elles fonctionne sur une machine de type `Windows` il faudra mettre en place une nouvelle stratégie de `log`.

---
## Afficher les résultats

Pour afficher les rapports de test, il suffit de rajouter deux étapes à la suite du build, la première concernera l'analyse de type `Checkstyle`, le chemin vers le fichier à consulter sera `report/jshint.xml`.

La seconde étape sera celle concernant les tests unitaire, il faudra là indiquer le chemin suivant: `report/xunit1.xml`.

## Et voilà

Il ne vous reste plus qu'à `lancer un build du projet` et observer les résultats.


----
## changelog
* 1-Novembre-2015 Ajout de l'intégration de Jenkins
