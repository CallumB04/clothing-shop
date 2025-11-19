interface ErrorTextProps {
    children: React.ReactNode;
    className?: string;
    onClick?: () => void;
}
export const ErrorText: React.FC<ErrorTextProps> = ({
    children,
    className,
    onClick,
}) => {
    return (
        <p
            className={`font-primary text-danger ${className}`}
            onClick={onClick}
        >
            {children}
        </p>
    );
};
