# API de Películas (Backend)

API REST para gestionar un catálogo de películas, construida con **Node.js, Express y MongoDB (Mongoose)** y organizada con el patrón **MVC**.

## Tecnologías

- Node.js 18+
- Express
- MongoDB + Mongoose
- cors, dotenv
- nodemon (desarrollo)

## Estructura (MVC)

```
api-peliculas/
├── src/
│   ├── config/
│   │   └── db.js                      # Conexión a MongoDB
│   ├── models/
│   │   └── Pelicula.js                # M: esquema y validaciones
│   ├── controllers/
│   │   └── peliculas.controller.js    # C: lógica de negocio (CRUD)
│   ├── routes/
│   │   └── peliculas.routes.js        # Rutas → controladores
│   ├── app.js                         # Configuración de Express
│   └── server.js                      # Arranque del servidor
├── postman/
│   └── API-Peliculas.postman_collection.json
├── .env.example
└── package.json
```

> La "Vista" del MVC es el JSON que se devuelve al cliente.

## Instalación y ejecución

```bash
npm install
cp .env.example .env     # en Windows: copy .env.example .env
npm run dev              # desarrollo (nodemon)
npm start                # producción
```

Variables de entorno (`.env`):

| Variable    | Ejemplo                                         |
|-------------|-------------------------------------------------|
| `PORT`      | `4000`                                          |
| `MONGO_URI` | `mongodb://127.0.0.1:27017/db_peliculas`        |

La API queda disponible en `http://localhost:4000/api/peliculas`. CORS está habilitado para que el frontend la consuma desde otro puerto.

## Contrato de la API

| Método | Ruta                  | Descripción                  | Body (JSON)                                          |
|--------|-----------------------|------------------------------|------------------------------------------------------|
| GET    | `/api/peliculas`      | Lista todas las películas    | —                                                    |
| GET    | `/api/peliculas/:id`  | Obtiene una película por id  | —                                                    |
| POST   | `/api/peliculas`      | Crea una película            | `{ titulo, genero, anio, director, calificacion }`   |
| PUT    | `/api/peliculas/:id`  | Actualiza una película       | mismos campos, todos opcionales                      |
| DELETE | `/api/peliculas/:id`  | Elimina una película         | —                                                    |

### Modelo `Pelicula`

| Campo          | Tipo   | Reglas                         |
|----------------|--------|--------------------------------|
| `titulo`       | String | obligatorio                    |
| `genero`       | String | obligatorio                    |
| `anio`         | Number | obligatorio                    |
| `director`     | String | obligatorio                    |
| `calificacion` | Number | entre 0 y 10, por defecto 0    |

Además se guardan `createdAt` y `updatedAt` automáticamente.

### Respuestas

Éxito:

```json
{ "ok": true, "data": { ... } }
```

Error:

```json
{ "ok": false, "mensaje": "Descripción del error" }
```

### Manejo de errores

| Caso                                   | Código | Mensaje de ejemplo                                      |
|----------------------------------------|--------|---------------------------------------------------------|
| Faltan campos obligatorios             | 400    | `El director es obligatorio. El año es obligatorio`     |
| Calificación fuera de rango            | 400    | `La calificación máxima es 10`                          |
| Id con formato inválido                | 400    | `El id proporcionado no es válido`                      |
| Body con JSON mal formado              | 400    | `El body no es un JSON válido`                          |
| Película inexistente                   | 404    | `Película no encontrada`                                |
| Ruta inexistente                       | 404    | `Ruta no encontrada: GET /algo`                         |
| Error del servidor / base de datos     | 500    | `Error al obtener las películas`                        |

## Pruebas

Importa `postman/API-Peliculas.postman_collection.json` en Postman o Thunder Client. La colección guarda automáticamente el `_id` de la película creada, así que puedes ejecutar las peticiones en orden:

1. `POST` crear película
2. `GET` listar películas
3. `GET` obtener por id
4. `PUT` actualizar calificación
5. `DELETE` eliminar película

Incluye también peticiones de error (campos faltantes, id inválido, calificación fuera de rango).

## Frontend

El frontend que consume esta API está en la carpeta [`Front-api-peliculas`](../Front-api-peliculas) de este mismo repositorio (JavaScript Vanilla).
