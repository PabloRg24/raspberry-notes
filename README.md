# 📝 Pi Notes

Aplicación de notas personales con soporte Markdown, desplegada en una Raspberry Pi 3B. Cada usuario tiene su propio espacio privado de notas, accesible desde cualquier dispositivo de la red local o de forma remota a través de Tailscale.

## ✨ Características

- Editor Markdown con previsualización en tiempo real
- Guardado automático (sin botón guardar)
- Búsqueda full-text sobre título, contenido y tags
- Autenticación con JWT — cada usuario ve solo sus notas
- Registro e inicio de sesión desde la propia app
- Desplegado en Docker con reinicio automático

## 🛠️ Stack técnico

| Capa | Tecnología |
|---|---|
| Backend | Go + Chi |
| Frontend | React + Vite + Tailwind CSS |
| Base de datos | SQLite con FTS5 |
| Infraestructura | Docker + docker-compose |
| Acceso remoto | Tailscale |
| Hardware | Raspberry Pi 3B |

## 🏗️ Arquitectura

```
pi-notes/
├── backend/          # API REST en Go
│   ├── cmd/          # Punto de entrada (main.go)
│   ├── internal/
│   │   ├── database/ # Conexión y migraciones SQLite
│   │   ├── handlers/ # Handlers HTTP y middleware JWT
│   │   └── models/   # Modelos de datos
│   ├── db/           # Schema SQL
│   └── Dockerfile
├── frontend/         # App React
│   └── src/
│       ├── components/
│       └── services/
└── docker-compose.yml
```

## 🚀 Endpoints de la API

| Método | Ruta | Descripción | Auth |
|---|---|---|---|
| POST | `/auth/register` | Crear usuario | No |
| POST | `/auth/login` | Iniciar sesión, devuelve JWT | No |
| GET | `/api/notes` | Listar notas del usuario | Sí |
| POST | `/api/notes` | Crear nota | Sí |
| PUT | `/api/notes/:id` | Actualizar nota | Sí |
| DELETE | `/api/notes/:id` | Borrar nota | Sí |
| GET | `/api/notes/search?q=` | Búsqueda full-text | Sí |

## ⚙️ Instalación y despliegue

### Requisitos

- Raspberry Pi con Docker y docker-compose instalados
- Go 1.26+ (solo para desarrollo)
- Node.js 20+ (solo para desarrollo)

### Despliegue en la Pi

```bash
git clone https://github.com/PabloRg24/pi-notes.git
cd pi-notes
docker-compose up -d
```

La app quedará disponible en `http://<IP-de-la-Pi>:8080` y se reiniciará automáticamente al arrancar la Pi.

### Desarrollo local

```bash
# Backend
cd backend
CGO_CFLAGS="-DSQLITE_ENABLE_FTS5" go build -o server cmd/main.go && ./server

# Frontend (en otro terminal)
cd frontend
npm install
npm run dev
```

El frontend corre en `localhost:5173` y hace proxy al backend en `localhost:8080`.

### Build del frontend para producción

```bash
cd frontend
npm run build
rm -rf ../backend/frontend
cp -r dist ../backend/frontend
git add .
git commit -m "chore: update frontend build"
git push
```

En la Pi:

```bash
git pull
docker-compose down
docker-compose up --build -d
```

## 🔐 Decisiones técnicas

**Go** — binario estático, arranque en milisegundos y consumo mínimo de RAM. Ideal para la Pi 3B con 1GB de memoria.

**SQLite + FTS5** — sin servidor de base de datos. FTS5 permite búsqueda full-text eficiente sobre las notas sin dependencias externas.

**JWT sin estado** — el servidor no guarda sesiones. El token expira en 24 horas y contiene el `user_id` para aislar las notas de cada usuario.

**Docker** — el contenedor arranca automáticamente con `restart: unless-stopped`. La base de datos persiste en un volumen local fuera del contenedor.

**Tailscale** — acceso remoto seguro sin abrir puertos en el router ni necesitar IP pública fija.

## 🗺️ Próximas mejoras

- [ ] Exportar notas a fichero `.md`
- [ ] Modo oscuro
- [ ] CI/CD con GitHub Actions
- [ ] Tags como chips clicables para filtrar

## 👤 Autor

Pablo Rodríguez — [github.com/PabloRg24](https://github.com/PabloRg24)
