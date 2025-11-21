//go:build mockitems

package data

import "github.com/CallumB04/clothing-shop/backend/internal/models"

func LoadItems() ([]models.Item, error) {

	jeansDiscount := 22.99

	return []models.Item{
		{ID: "0", Name: "T-Shirt", Gender: "M", Categories: []string{}, PriceGBP: 10.00, Variations: []models.ItemVariation{}},
		{ID: "1", Name: "Jeans", Gender: "W", Categories: []string{}, PriceGBP: 29.99, DiscountPriceGBP: &jeansDiscount, Variations: []models.ItemVariation{}},
		{ID: "2", Name: "Sweater", Gender: "M", Categories: []string{}, PriceGBP: 12.95, Variations: []models.ItemVariation{}},
	}, nil
}

func LoadDiscountCodes() (*models.DiscountCodesData, error) {

	return &models.DiscountCodesData{
		Active: []models.DiscountCode{
			{
				Code:  "SALE10",
				Value: 0.1,
			},
			{
				Code:  "SALE20",
				Value: 0.2,
			},
			{
				Code:  "XMAS2025",
				Value: 0.15,
			},
		},
		Inactive: []string{"SUMMER2025"},
	}, nil

}
