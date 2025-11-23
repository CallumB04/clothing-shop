import { useRef, useState } from "react";
import Icon from "../Icon/Icon";
import SearchBarDatasetItem from "./SearchBarDatasetItem";
import { LightText } from "../Text/LightText";

export interface SearchBarData {
    title: string;
    description?: string;
    previewImageURL?: string;
    to: string;
}

interface SearchBarProps {
    fullWidth?: boolean;
    placeholder?: string;
    className?: string;
    dataset?: SearchBarData[];
    onSearch?: (query: string) => void;
    onQueryChange?: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
    fullWidth = false,
    placeholder = "Search",
    className,
    dataset,
    onSearch,
    onQueryChange,
}) => {
    const [query, setQuery] = useState("");

    const searchInput = useRef<HTMLInputElement>(null);

    const handleQueryChange = (newQuery: string) => {
        setQuery(newQuery); // update local state
        if (onQueryChange) {
            onQueryChange(newQuery); // call prop function to allow for searching as you type
        }
    };

    // allow for enter key to also trigger search
    const handleEnterPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (onSearch && e.key === "Enter") {
            onSearch(query);
        }
    };

    return (
        <span
            className={`border-input-border text-charcoal relative flex h-10 items-center gap-2 rounded-full border-1 px-4 ${fullWidth && "w-full"} ${className}`}
        >
            <Icon
                icon="search"
                className="text-sm"
                onClick={() => onSearch && onSearch(query)}
            />
            <input
                type="search"
                placeholder={placeholder}
                className={`font-primary text-sm outline-none ${fullWidth ? "w-full" : "w-56"}`}
                onChange={(e) => handleQueryChange(e.target.value)}
                onKeyDown={handleEnterPress}
                ref={searchInput}
            />
            {/* Dataset dropdown */}
            {dataset && query.length > 0 && (
                <div className="bg-background absolute top-10 left-1/2 mx-auto flex w-9/10 -translate-x-1/2 flex-col gap-2 rounded-lg p-2 shadow-md">
                    {dataset.filter((d) =>
                        d.title.toUpperCase().includes(query.toUpperCase())
                    ).length > 0 ? (
                        dataset
                            .filter((d) =>
                                d.title
                                    .toUpperCase()
                                    .includes(query.toUpperCase())
                            )
                            .slice(0, 3)
                            .map((d) => (
                                <SearchBarDatasetItem
                                    data={d}
                                    clearQuery={() => {
                                        handleQueryChange("");
                                        if (searchInput.current)
                                            searchInput.current.value = "";
                                    }}
                                />
                            ))
                    ) : (
                        <LightText className="text-center text-sm font-light">
                            No results found...
                        </LightText>
                    )}
                </div>
            )}
        </span>
    );
};

export default SearchBar;
