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

interface CheckoutPageProps {
    isMobileSidebarOpen?: boolean;
}

const CheckoutPage: React.FC<CheckoutPageProps> = ({ isMobileSidebarOpen }) => {
    const { basket } = useBasket();
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
                    </Card>
                </div>
            </main>
        </>
    );
};

export default CheckoutPage;
