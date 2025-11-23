import { eligibleSizes, type Item } from "@/api";
import Popup from "@/components/Popup/Popup";
import PopupHeader from "@/components/Popup/PopupHeader";
import { useEffect, useState } from "react";
import ShopItemVariation from "../ShopItem/ShopItemVariation";
import ItemSize from "@/components/ItemSize/ItemSize";
import ItemImage from "@/components/ItemImage/ItemImage";
import UIButton from "@/components/Button/UIButton";
import { useBasket } from "@/context/BasketContext";

interface PreviewPopupProps {
    item: Item | null;
    closePopup: () => void;
}

const PreviewPopup: React.FC<PreviewPopupProps> = ({ item, closePopup }) => {
    const [selectedVariation, setSelectedVariation] = useState<string>("0");
    const [selectedSize, setSelectedSize] = useState<string>("XS");

    const { basket, addBasketItem, removeBasketItem } = useBasket();

    // reset selectedSize when variation changes
    useEffect(() => {
        setSelectedSize("XS");
    }, [selectedVariation]);

    // helper function to check if current item, including variation and size, is in basket
    const isItemInBasket = () => {
        return basket.some(
            (bi) =>
                bi.itemID === item?.id &&
                bi.variationID === selectedVariation &&
                bi.size === selectedSize
        );
    };

    // helper function to check if current item, including variation and size, has stock
    const itemHasStock = () => {
        return (
            (item?.variations
                .find((v) => v.id === selectedVariation)
                ?.sizes.find((s) => s.size === selectedSize)?.stock ?? 0) > 0 ||
            false
        );
    };

    return (
        <Popup closePopup={closePopup}>
            <span className="flex flex-col gap-6 sm:flex-row">
                {/* Left Side - Image of clothing item */}
                <ItemImage
                    src={
                        item?.variations.find((v) => v.id === selectedVariation)
                            ?.imageURL
                    }
                    alt={"Picture of " + item?.name}
                    className="w-80 rounded sm:w-72"
                />
                {/* Right Side - Details */}
                <div className="flex flex-col justify-between gap-6">
                    <div className="flex flex-col gap-4">
                        {/* Header -> Item Name and Price */}
                        <PopupHeader
                            title={item!.name}
                            description={`£${item!.priceGBP}`}
                            replacedDescription={
                                item?.discountPriceGBP
                                    ? `£${item!.discountPriceGBP.toString()}`
                                    : ""
                            }
                            closePopup={closePopup}
                            className="max-w-80 sm:max-w-96"
                        />
                        {/* Item Variation Preview Colors */}
                        <div className="flex max-w-[286px] flex-wrap items-center gap-2 sm:max-w-[258px]">
                            {item!.variations.map((variation) => (
                                <ShopItemVariation
                                    key={variation.id}
                                    variation={variation}
                                    selected={
                                        selectedVariation === variation.id
                                    }
                                    setSelected={setSelectedVariation}
                                />
                            ))}
                        </div>
                        {/* Item Sizes */}
                        <div className="flex max-w-[274px] flex-wrap items-center gap-2">
                            {eligibleSizes.map((size) => (
                                <ItemSize
                                    key={size}
                                    size={size}
                                    selected={selectedSize === size}
                                    setSelected={setSelectedSize}
                                />
                            ))}
                        </div>
                    </div>
                    {/* Add to Basket OR Not in Stock (disabled) Button */}
                    <UIButton
                        fullWidth
                        disabled={!itemHasStock()}
                        danger={isItemInBasket()}
                        onClick={
                            itemHasStock() && isItemInBasket()
                                ? () =>
                                      removeBasketItem(
                                          {
                                              itemID: item!.id,
                                              variationID: selectedVariation,
                                              size: selectedSize,
                                              quantity: 1,
                                          },
                                          true
                                      )
                                : () =>
                                      addBasketItem(
                                          {
                                              itemID: item!.id,
                                              variationID: selectedVariation,
                                              size: selectedSize,
                                              quantity: 1,
                                          },
                                          true
                                      )
                        }
                    >
                        {itemHasStock()
                            ? isItemInBasket()
                                ? "Remove from Basket"
                                : "Add to Basket"
                            : "Not in Stock"}
                    </UIButton>
                </div>
            </span>
        </Popup>
    );
};

export default PreviewPopup;
