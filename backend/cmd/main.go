package main

import (
	"log"
	"net/http"

	"github.com/PabloRg24/pi-notes/internal/database"
	"github.com/PabloRg24/pi-notes/internal/handlers"
	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
)

func main() {
	db, err := database.New("data/notes.db")
	if err != nil {
		log.Fatal("Error connecting to database:", err)
	}
	defer db.Close()

	notesHandler := handlers.NewNotesHandler(db)

	r := chi.NewRouter()
	r.Use(middleware.Logger)
	r.Use(middleware.Recoverer)

	r.Get("/health", func(w http.ResponseWriter, r *http.Request) {
		w.Write([]byte("ok"))
	})

	r.Route("/api/notes", func(r chi.Router) {
		r.Get("/", notesHandler.List)
		r.Post("/", notesHandler.Create)
		r.Get("/search", notesHandler.Search)
		r.Put("/{id}", notesHandler.Update)
		r.Delete("/{id}", notesHandler.Delete)
	})

	log.Println("Server running on :8080")
	http.ListenAndServe(":8080", r)
}