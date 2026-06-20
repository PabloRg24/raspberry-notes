FROM golang:1.26-alpine AS builder

RUN apk add --no-cache gcc musl-dev sqlite-dev

WORKDIR /app

COPY backend/go.mod backend/go.sum ./
RUN go mod download

COPY backend .

RUN CGO_ENABLED=1 GOOS=linux CGO_CFLAGS="-DSQLITE_ENABLE_FTS5" go build -o server cmd/main.go

FROM alpine:latest

RUN apk add --no-cache sqlite-libs

WORKDIR /app

COPY --from=builder /app/server .
COPY --from=builder /app/db ./db
COPY backend/frontend ./frontend

EXPOSE 8080

CMD ["./server"]