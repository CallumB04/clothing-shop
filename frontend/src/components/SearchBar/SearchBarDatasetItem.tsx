import { Link } from "react-router-dom";
import ItemImage from "../ItemImage/ItemImage";
import { DarkText } from "../Text/DarkText";
import { LightText } from "../Text/LightText";
import type { SearchBarData } from "./SearchBar";

interface SearchBarDatasetItemProps {
    data: SearchBarData;
    clearQuery: () => void;
}

const SearchBarDatasetItem: React.FC<SearchBarDatasetItemProps> = ({
    data,
    clearQuery,
}) => {
    return (
        <Link
            to={data.to}
            className="flex cursor-pointer items-center gap-4 rounded-md transition-colors duration-200 hover:bg-[#f1f1f1]"
            onClick={clearQuery}
        >
            {data.previewImageURL && (
                <ItemImage
                    src={data.previewImageURL}
                    className="w-12 rounded-md"
                />
            )}
            <div className="flex flex-col gap-1 p-1">
                <DarkText className="line-clamp-2 text-sm font-semibold">
                    {data.title}
                </DarkText>
                {data.description && (
                    <LightText className="text-xs">
                        {data.description}
                    </LightText>
                )}
            </div>
        </Link>
    );
};

export default SearchBarDatasetItem;
