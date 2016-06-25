# Installing production server

Veiller à ce que `nodeJs` soit installé, si ce n'est pas le cas installez-le.

# Init ENV

copier le contenu du fichier `env.conf` dans le fichier `/etc/init/env.conf`, créez-le au besoin, et complétez l'IP par l'IP du serveur.
Lancer le script `server_install.sh`.

# Lancer l'application

Exécutez la commande suivante: `pm2 start <app>`.

Le tour est joué, l'application est lancée.
