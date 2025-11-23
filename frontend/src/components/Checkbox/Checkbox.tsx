import Icon from "../Icon/Icon";
import { DarkText } from "../Text/DarkText";

interface CheckboxProps {
    label?: string;
    className?: string;
    checked: boolean;
    toggleChecked: () => void;
}

const Checkbox: React.FC<CheckboxProps> = ({
    label,
    className,
    checked,
    toggleChecked,
}) => {
    return (
        <span
            className={`flex cursor-pointer items-center gap-1 ${className}`}
            onClick={toggleChecked}
        >
            <Icon icon={checked ? "check_box" : "check_box_outline_blank"} />
            {label && (
                <DarkText className="line-clamp-2 text-sm">{label}</DarkText>
            )}
        </span>
    );
};

export default Checkbox;
