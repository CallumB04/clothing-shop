import DefaultSidebar from "@/layout/DefaultSidebar/DefaultSidebar";
import { DarkText } from "@/components/Text/DarkText";
import HomePageNavigator from "./components/HomePageNavigator";
import usePageTitle from "@/hooks/usePageTitle/usePageTitle";

interface HomePageProps {
    isMobileSidebarOpen?: boolean;
}

const HomePage: React.FC<HomePageProps> = ({ isMobileSidebarOpen }) => {
    usePageTitle("Home - Clothing Shop");
    return (
        <>
            <DefaultSidebar open={isMobileSidebarOpen} />
            <main className="flex flex-col gap-8 px-2 py-4 sm:px-4 sm:py-6">
                <DarkText className="text-center text-4xl font-semibold uppercase">
                    Clothing Shop
                </DarkText>
                <span className="mx-auto flex max-w-260 flex-col justify-center gap-4 md:flex-row">
                    <HomePageNavigator
                        to="/shop/mens"
                        src="https://img.hollisterco.com/is/image/anf/KIC_325-5161-00128-904_life1"
                        text="Men's"
                    />
                    <HomePageNavigator
                        to="/shop/womens"
                        src="https://img.hollisterco.com/is/image/anf/KIC_347-5080-00255-131_life1"
                        text="Women's"
                    />
                </span>
            </main>
        </>
    );
};

export default HomePage;
