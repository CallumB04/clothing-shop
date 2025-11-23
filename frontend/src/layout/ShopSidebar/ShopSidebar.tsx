import { capitalize } from "@/util/capitalize";
import Sidebar from "../Sidebar/Sidebar";
import ShopSidebarBreadcrumbs from "./ShopSidebarBreadcrumbs";
import SidebarItems from "../Sidebar/SidebarItems";
import SidebarItem from "../Sidebar/SidebarItem";
import SearchBar from "@/components/SearchBar/SearchBar";
import Divider from "@/components/Divider/Divider";
import TextInput from "@/components/TextInput/TextInput";
import { DarkText } from "@/components/Text/DarkText";

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
            <Divider />
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
            <Divider />
            {/* Pricing filters */}
            <span className="flex w-full items-center gap-3">
                <span className="flex w-full items-center gap-1.5">
                    <DarkText className="text-sm">£</DarkText>
                    <TextInput
                        placeholder="Min price"
                        fullWidth
                        onChange={(e) => setMinPrice(parseFloat(e))}
                    />
                </span>
                <DarkText>-</DarkText>
                <span className="flex w-full items-center gap-1.5">
                    <DarkText className="text-sm">£</DarkText>
                    <TextInput
                        placeholder="Max price"
                        fullWidth
                        onChange={(e) => setMaxPrice(parseFloat(e))}
                    />
                </span>
            </span>
        </Sidebar>
    );
};

export default ShopSidebar;
