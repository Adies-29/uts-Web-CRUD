import type React from "react";
import { Link } from "react-router-dom";


interface EventCardProps {
    id: number;
    name: string;
    location: string;
    dateFormatted: string;
    description: string;
    categoryName?: string;
    pembicaraName?: string;
    onDelete: (id: number) => void;
}

export const EventCard: React.FC<EventCardProps> = ({
    id,
    name,
    location,
    dateFormatted,
    description,
    categoryName,
    pembicaraName,
    onDelete,
}) => {
    return (
        <div className="group relative bg-white rounded-xl shadow-sm border border-gray-100 flex flex-col hover:shadow-lg hover:-translate-y-1 transition-all duration-300 overflow-hidden h-full">
            
            <div className="p-5 border-b border-gray-50 flex justify-between items-start gap-4 pt-6">
                <h3 className="font-bold text-lg text-gray-800 line-clamp-2 leading-tight group-hover:text-[#802D43] transition-colors">
                    {name}
                </h3>
            </div>

            
            <div className="p-5 flex grow  flex-col gap-3">
                
                <div className="flex flex-wrap gap-2 mb-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider bg-red-50 text-[#802D43] px-2.5 py-1 rounded-md border border-red-100 shadow-sm">
                        {categoryName || "Uncategorized"}
                    </span>
                    
                </div>
                <div className="flex flex-wrap gap-2 mb-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider bg-red-50 text-[#07526d] px-2.5 py-1 rounded-md border border-red-100 shadow-sm">
                        {pembicaraName || "Belum ada pembicara"}
                    </span>
                </div>
                

                <div className="text-sm text-gray-600 flex items-start gap-3"> 
                    <span className="font-medium mt-1">{dateFormatted}</span>
                </div>
                <div className="text-sm text-gray-600 flex items-start gap-3">
                    <span className="font-medium mt-1">{location}</span>
                </div>
                <p className="text-sm text-gray-500 mt-3 pt-3 border-t border-dashed border-gray-100 line-clamp-3 leading-relaxed">
                    {description}
                </p>
            </div>

           
            <div className="flex items-center justify-center gap-4 w-full pt-4 pb-5 border-t border-gray-50 bg-gray-50/30">
                <Link
                    to={`/dashboard/event/edit/${id}`}
                    className="text-sm text-blue-600 font-medium hover:text-blue-700 hover:bg-blue-50 px-4 py-1.5 rounded-md transition-colors"
                >
                    Edit
                </Link>
                <button
                    onClick={() => onDelete(id)}
                    className="text-sm text-red-500 font-medium hover:text-white hover:bg-red-600 px-4 py-1.5 rounded-md transition-colors"
                >
                    Hapus
                </button>
            </div>
        </div>
    );
};

export default EventCard;