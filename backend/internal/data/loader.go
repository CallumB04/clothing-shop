//go:build !mockitems

package data

import (
	"encoding/json"
	"os"

	"github.com/CallumB04/clothing-shop/backend/internal/models"
)

const itemsFilePath string = "data/items.json"
const discountCodesFilePath string = "data/discount_codes.json"

// Read items.json and return a slice of Item objects.
func LoadItems() ([]models.Item, error) {
	// Read data from file.
	data, err := os.ReadFile(itemsFilePath)

	if err != nil {
		return nil, err
	}

	// Create slice for items and parse raw json data.
	var items []models.Item
	if err := json.Unmarshal(data, &items); err != nil {
		return nil, err
	}

	return items, nil
}

// Read discount_codes.json and return discount code data.
func LoadDiscountCodes() (*models.DiscountCodesData, error) {
	// Read data from file.
	data, err := os.ReadFile(discountCodesFilePath)

	if err != nil {
		return nil, err
	}

	// Create struct for discount data and parse from json
	var dcData models.DiscountCodesData
	if err := json.Unmarshal(data, &dcData); err != nil {
		return nil, err
	}

	return &dcData, nil
}
