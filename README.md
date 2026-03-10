# Museos CDMX - Mapa Interactivo

Mapa interactivo de todos los museos de la Ciudad de Mexico construido con React, Leaflet y OpenStreetMap. 100% gratuito y open source, sin necesidad de API keys.

## Caracteristicas

- Mapa interactivo con tiles de CARTO/OpenStreetMap (gratis)
- 20 museos de la CDMX con marcadores personalizados por categoria
- Clic en cada marcador: nombre, descripcion, direccion, horario y costo
- Buscador y filtros por categoria en el sidebar
- Disenio responsivo (desktop y movil)
- Listo para publicar en GitHub Pages

## Correr localmente

    npm install
    npm run dev

Abre http://localhost:5173 en tu navegador.

## Tecnologias

- React + Vite
- React-Leaflet (mapa interactivo)
- OpenStreetMap / CARTO (tiles del mapa) - Gratis
- TailwindCSS v4
- gh-pages (deploy a GitHub Pages)

## Publicar en GitHub Pages

1. Crea un repositorio en GitHub y agregalo como remoto:

    git init
    git remote add origin https://github.com/TU_USUARIO/museos-cdmx.git
    git add .
    git commit -m "first commit"
    git push -u origin main

2. Publica con un solo comando:

    npm run deploy

   Esto construye el proyecto y lo sube a la rama gh-pages automaticamente.

3. En tu repositorio de GitHub, ve a Settings > Pages y selecciona la rama gh-pages.

## Museos incluidos (20 museos)

- Museo Nacional de Antropologia
- Museo del Templo Mayor
- Museo Frida Kahlo (Casa Azul)
- Museo Nacional de Arte (MUNAL)
- Museo de Arte Moderno
- Museo Jumex
- Museo Soumaya
- Castillo de Chapultepec
- Museo de Arte Popular
- MUAC (UNAM)
- Museo de la Ciudad de Mexico
- Palacio de Bellas Artes
- Museo Dolores Olmedo
- Casa de Leon Trotsky
- Universum - Ciencias UNAM
- Museo Anahuacalli
- Museo Rufino Tamayo
- Museo de Geologia UNAM
- Museo Mural Diego Rivera
- Museo del Caracol
