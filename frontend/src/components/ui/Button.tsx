import React from "react"; 

interface ButtonProps {
    label: string;
    variant?: "primary" | "secondary";
    type?: "button" | "submit";
    onClick?: () => void;
    isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
    label,
    variant = "primary",
    type = "button",
    isLoading = false,
    onClick, 
}) => {
    const baseStyle = "px-4 py-2 rounded font-medium";
    const varianStyle = {
        primary: "bg-[#802D43] text-white",
        secondary: "border border-[#802D43] text-[#802D43]"
    };
    return (
        <button
            type={type}
            disabled={isLoading}
            onClick={onClick} 
            className={`${baseStyle} ${varianStyle[variant]}`}
        >
            {isLoading ? "Loading..." : label}
        </button>
    );
};

export default Button;