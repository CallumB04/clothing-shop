import { createContext, useContext, useState } from "react";
import type { Basket, BasketItem } from "@/api";
import { ToastType, useToaster } from "./ToasterContext";

type BasketContextType = {
    basket: Basket;
    addBasketItem: (item: BasketItem, showToast?: boolean) => void;
    removeBasketItem: (item: BasketItem, showToast?: boolean) => void;
    clearBasket: (showToast?: boolean) => void;
};

const BasketContext = createContext<BasketContextType | undefined>(undefined);

export const useBasket = () => {
    const context = useContext(BasketContext);
    if (!context) {
        throw new Error("useBasket must be used within a BasketProvider");
    }

    return context;
};

// function to check if two basket items are the same (item, variation and size)
export const checkBasketItemMatch = (a: BasketItem, b: BasketItem): boolean => {
    return (
        a.itemID === b.itemID &&
        a.variationID === b.variationID &&
        a.size === b.size
    );
};

export const BasketProvider = ({ children }: { children: React.ReactNode }) => {
    const [basket, setBasket] = useState<Basket>([]);
    const { addToast } = useToaster();

    const addBasketItem = (item: BasketItem, showToast?: boolean) => {
        setBasket((currentBasket) => {
            // check if that item of that variation and size already exists in basket
            const existsInBasket = currentBasket.find((basketItem) =>
                checkBasketItemMatch(basketItem, item)
            );

            // if item already exists in basket, will increase quantity instead of creating new item
            if (existsInBasket) {
                return currentBasket.map((basketItem) => {
                    return checkBasketItemMatch(basketItem, item)
                        ? {
                              ...basketItem,
                              quantity: basketItem.quantity + item.quantity,
                          }
                        : basketItem;
                });
            }

            // if new item, add to basket
            return [...currentBasket, item];
        });

        // add success toast
        if (showToast) {
            addToast(
                "Item Added",
                "This item has been successfully added to your basket",
                ToastType.Info,
                5000
            );
        }
    };

    const removeBasketItem = (item: BasketItem, showToast?: boolean) => {
        setBasket((currentBasket) => {
            return (
                currentBasket
                    .map((basketItem) => {
                        // decrease basket item quantity by specified amount
                        if (checkBasketItemMatch(basketItem, item)) {
                            return {
                                ...basketItem,
                                quantity: basketItem.quantity - item.quantity,
                            };
                        }
                        return basketItem;
                    })
                    // remove any items with 0 or less quantiy
                    .filter((basketItem) => basketItem.quantity > 0)
            );
        });

        // add success toast
        if (showToast) {
            addToast(
                "Item Removed",
                "This item has been successfully removed from your basket",
                ToastType.Info,
                5000
            );
        }
    };

    const clearBasket = (showToast?: boolean) => {
        setBasket([]);
        if (showToast) {
            addToast(
                "Basket Empty",
                "Your basket has now been cleared",
                ToastType.Info,
                5000
            );
        }
    };

    return (
        <BasketContext.Provider
            value={{ basket, addBasketItem, removeBasketItem, clearBasket }}
        >
            {children}
        </BasketContext.Provider>
    );
};
