import RedirectButton from "@/components/Button/RedirectButton";
import { DarkText } from "@/components/Text/DarkText";
import { LightText } from "@/components/Text/LightText";
import DefaultSidebar from "@/layout/DefaultSidebar/DefaultSidebar";

interface CheckoutEmptyBasketPageProps {
    isMobileSidebarOpen?: boolean;
}

const CheckoutEmptyBasketPage: React.FC<CheckoutEmptyBasketPageProps> = ({
    isMobileSidebarOpen,
}) => {
    return (
        <>
            <DefaultSidebar open={isMobileSidebarOpen} />
            <main className="mt-0! flex h-screen flex-col items-center justify-center gap-6 px-2 text-center sm:px-4">
                <div className="flex flex-col gap-1">
                    <DarkText className="text-center text-6xl">
                        Empty Basket
                    </DarkText>
                </div>
                <LightText className="max-w-140">
                    You cannot checkout with an empty basket, please return to
                    our shop and add items to your basket before proceeding.
                </LightText>
                <RedirectButton to="/shop">Return to Shop</RedirectButton>
            </main>
        </>
    );
};

export default CheckoutEmptyBasketPage;
