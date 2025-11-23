interface ItemPageSizeProps {
    size: string;
    inStock: boolean;
    selected: boolean;
    setSelected: (id: string) => void;
}

const ItemPageSize: React.FC<ItemPageSizeProps> = ({
    size,
    inStock,
    selected,
    setSelected,
}) => {
    return (
        <p
            className={`font-primary relative flex size-12 items-center justify-center rounded-full text-center text-sm font-semibold tracking-wide ${inStock ? "hover:border-charcoal border-light-text cursor-pointer border-2" : "bg-input-border border-0"} ${selected ? "bg-charcoal text-background! border-0!" : "bg-background text-charcoal"}`}
            onClick={() => {
                if (inStock) setSelected(size);
            }}
            title={inStock ? "" : "Out of Stock"}
        >
            {size}
            {!inStock && (
                <div className="absolute top-1/2 left-1/2 h-0.25 w-7/6 -translate-x-1/2 -translate-y-1/2 -rotate-45 bg-black"></div>
            )}
        </p>
    );
};

export default ItemPageSize;
