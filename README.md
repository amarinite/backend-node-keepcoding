# Nodepop

Nodepop es una API de compraventa de productos creada para el módulo de desarrollo Backend para el bootcamp de Keepcoding. Para inicializar la aplicación, es necesario instalar sus dependencias:

```sh
npm install
```

A continuación, inicializa la base de datos para crear los anuncios predefinidos con los que trabajará la API:

```
npm run init-db
```

Para iniciar la aplicación en producción:

```sh
npm start
```

Para iniciar la aplicación en modo desarrollo:

```sh
npm run dev
```

## Documentación de la API

Para consultar la lista completa de anuncios:

```sh
http://localhost:3000/api/anuncios
```

Para consultar la lista completa de tags disponibles:

```sh
http://localhost:3000/api/anuncios/tags
```

## Filtros de búsqueda

Para filtrar por campo, se puede utilizar "apiv1/anuncios?{campo}={elemento}". Ejemplo:

```sh
http://localhost:3000/api/anuncios?nombre=Pelota
```

Para filtrar por venta o compra, se puede utilizar el campo venta con el valor true o false. Ejemplo:

```sh
http://localhost:3000/api/anuncios?venta=true
```

Para filtrar por precio, puede buscarse un precio concreto o un rango de precios, con un mínimo y/o un máximo. Ejemplo:

```sh
http://localhost:3000/api/anuncios?precio=0-100
```

## Paginación de resultados

Para especificar los resultados que quieren mostrarse y los anuncios que se deben saltar para paginar las respuestas, podemos utilizar skip y limit en la petición. Ejemplo:

```sh
http://localhost:3000/api/anuncios?skip=2&limit=2
```

## Ordenar resultados

Para ordenar resultados, puede usarse la palabra clave "sort" en la petición. Un ejemplo, ordenado por precio:

```sh
http://localhost:3000/api/anuncios?sort=precio
```
