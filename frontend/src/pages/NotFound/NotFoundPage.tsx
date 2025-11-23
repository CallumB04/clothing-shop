import RedirectButton from "@/components/Button/RedirectButton";
import { DarkText } from "@/components/Text/DarkText";
import { LightText } from "@/components/Text/LightText";
import usePageTitle from "@/hooks/usePageTitle/usePageTitle";
import DefaultSidebar from "@/layout/DefaultSidebar/DefaultSidebar";

interface NotFoundPageProps {
    isMobileSidebarOpen?: boolean;
}

const NotFoundPage: React.FC<NotFoundPageProps> = ({ isMobileSidebarOpen }) => {
    usePageTitle("Page not Found - Clothing Shop");
    return (
        <>
            <DefaultSidebar open={isMobileSidebarOpen} />
            <main className="mt-0! flex h-screen flex-col items-center justify-center gap-6 px-2 text-center sm:px-4">
                <div className="flex flex-col gap-1">
                    <DarkText className="text-center text-9xl">404</DarkText>
                    <DarkText className="text-center text-4xl">
                        PAGE NOT FOUND
                    </DarkText>
                </div>
                <LightText>
                    The page you are looking for does not exist or is
                    temporarily unavailable.
                </LightText>
                <RedirectButton to="/">Return to Home Page</RedirectButton>
            </main>
        </>
    );
};

export default NotFoundPage;
