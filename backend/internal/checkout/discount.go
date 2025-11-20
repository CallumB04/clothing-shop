package checkout

import (
	"github.com/CallumB04/clothing-shop/backend/internal/data"
	"github.com/CallumB04/clothing-shop/backend/internal/models"
)

// Calculate total price of basket after discount
func CalculateBasketTotalAfterDiscount(price float64, discount float64) float64 {
	if price <= 0.0 {
		return 0.0
	}

	if discount <= 0.0 {
		return price
	}

	if discount > 1.0 {
		discount = 1.0
	}

	return price * (1.0 - discount)
}

// Check if discount code is active, inactive or doesnt exist in discount codes data
// Returns eligibility and value (if active)
func CheckDiscountCodeEligibility(code string) (models.DiscountCodeState, float64) {
	dcData, err := data.LoadDiscountCounts()

	// Return invalid if discount code data load errors
	if err != nil {
		return models.DiscountCodeInvalid, 0.0
	}

	// Check active discount codes
	for _, dc := range dcData.Active {
		if dc.Code == code {
			return models.DiscountCodeActive, dc.Value
		}
	}

	// Check inactive discount codes
	for _, dc := range dcData.Inactive {
		if dc == code {
			return models.DiscountCodeInactive, 0.0
		}
	}

	// Return invalid if discount code was not found
	return models.DiscountCodeInvalid, 0.0
}
