import RedirectButton from "@/components/Button/RedirectButton";
import { DarkText } from "@/components/Text/DarkText";
import { LightText } from "@/components/Text/LightText";
import usePageTitle from "@/hooks/usePageTitle/usePageTitle";
import DefaultSidebar from "@/layout/DefaultSidebar/DefaultSidebar";

interface CheckoutCompletePageProps {
    isMobileSidebarOpen?: boolean;
}

const CheckoutCompletePage: React.FC<CheckoutCompletePageProps> = ({
    isMobileSidebarOpen,
}) => {
    usePageTitle("Order Complete - Clothing Shop");
    return (
        <>
            <DefaultSidebar open={isMobileSidebarOpen} />
            <main className="mt-0! flex h-screen flex-col items-center justify-center gap-6 px-2 text-center sm:px-4">
                <div className="flex flex-col gap-1">
                    <DarkText className="text-center text-6xl">
                        Order Complete
                    </DarkText>
                </div>
                <LightText className="max-w-140">
                    Your order has been processed. You will receive an email
                    soon with further information about shipping and other
                    details
                </LightText>
                <RedirectButton to="/shop">Return to Shop</RedirectButton>
            </main>
        </>
    );
};

export default CheckoutCompletePage;
