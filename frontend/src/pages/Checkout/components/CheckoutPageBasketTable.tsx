import { DarkText } from "@/components/Text/DarkText";
import { useBasket } from "@/context/BasketContext";
import CheckoutPageBasketTableRow from "./CheckoutPageBasketTableRow";
import Divider from "@/components/Divider/Divider";

const CheckoutPageBasketTable = () => {
    const { basket } = useBasket();

    return (
        <div className="flex flex-col gap-2">
            {/* Table Header */}
            <span className="flex gap-4 pl-2 text-sm font-semibold">
                <DarkText className="w-full">Item</DarkText>
                <DarkText className="hidden w-32 flex-none text-center lg:block">
                    Size
                </DarkText>
                <DarkText className="hidden w-40 flex-none text-center md:block">
                    Quantity
                </DarkText>
                <DarkText className="hidden w-36 flex-none text-center sm:block">
                    Approx. Total
                </DarkText>
                {/* Empty span, column for item removal, but no header */}
                <span className="w-12 flex-none"></span>
            </span>
            <Divider />
            {/* Table Rows */}
            {/* Max 3 items showing at a time */}
            <div className="mt-1 flex max-h-72 flex-col gap-4 overflow-scroll">
                {basket.map((bi) => (
                    <CheckoutPageBasketTableRow
                        key={bi.itemID + bi.variationID + bi.size}
                        basketItem={bi}
                    />
                ))}
            </div>
        </div>
    );
};

export default CheckoutPageBasketTable;
