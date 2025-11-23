import { useEffect, useState } from "react";
import Icon from "@/components/Icon/Icon";
import SearchBar from "@/components/SearchBar/SearchBar";
import { useBasket } from "@/context/BasketContext";
import NavbarItem from "./NavbarItem";
import NavbarLogo from "./NavbarLogo";
import Clickable from "@/components/Clickable/Clickable";
import { useLocation } from "react-router-dom";
import { DarkText } from "@/components/Text/DarkText";
import { fetchItems, type Item } from "@/api";

interface NavbarProps {
    isMobileSidebarOpen: boolean;
    toggleMobileSidebar: () => void;
    toggleBasketDropdown: () => void;
}

const Navbar: React.FC<NavbarProps> = ({
    isMobileSidebarOpen,
    toggleMobileSidebar,
    toggleBasketDropdown,
}) => {
    const [items, setItems] = useState<Item[]>([]);

    const { basket } = useBasket();
    const location = useLocation();

    // close mobile sidebar when changing pages
    useEffect(() => {
        if (isMobileSidebarOpen) {
            toggleMobileSidebar();
        }
    }, [location]);

    // Fetch all items from API for search bar dataset
    useEffect(() => {
        const fetchData = async (): Promise<void> => {
            let data = await fetchItems();
            setItems(data);
        };

        fetchData();
    }, []);

    return (
        <nav className="h-navbar-height bg-background border-b-layout-border fixed top-0 left-0 z-20 flex w-screen items-center justify-between border-b-1 px-4 xl:px-16">
            {/* Left side (Big screen): Logo and Navigation */}
            <span className="hidden items-center gap-12 lg:flex">
                <NavbarLogo />
                <NavbarItem label="Men's" toLocation="/shop/mens" />
                <NavbarItem label="Women's" toLocation="/shop/womens" />
                <NavbarItem
                    label="New Arrivals"
                    toLocation="/shop?category=new"
                />
                <NavbarItem label="Offers" toLocation="/shop?category=offers" />
            </span>

            {/* Left Side (Small screen) */}
            <Clickable onClick={toggleMobileSidebar} className="lg:hidden">
                <Icon icon={isMobileSidebarOpen ? "close" : "menu"} />
            </Clickable>

            {/* Center (Small screen) */}
            <span className="ml-2 lg:hidden">
                <NavbarLogo />
            </span>

            {/* Right side: Search Bar and Basket */}
            <span className="flex items-center gap-6">
                {/* Search bar hidden on Small screen */}
                <SearchBar
                    onSearch={() => alert("Searching...")}
                    className="hidden lg:flex"
                    dataset={items.map((i) => ({
                        title: i.name,
                        description: i.priceGBP.toString(),
                        previewImageURL: i.variations[0].imageURL,
                        to: `/item/${i.id}`,
                    }))}
                />
                <Clickable
                    onClick={() => toggleBasketDropdown()}
                    className="px-2"
                >
                    <Icon icon="shopping_bag" />
                    <DarkText>{basket.length}</DarkText>
                </Clickable>
            </span>
        </nav>
    );
};

export default Navbar;
