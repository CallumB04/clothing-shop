package api

import (
	"net/http"
	"time"

	"github.com/CallumB04/clothing-shop/backend/internal/checkout"
	"github.com/CallumB04/clothing-shop/backend/internal/models"
	"github.com/CallumB04/clothing-shop/backend/internal/util"
	"go.uber.org/zap"
)

type discountResponseBody struct {
	State models.DiscountCodeState `json:"state"`
	Value float64                  `json:"value"`
}

// Pass discount code into checker function and return validity and value if valid
func handleDiscountCodeCheck(logger *zap.Logger) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		startTime := time.Now()

		code := r.URL.Query().Get("code") // get discount code from url

		state, value := checkout.CheckDiscountCodeEligibility(code)

		responseBody := discountResponseBody{State: state, Value: value}

		// Return discount code eligibility state and value (0.0 if not active)
		util.JSONResponse(w, http.StatusOK, responseBody, logger, r, startTime)
	}
}
