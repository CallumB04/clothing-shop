import type { Ref } from "react";

interface TextInputProps {
    fullWidth?: boolean;
    placeholder?: string;
    className?: string;
    onChange?: (input: string) => void;
    ref?: Ref<HTMLInputElement>;
    defaultValue?: any;
}

const TextInput: React.FC<TextInputProps> = ({
    fullWidth = false,
    placeholder = "Type here...",
    className,
    onChange,
    ref,
    defaultValue,
}) => {
    const handleChange = (newInput: string) => {
        if (onChange) {
            onChange(newInput); // call prop function to pass input value to parent
        }
    };

    return (
        <input
            type="text"
            placeholder={placeholder}
            className={`border-input-border text-charcoal font-primary focus:border-charcoal flex h-10 rounded-md border-1 px-4 text-sm transition-colors duration-300 outline-none ${fullWidth ? "w-full" : "w-56"} ${className}`}
            onChange={(e) => handleChange(e.target.value)}
            ref={ref}
            defaultValue={defaultValue}
        />
    );
};

export default TextInput;
