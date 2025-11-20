package models

type DiscountCode struct {
	Code  string  `json:"code"`
	Value float64 `json:"value"`
}

type DiscountCodesData struct {
	Active   []DiscountCode `json:"active"`
	Inactive []string       `json:"inactive"`
}

type DiscountCodeState int

const (
	DiscountCodeActive DiscountCodeState = iota
	DiscountCodeInactive
	DiscountCodeInvalid
)
