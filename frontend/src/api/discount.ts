import axios from "axios";

// Models
export enum DiscountCodeState {
    Active,
    Inactive,
    Invalid,
}

export interface DiscountCheckResponseBody {
    state: DiscountCodeState;
    value: number;
}

export interface ActiveDiscount {
    code: string;
    value: number;
}

// API Calls
export const checkDiscountCodeEligibility = async (
    code: string
): Promise<DiscountCheckResponseBody> => {
    try {
        const resp = await axios.get<DiscountCheckResponseBody>("/discount", {
            params: { code: code },
        });
        return resp.data;
    } catch (err) {
        console.error("Error checking discount code: ", err);
        return { state: DiscountCodeState.Invalid, value: 0.0 };
    }
};
