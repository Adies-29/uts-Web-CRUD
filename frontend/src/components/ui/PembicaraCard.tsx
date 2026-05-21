import type React from "react";
import { Link } from "react-router-dom";

interface PembicaraCardProps {
    id: number;         
    name: string;
    role: string;
    imageUrl: string;
    eventName?: string;
    onDelete: (id: number) => void; 
}

export const PembicaraCard: React.FC<PembicaraCardProps> = ({
    id,
    name,
    role,
    imageUrl,
    onDelete,
}) => {
    return (
        <div className="group cursor-pointer flex flex-col items-center bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden w-full relative">
            
            <div className="w-full h-28 bg-linear-to-r from-[#802D43] to-[#9c3651] relative flex justify-center transition-colors duration-300">
                <div className="absolute -bottom-16 z-10">
                    <img
                        src={imageUrl}
                        alt={name}
                        className="h-32 w-32 rounded-full border-[6px] border-white shadow-md object-cover group-hover:scale-105 transition-transform duration-300 bg-white"
                    />
                </div>
            </div>
            
            
            <div className="pt-20 pb-24 px-6 flex flex-col items-center w-full z-0 relative grow">
            
                <h3 className="text-xl font-bold text-gray-800 text-center mb-1 group-hover:text-[#802D43] transition-colors relative z-10">
                    {name}
                </h3>
                
                <span className="text-sm font-medium px-4 py-1.5 bg-red-50 text-[#802D43] border border-red-100 rounded-full mt-2 text-center relative z-10 shadow-sm group-hover:shadow transition-shadow">
                    {role}
                </span>

                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 z-20 w-full justify-center px-4">
                    <Link
                        to={`/dashboard/pembicara/edit/${id}`}
                        className="text-sm text-blue-600 font-medium hover:text-blue-700 hover:bg-blue-50 px-4 py-1.5 rounded-md transition-colors"
                    >
                        Edit
                    </Link>

                    <button
                        type="button"
                        onClick={() => onDelete(id)}
                        className="text-sm text-red-500 font-medium hover:text-white hover:bg-red-600 px-4 py-1.5 rounded-md transition-colors"
                    >
                        Hapus
                    </button>
                </div>

            </div>

        </div>
    );
};

export default PembicaraCard;