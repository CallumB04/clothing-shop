interface ButtonProps {
    children: React.ReactNode;
    onClick?: () => void;
    disabled?: boolean;
    className?: string;
}

const Button: React.FC<ButtonProps> = ({
    children,
    onClick,
    disabled,
    className,
}) => {
    return (
        <button
            className={`flex h-max items-center justify-center transition-colors duration-300 ${className} ${!disabled && "cursor-pointer"} `}
            onClick={onClick}
            disabled={disabled}
        >
            {children}
        </button>
    );
};

export default Button;
