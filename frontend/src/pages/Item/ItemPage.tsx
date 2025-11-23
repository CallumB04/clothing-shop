import {
    type BasketItem,
    eligibleSizes,
    fetchItemById,
    type Item,
} from "@/api";
import DefaultSidebar from "@/layout/DefaultSidebar/DefaultSidebar";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NotFoundPage from "../NotFound/NotFoundPage";
import ItemImage from "@/components/ItemImage/ItemImage";
import { DarkText } from "@/components/Text/DarkText";
import { LightText } from "@/components/Text/LightText";
import ItemPageVariation from "./components/ItemPageVariation";
import ItemPageSize from "./components/ItemPageSize";
import PrimaryButton from "@/components/Button/PrimaryButton";
import { useBasket } from "@/context/BasketContext";
import SecondaryButton from "@/components/Button/SecondaryButton";
import QuantitySelector from "@/components/QuantitySelector/QuantitySelector";
import LightClickableText from "@/components/Text/LightClickableText";
import SizeGuidePopup from "@/components/SizeGuidePopup/SizeGuidePopup";
import Summary from "@/components/Summary/Summary";
import TextInput from "@/components/TextInput/TextInput";
import UIButton from "@/components/Button/UIButton";
import usePageTitle from "@/hooks/usePageTitle/usePageTitle";
interface ItemPageProps {
    isMobileSidebarOpen?: boolean;
}

const ItemPage: React.FC<ItemPageProps> = ({ isMobileSidebarOpen }) => {
    const [item, setItem] = useState<Item | undefined>(undefined);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const [selectedVariation, setSelectedVariation] = useState<string>(""); // selected variation id
    const [selectedSize, setSelectedSize] = useState<string>("XS");

    // basket item corresponding to current item, variation and size, if exists
    const [basketItem, setBasketItem] = useState<BasketItem | undefined>(
        undefined
    );

    // Popup Visibilities
    const [sizeGuidePopupVisible, setSizeGuidePopupVisible] =
        useState<boolean>(false);

    const { basket, addBasketItem, removeBasketItem } = useBasket();

    const { id } = useParams(); // get item id from url

    usePageTitle(`${item?.name} - Clothing Shop`);

    // fetching item using id in url
    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            if (id) {
                const resp = await fetchItemById(id);

                if (resp) {
                    setItem(resp);
                }
                setIsLoading(false);
            }
        };

        fetchData();
    }, [id]);

    // reset selected variation and size when item changes
    useEffect(() => {
        if (item) {
            setSelectedVariation(item.variations[0].id);
            setSelectedSize("XS");
        }
    }, [item]);

    // search for item in basket whenever item, variation or size changes
    // if not found, set state to undefined
    useEffect(() => {
        const bi = basket.find(
            (i) =>
                i.itemID === item?.id &&
                i.variationID === selectedVariation &&
                i.size === selectedSize
        );

        setBasketItem(bi);
    });

    // if tried to fetch item and doesnt exist, show not found page
    if (!isLoading && !item) {
        return <NotFoundPage isMobileSidebarOpen={isMobileSidebarOpen} />;
    }

    return (
        <>
            <DefaultSidebar open={isMobileSidebarOpen} />
            <main className="px-4 py-8 sm:px-6 lg:py-16">
                <div className="mx-auto flex max-w-[1200px] flex-col items-center gap-8 lg:flex-row lg:items-start">
                    {/* Item name and price - Small screens - Above item image */}
                    <div className="flex flex-col gap-1 lg:hidden">
                        <DarkText className="text-center text-xl font-semibold sm:text-2xl">
                            {item?.name}
                        </DarkText>
                        <LightText className="text-center text-sm sm:text-base">
                            £{item?.priceGBP}
                        </LightText>
                    </div>
                    <ItemImage
                        src={
                            item?.variations.find(
                                (v) => v.id === selectedVariation
                            )?.imageURL
                        }
                        className="w-full rounded-md lg:w-1/2 2xl:w-2/3"
                    />
                    <div className="flex w-full flex-col gap-10 lg:w-1/2 2xl:w-1/3">
                        {/* Item name and price - Large screens */}
                        <div className="hidden flex-col gap-1 lg:flex">
                            <DarkText className="text-2xl font-semibold">
                                {item?.name}
                            </DarkText>
                            <span className="flex gap-2">
                                <LightText
                                    className={
                                        item?.discountPriceGBP
                                            ? "line-through"
                                            : ""
                                    }
                                >
                                    £{item?.priceGBP}
                                </LightText>
                                {item?.discountPriceGBP && (
                                    <LightText className="text-discount-text!">
                                        £{item.discountPriceGBP}
                                    </LightText>
                                )}
                            </span>
                        </div>
                        {/* Variations label and selections */}
                        <div className="flex flex-col gap-4">
                            {/* Selected variation label */}
                            <span className="flex gap-1">
                                <DarkText className="font-semibold">
                                    Variation:
                                </DarkText>
                                <DarkText className="font-light">
                                    {
                                        item?.variations.find(
                                            (v) => v.id === selectedVariation
                                        )?.name
                                    }
                                </DarkText>
                            </span>
                            {/* Item Variations */}
                            <div className="flex flex-wrap gap-2">
                                {item?.variations.map((v) => (
                                    <ItemPageVariation
                                        key={v.id}
                                        variation={v}
                                        selected={v.id === selectedVariation}
                                        setSelected={() =>
                                            setSelectedVariation(v.id)
                                        }
                                    />
                                ))}
                            </div>
                        </div>
                        {/* Item Sizes */}
                        <div className="flex flex-col gap-4">
                            <span className="flex w-full justify-between">
                                <DarkText className="font-semibold">
                                    Size:
                                </DarkText>
                                <LightClickableText
                                    onClick={() =>
                                        setSizeGuidePopupVisible(true)
                                    }
                                    underlined
                                >
                                    Size Guide
                                </LightClickableText>
                            </span>

                            <div className="flex max-w-96 flex-wrap justify-between gap-2">
                                {eligibleSizes.map((s) => (
                                    <ItemPageSize
                                        key={s}
                                        size={s}
                                        selected={s === selectedSize}
                                        setSelected={() => setSelectedSize(s)}
                                    />
                                ))}
                            </div>
                        </div>
                        <div className="flex w-full flex-col items-end gap-2">
                            {basketItem ? (
                                <SecondaryButton
                                    onClick={() =>
                                        removeBasketItem(
                                            {
                                                itemID: item!.id,
                                                variationID: selectedVariation,
                                                size: selectedSize,
                                                quantity:
                                                    basketItem?.quantity || 1,
                                            },
                                            true
                                        )
                                    }
                                    className="w-full"
                                >
                                    Remove from Basket
                                </SecondaryButton>
                            ) : (
                                <PrimaryButton
                                    onClick={() =>
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
                                    className="w-full"
                                >
                                    Add to Basket
                                </PrimaryButton>
                            )}
                            {/* Quanity selector, when item in basket */}
                            {basketItem && (
                                <QuantitySelector
                                    onIncrement={() =>
                                        addBasketItem({
                                            itemID: item!.id,
                                            variationID: selectedVariation,
                                            size: selectedSize,
                                            quantity: 1,
                                        })
                                    }
                                    onDecrement={() =>
                                        removeBasketItem({
                                            itemID: item!.id,
                                            variationID: selectedVariation,
                                            size: selectedSize,
                                            quantity: 1,
                                        })
                                    }
                                    quantity={basketItem.quantity}
                                    className="text-sm"
                                    iconClassName="text-sm"
                                />
                            )}
                        </div>
                        {/* Summary Components (extra info) */}
                        <div className="flex flex-col gap-2">
                            {/* Shipping */}
                            <Summary
                                header="Shipping options"
                                className="w-full"
                            >
                                <span className="flex justify-between gap-8">
                                    <div className="flex flex-col gap-0.5">
                                        <DarkText className="font-medium">
                                            In-Store Pickup
                                        </DarkText>
                                        <LightText>
                                            Items are free to pickup from any
                                            store. If we don't have it in stock,
                                            we promise to have it ready within
                                            2-3 working days
                                        </LightText>
                                    </div>
                                    <DarkText className="text-discount-text font-medium">
                                        Free
                                    </DarkText>
                                </span>
                                <span className="flex justify-between gap-8">
                                    <div className="flex flex-col gap-0.5">
                                        <DarkText className="font-medium">
                                            Standard Delivery
                                        </DarkText>
                                        <LightText>
                                            Within 3-4 working days
                                        </LightText>
                                    </div>
                                    <DarkText className="font-medium">
                                        £2.99
                                    </DarkText>
                                </span>
                                <span className="flex justify-between gap-8">
                                    <div className="flex flex-col gap-0.5">
                                        <DarkText className="font-medium">
                                            Express Delivery
                                        </DarkText>
                                        <LightText>
                                            Within 1-2 working days
                                        </LightText>
                                    </div>
                                    <DarkText className="font-medium">
                                        £4.99
                                    </DarkText>
                                </span>
                                <span className="flex justify-between gap-8">
                                    <div className="flex flex-col gap-0.5">
                                        <DarkText className="font-medium">
                                            Next-day Delivery
                                        </DarkText>
                                        <LightText>
                                            Within 24 hours, only eligible for
                                            certain items and locations
                                        </LightText>
                                    </div>
                                    <DarkText className="font-medium">
                                        £6.49
                                    </DarkText>
                                </span>
                            </Summary>
                            {/* Returns */}
                            <Summary header="Returns" className="w-full">
                                <DarkText className="font-semibold">
                                    You have a 28 day return period from the day
                                    the product was shipped to you
                                </DarkText>
                                <span className="flex justify-between gap-8">
                                    <div className="flex flex-col gap-0.5">
                                        <DarkText className="font-medium">
                                            In-Store Return
                                        </DarkText>
                                        <LightText>
                                            Items are free to return to any
                                            store within the country the
                                            purchase was made
                                        </LightText>
                                    </div>
                                    <DarkText className="text-discount-text font-medium">
                                        Free
                                    </DarkText>
                                </span>
                                <span className="flex justify-between gap-8">
                                    <div className="flex flex-col gap-0.5">
                                        <DarkText className="font-medium">
                                            Mail Return
                                        </DarkText>
                                        <LightText>
                                            You can mail your item to one of our
                                            pickup points. You must pay up to
                                            £3.99 of the shipping costs, we will
                                            cover any difference
                                        </LightText>
                                    </div>
                                    <DarkText className="font-medium">
                                        £3.99
                                    </DarkText>
                                </span>
                                <span className="flex justify-between gap-8">
                                    <div className="flex flex-col gap-0.5">
                                        <DarkText className="font-medium">
                                            Courier Pickup
                                        </DarkText>
                                        <LightText>
                                            You can request one of our trusted
                                            couriers to pick up your item, to
                                            complete your return
                                        </LightText>
                                    </div>
                                    <DarkText className="font-medium">
                                        £5.99
                                    </DarkText>
                                </span>
                            </Summary>
                            {/* Availability */}
                            <Summary
                                header="In-store availability"
                                className="w-full"
                            >
                                <div>
                                    <DarkText className="font-semibold">
                                        Tell us where you are
                                    </DarkText>
                                    <LightText>
                                        We will check this item's availability
                                        at your closest store
                                    </LightText>
                                </div>
                                <span className="flex gap-2">
                                    <TextInput
                                        fullWidth
                                        placeholder="Type your location here..."
                                    />
                                    <UIButton>Check</UIButton>
                                </span>
                            </Summary>
                        </div>
                    </div>
                </div>
            </main>

            {/* Popups */}
            {sizeGuidePopupVisible && (
                <SizeGuidePopup
                    item={item}
                    closePopup={() => setSizeGuidePopupVisible(false)}
                />
            )}
        </>
    );
};

export default ItemPage;
