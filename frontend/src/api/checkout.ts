import axios from "axios";
import type { Basket } from "./basket";

export interface BasketTotal {
    total: number;
    discountedTotal: number;
}

export const calculateBasketTotal = async (
    basket: Basket,
    discountCode?: string
): Promise<BasketTotal | undefined> => {
    try {
        const resp = await axios.post<BasketTotal>("/checkout", {
            basket,
            discountCode,
        });
        return resp.data;
    } catch (err) {
        console.error("Error calculating total: ", err);
        return undefined;
    }
};
