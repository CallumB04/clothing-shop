import Card from "@/components/Card/Card";
import Divider from "@/components/Divider/Divider";
import Icon from "@/components/Icon/Icon";
import PageHeader from "@/components/PageHeader/PageHeader";
import LightClickableText from "@/components/Text/LightClickableText";
import DefaultSidebar from "@/layout/DefaultSidebar/DefaultSidebar";
import { Link } from "react-router-dom";
import CheckoutPageBasketTable from "./components/CheckoutPageBasketTable";
import { DarkText } from "@/components/Text/DarkText";
import { useBasket } from "@/context/BasketContext";
import CheckoutEmptyBasketPage from "./CheckoutEmptyBasketPage";
import { useQuery } from "@tanstack/react-query";
import { calculateBasketTotal } from "@/api";
import LoadingSpinner from "@/components/LoadingSpinner/LoadingSpinner";
import { useEffect, useState } from "react";
import TextInput from "@/components/TextInput/TextInput";
import UIButton from "@/components/Button/UIButton";
import { LightText } from "@/components/Text/LightText";
import { ToastType, useToaster } from "@/context/ToasterContext";
import { ErrorText } from "@/components/Text/ErrorText";

interface CheckoutPageProps {
    isMobileSidebarOpen?: boolean;
}

const CheckoutPage: React.FC<CheckoutPageProps> = ({ isMobileSidebarOpen }) => {
    const { basket } = useBasket();
    const { addToast } = useToaster();

    const [discount, setDiscount] = useState<number>(0);
    const [discountCodeInput, setDiscountCodeInput] = useState<string>("");

    // Calculate basket total from API
    const {
        isPending: totalPending,
        error: totalError,
        data: totalData,
    } = useQuery({
        queryKey: ["totalData", basket, discount], // recalculate whenever basket or discount changes
        queryFn: () => calculateBasketTotal(basket, discount),
        enabled: basket.length > 0, // dont calculate when empty basket
    });

    // Error toast if basket calculation failed
    useEffect(() => {
        if (totalError) {
            addToast(
                "Failed to Calculate Total",
                "Sorry, we were unable to calculate your basket total, please try again",
                ToastType.Error,
                5000
            );
        }
    }, [totalError]);

    // Show redirect page if empty basket
    if (basket.length === 0) {
        return (
            <CheckoutEmptyBasketPage
                isMobileSidebarOpen={isMobileSidebarOpen}
            />
        );
    }

    return (
        <>
            <DefaultSidebar open={isMobileSidebarOpen} />
            <main className="mx-auto flex max-w-360 flex-col gap-8 px-2 py-4 sm:px-4 sm:py-6">
                {/* Back to shop text */}
                <Link to="/shop" className="group flex items-center gap-1">
                    <Icon
                        icon="chevron_left"
                        className="text-light-text group-hover:text-charcoal text-sm transition-colors duration-200"
                    />
                    <LightClickableText>Back to shop</LightClickableText>
                </Link>
                <div className="flex w-full flex-col gap-6 xl:flex-row">
                    {/* Basket + details (left) */}
                    <Card className="flex w-full flex-col gap-6 xl:min-w-0 xl:flex-1">
                        {/* Basket */}
                        <span className="flex items-center gap-1.5">
                            <PageHeader text="Your Basket" />
                            <DarkText className="text-sm">
                                ({basket.length}{" "}
                                {basket.length === 1 ? "item" : "items"})
                            </DarkText>
                        </span>
                        <CheckoutPageBasketTable />
                        <Divider />
                        {/* Details */}
                        <PageHeader text="Your Details" />
                    </Card>

                    {/* Checkout (right) */}
                    <Card className="flex w-full flex-col gap-4 xl:w-80 xl:flex-none">
                        <PageHeader text="Checkout" />
                        <Divider />
                        {/* Discount Code */}
                        <span className="flex w-full gap-2">
                            <TextInput
                                fullWidth
                                placeholder="Enter discount code..."
                                onChange={(e) => setDiscountCodeInput(e)}
                            />
                            <UIButton className="h-10!">Apply</UIButton>
                        </span>
                        <Divider />
                        {/* Subtotals and Costs */}
                        <div className="flex w-full flex-col gap-2">
                            {/* Basket Total */}
                            <span className="flex w-full items-center justify-between">
                                <LightText className="text-xs">
                                    Basket Total
                                </LightText>
                                {totalPending ? (
                                    <LoadingSpinner className="size-4!"></LoadingSpinner>
                                ) : totalError ? (
                                    <ErrorText className="text-xs">
                                        Failed
                                    </ErrorText>
                                ) : (
                                    <DarkText className="text-xs font-semibold">
                                        £{totalData?.total.toFixed(2)}
                                    </DarkText>
                                )}
                            </span>
                            {/* Discounted Total */}
                            {totalData?.discountedTotal !==
                                totalData?.total && (
                                <span className="flex w-full items-center justify-between">
                                    <LightText className="text-xs">
                                        Discounted Total
                                    </LightText>
                                    <DarkText className="text-discount-text! text-xs font-semibold">
                                        £{totalData?.discountedTotal.toFixed(2)}
                                    </DarkText>
                                </span>
                            )}
                            {/* Shipping Costs */}
                            <span className="flex w-full items-center justify-between">
                                <LightText className="text-xs">
                                    Shipping
                                </LightText>
                                <LightText className="text-xs">
                                    Enter details to calculate
                                </LightText>
                            </span>
                        </div>
                        <Divider />
                        {/* Overall total */}
                        <span className="flex w-full items-center justify-between">
                            <LightText className="text-sm">Total</LightText>
                            {totalPending ? (
                                <LoadingSpinner className="size-5!"></LoadingSpinner>
                            ) : totalError ? (
                                <ErrorText className="text-sm">
                                    Failed
                                </ErrorText>
                            ) : (
                                <DarkText className="text-sm font-semibold">
                                    £{totalData?.discountedTotal.toFixed(2)}
                                </DarkText>
                            )}
                        </span>
                    </Card>
                </div>
            </main>
        </>
    );
};

export default CheckoutPage;
