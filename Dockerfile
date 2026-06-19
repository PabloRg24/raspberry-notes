FROM node:20-alpine AS frontend-builder

WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm install
COPY frontend .
RUN npm run build

FROM golang:1.26-alpine AS backend-builder

RUN apk add --no-cache gcc musl-dev sqlite-dev

WORKDIR /app

COPY backend/go.mod backend/go.sum ./
RUN go mod download

COPY backend .
COPY --from=frontend-builder /app/frontend/dist ./frontend

RUN CGO_ENABLED=1 GOOS=linux CGO_CFLAGS="-DSQLITE_ENABLE_FTS5" go build -o server cmd/main.go

FROM alpine:latest

RUN apk add --no-cache sqlite-libs

WORKDIR /app

COPY --from=backend-builder /app/server .
COPY --from=backend-builder /app/db ./db
COPY --from=backend-builder /app/frontend ./frontend

EXPOSE 8080

CMD ["./server"]
