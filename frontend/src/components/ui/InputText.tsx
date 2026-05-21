
import React from "react";

interface InputTextProps{
    label:string;
    name:string;
    error?:string;
    register:any;
}

export const InputText : React.FC<InputTextProps> = ({
    label,
    name,
    error,
    register
    
}) =>   {
    return(
        <div className="flex flex-col gap-1 mb-4">
            <label htmlFor={label}>{label}</label>
            <div className="relative">
                <input 
                type="text"
                {...register(name)} className="border p-2 w-full px-3 py-2 pr-10" 
                placeholder={label}
            />
            {error && <p className="text-red-500">{error}</p>}

            </div>
            
        </div>
    )
}