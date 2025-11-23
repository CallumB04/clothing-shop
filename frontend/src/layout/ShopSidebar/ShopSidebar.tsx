import { capitalize } from "@/util/capitalize";
import Sidebar from "../Sidebar/Sidebar";
import ShopSidebarBreadcrumbs from "./ShopSidebarBreadcrumbs";
import SidebarItems from "../Sidebar/SidebarItems";
import SidebarItem from "../Sidebar/SidebarItem";
import SearchBar from "@/components/SearchBar/SearchBar";

interface ShopSidebarProps {
    isMobileSidebarOpen: boolean;
    gender: string | undefined;
    category: string;
    eligibleCategories: string[];
    setMinPrice: (e: number) => void;
    setMaxPrice: (e: number) => void;
    setSearchQuery: (e: string) => void;
}

const ShopSidebar: React.FC<ShopSidebarProps> = ({
    isMobileSidebarOpen,
    gender,
    category,
    eligibleCategories,
    setMinPrice,
    setMaxPrice,
    setSearchQuery,
}) => {
    return (
        <Sidebar visibleDesktop visibleMobile={isMobileSidebarOpen}>
            <ShopSidebarBreadcrumbs gender={gender} category={category} />
            <SearchBar
                placeholder="Search for item..."
                onQueryChange={(e) => setSearchQuery(e)}
            />
            <SidebarItems>
                {eligibleCategories.map((c) => {
                    return (
                        <SidebarItem
                            key={c}
                            label={capitalize(c)}
                            icon="chevron_right"
                            to={
                                gender
                                    ? `/shop/${gender}?category=${c}`
                                    : `/shop?category=${c}`
                            }
                            selected={category === c}
                        />
                    );
                })}
            </SidebarItems>
        </Sidebar>
    );
};

export default ShopSidebar;
