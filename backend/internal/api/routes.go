package api

import (
	"net/http"

	"go.uber.org/zap"
)

// Register route handlers to given patterns.
func RegisterHandlers(logger *zap.Logger) *http.ServeMux {
	// Create multiplexer.
	mux := http.NewServeMux()

	// Root
	mux.Handle("GET /", handleRoot(logger))
	// Items
	mux.Handle("GET /items", handleGetItems(logger))
	mux.Handle("GET /items/{id}", handleGetItemByID(logger))
	// Checkout
	mux.Handle("POST /checkout", handleCheckout(logger))
	// Discount Codes
	mux.Handle("GET /discount", handleDiscountCodeCheck(logger))

	// Return multiplexer to main function for starting server.
	return mux
}
