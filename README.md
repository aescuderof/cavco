# API de Reservas de Hoteles

Aplicación de servicios construida con Node.js y Express para gestionar reservas de hoteles. El proyecto incluye las operaciones CRUD y consultas adicionales mediante filtros sobre un conjunto de datos en memoria.

## Requisitos

- Node.js 18 o superior.
- npm 9 o superior.

## Configuración del entorno

1. Clona el repositorio.
2. Copia el archivo `.env` de ejemplo o crea uno nuevo estableciendo el puerto de ejecución:

   ```env
   PORT=3000
   ```

3. Instala las dependencias del proyecto:

   ```bash
   npm install
   ```

4. Inicia el servidor en modo desarrollo:

   ```bash
   npm run dev
   ```

   También puedes ejecutar la aplicación en modo producción usando:

   ```bash
   npm start
   ```

## Estructura del proyecto

```
.
├─ .env
├─ .gitignore
├─ .prettierrc
├─ controllers
│  └─ reservasController.js
├─ routes
│  └─ reservasRoutes.js
├─ utils
│  └─ id.js
├─ server.js
└─ README.md
```

## Endpoints disponibles

| Método | Endpoint | Descripción |
| ------ | -------- | ----------- |
| POST   | `/api/reservas` | Crear una reserva. |
| GET    | `/api/reservas` | Listar todas las reservas o filtrarlas por `hotel`, `fecha_inicio`, `fecha_fin`, `tipo_habitacion`, `estado` o `num_huespedes`. |
| GET    | `/api/reservas/:id` | Obtener una reserva específica por su identificador. |
| PUT    | `/api/reservas/:id` | Actualizar completamente la información de una reserva. |
| DELETE | `/api/reservas/:id` | Eliminar una reserva existente. |

## Ejemplos de filtros

- `GET /api/reservas?hotel=Hotel%20Paraíso`
- `GET /api/reservas?fecha_inicio=2023-12-20&fecha_fin=2023-12-31`
- `GET /api/reservas?tipo_habitacion=suite`
- `GET /api/reservas?estado=pendiente`
- `GET /api/reservas?num_huespedes=5`

Los filtros pueden combinarse en una única solicitud.

## Documentación con OpenAPI (opcional)

La API está diseñada para que puedas documentarla fácilmente con Swagger/OpenAPI. Puedes generar una especificación iniciando un archivo `openapi.yaml` e integrarlo con herramientas como Swagger UI Express. Consulta la [documentación oficial de OpenAPI](https://swagger.io/specification/) para conocer las convenciones empleadas en equipos internacionales.
