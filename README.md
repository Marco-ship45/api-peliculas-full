# API de Películas + Frontend

Práctica full stack: una **API REST** con Node.js, Express y MongoDB (patrón MVC) y un **frontend en JavaScript Vanilla** que la consume con un CRUD completo.

| Carpeta | Contenido |
|---------|-----------|
| [`api-peliculas/`](api-peliculas) | Backend: API REST (Express + Mongoose, MVC) |
| [`Front-api-peliculas/`](Front-api-peliculas) | Frontend: HTML, CSS y JavaScript Vanilla |

## Ejecución rápida

Requisitos: Node.js 18+ y MongoDB corriendo en local (o una URI de MongoDB Atlas).

```bash
# 1. Backend
cd api-peliculas
npm install
copy .env.example .env    # macOS/Linux: cp .env.example .env
npm run dev               # http://localhost:4000/api/peliculas

# 2. Frontend
# Abrir Front-api-peliculas/index.html con Live Server (VS Code)
```

## Endpoints

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/api/peliculas` | Lista todas las películas |
| GET | `/api/peliculas/:id` | Obtiene una película por id |
| POST | `/api/peliculas` | Crea una película |
| PUT | `/api/peliculas/:id` | Actualiza una película |
| DELETE | `/api/peliculas/:id` | Elimina una película |

Más detalles en el [README del backend](api-peliculas/README.md) y el [README del frontend](Front-api-peliculas/README.md).
