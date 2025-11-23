import type { ItemVariation } from "@/api";

interface ShopItemVariationProps {
    variation: ItemVariation;
    selected: boolean;
    setSelected: (id: string) => void;
}

const ShopItemVariation: React.FC<ShopItemVariationProps> = ({
    variation,
    selected,
    setSelected,
}) => {
    return (
        <div
            title={variation.name}
            className={`bg-background border-light-text rounded-full ${selected ? "border-2 p-[1px]" : "border-1 p-0.5"} h-max cursor-pointer`}
            onClick={() => setSelected(variation.id)}
        >
            <div
                className="size-7 rounded-full sm:size-6"
                style={{ backgroundColor: variation.previewColor }}
            ></div>
        </div>
    );
};

export default ShopItemVariation;
