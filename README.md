# Docker-First Attempt

## Introduction

This is an attempt to include Drupal 8 & Reactjs (Node based Frontend) together within a docker. You can use it to learn or develop headless Drupal applications.

#### List of containers included:

- Traefik - *prabhakarhub_traefik*
- Mailhog - *prabhakarhub_mailhog*
- Portainer - *prabhakarhub_portainer*
- PHP - *prabhakarhub_php*
- PMA - *prabhakarhub_pma*
- Mariadb - *prabhakarhub_mariadb*
- Node - *prabhakarhub_node*

To ssh into containers run command `docker exec -it <container_name> bash`

#### Steps to use:

1. Make sure you are inside `drupal8_with_reactjs` (`prahub` is updated more frequently) or directory containing `docker-compose.yml`
2. Make copy of .env.example & rename to .env
3. Run `docker-compose up -d`
4. SSH into PHP container (`docker exec -it prabhakarhub_php bash` in this case) and run `composer install`
5. SSH into PHP container and run `drush cim -y` 
6. Exit from PHP container.

#### Paths to remember:

1. Drupal 8 - http://prahub.docker.localhost:8888
2. Reactjs - http://app.prahub.docker.localhost:8888

You can change port number, container names, paths etc by editing .env file.

#### @TODOs:

1. Consolidate multiple setup commands to single command
2. Preservation of container data even after removal
3. Pass environment variables from .env to reactjs
4. Better documentation

Any help or suggestion are always welcome.

## 