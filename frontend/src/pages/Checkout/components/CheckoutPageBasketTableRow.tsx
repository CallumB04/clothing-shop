import { fetchItemById, type Item, type BasketItem } from "@/api";
import Icon from "@/components/Icon/Icon";
import ItemImage from "@/components/ItemImage/ItemImage";
import LoadingSpinner from "@/components/LoadingSpinner/LoadingSpinner";
import QuantitySelector from "@/components/QuantitySelector/QuantitySelector";
import { DarkText } from "@/components/Text/DarkText";
import { LightText } from "@/components/Text/LightText";
import { useBasket } from "@/context/BasketContext";
import { useEffect, useMemo, useState } from "react";

interface CheckoutPageBasketTableRowProps {
    basketItem: BasketItem;
}

const CheckoutPageBasketTableRow: React.FC<CheckoutPageBasketTableRowProps> = ({
    basketItem,
}) => {
    const [item, setItem] = useState<Item | undefined>(undefined);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const { addBasketItem, removeBasketItem } = useBasket();

    // fetching item from basket item
    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);

            const resp = await fetchItemById(basketItem.itemID);
            if (resp) {
                setItem(resp);
            }

            setIsLoading(false);
        };

        fetchData();
    }, [basketItem]);

    // get info of variation of item in the basket
    // saves needing to re-iterate through every time variation data is needed
    const itemVariation = useMemo(
        () => item?.variations.find((v) => v.id),
        [item]
    );

    // show loading spinner until item details are fetched from backend
    if (!item) {
        return (
            <span className="mx-auto flex h-16 items-center">
                <LoadingSpinner className="size-10" />
            </span>
        );
    }

    return (
        <span className="flex items-center gap-4">
            {/* Item image, name and variation */}
            <span className="flex w-full items-center gap-4 px-2">
                <ItemImage
                    src={itemVariation?.imageURL}
                    className="w-16 rounded"
                />
                <div className="flex flex-col gap-0.5">
                    <DarkText className="line-clamp-2 font-semibold">
                        {item?.name}
                    </DarkText>
                    <LightText className="text-sm font-light">
                        {itemVariation?.name}
                    </LightText>
                    <DarkText className="text-sm font-light lg:hidden">
                        Size: {basketItem.size}
                    </DarkText>
                </div>
            </span>
            {/* Size */}
            <span className="hidden w-32 flex-none lg:block">
                <DarkText className="text-center text-sm">
                    {basketItem.size}
                </DarkText>
            </span>
            {/* Quantity */}
            <span className="hidden w-40 flex-none md:block">
                <QuantitySelector
                    onIncrement={() =>
                        addBasketItem({ ...basketItem, quantity: 1 })
                    }
                    onDecrement={() =>
                        removeBasketItem({ ...basketItem, quantity: 1 })
                    }
                    quantity={basketItem.quantity}
                    className="mx-auto w-max text-sm"
                    iconClassName="text-sm"
                />
            </span>
            {/* Total */}
            <span className="hidden w-36 flex-none flex-col sm:flex">
                {/* Full price crossed out, if discounted */}
                {item?.discountPriceGBP && (
                    <LightText className="text-center text-xs line-through">
                        £{item.priceGBP}
                    </LightText>
                )}
                {/* Item active price, full or discount */}
                <DarkText
                    className={`text-center text-sm ${item?.discountPriceGBP ? "text-discount-text!" : ""}`}
                >
                    £
                    {item?.discountPriceGBP
                        ? (item.discountPriceGBP * basketItem.quantity).toFixed(
                              2
                          )
                        : item
                          ? (item.priceGBP * basketItem.quantity).toFixed(2)
                          : "..."}
                </DarkText>
                {/* Empty div to keep full price centered if discount exists */}
                {item?.discountPriceGBP && <div className="h-4"></div>}
            </span>
            {/* Item removal */}
            <span className="h-4.5 w-12 flex-none">
                <Icon
                    icon="close"
                    className="text-light-text hover:text-charcoal mx-auto text-xs transition-colors duration-150"
                    title="Remove from Basket"
                    onClick={() => removeBasketItem(basketItem)}
                />
            </span>
        </span>
    );
};

export default CheckoutPageBasketTableRow;
