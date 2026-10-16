# 🎬 Catálogo de Películas (Frontend)

Interfaz web en **JavaScript Vanilla** que consume la [API de Películas](../api-peliculas) para listar, crear, editar y eliminar películas.

## Estructura

```
Front-api-peliculas/
├── index.html   # Formulario + listado
├── style.css    # Estilos
└── script.js    # Lógica y consumo de la API con fetch
```

## Cómo ejecutarlo

1. Levanta el backend (`npm run dev` en `api-peliculas`), que queda en `http://localhost:4000`.
2. Abre `index.html` con **Live Server** (extensión de VS Code).

La URL de la API está definida al inicio de `script.js`:

```js
const API_URL = 'http://localhost:4000/api/peliculas';
```

## Funcionalidades

| Acción   | Método HTTP | Cómo se usa en la interfaz                                   |
|----------|-------------|--------------------------------------------------------------|
| Listar   | GET         | Al cargar la página y después de cada operación              |
| Crear    | POST        | Llenar el formulario y pulsar **Guardar Película**           |
| Editar   | GET + PUT   | **Editar** carga la película en el formulario → **Actualizar** |
| Eliminar | DELETE      | **Eliminar** pide confirmación y la borra                    |

## Manejo de errores

- Los mensajes de éxito se muestran en verde y los de error en rojo.
- Si la API responde con `{ ok: false, mensaje }`, se muestra ese mensaje al usuario (por ejemplo, `La calificación máxima es 10`).
- Si el servidor está apagado, se avisa: *"No se pudo conectar con la API. ¿Está el servidor encendido en el puerto 4000?"*.
- El botón **Guardar** se deshabilita mientras se procesa la petición para evitar envíos duplicados.
- El listado se pinta con `textContent` para evitar inyección de HTML.
