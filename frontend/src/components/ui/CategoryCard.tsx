import type React from "react";
import { Link } from "react-router-dom";

interface CategoryCardProps {
    id: number;
    name: string;
    onDelete: (id: number) => void;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({ id, name, onDelete }) => {
    return (
        <div className="group relative bg-white rounded-xl shadow-sm border border-gray-100 p-5 flex flex-col justify-between hover:shadow-lg hover:-translate-y-1 transition-all duration-300 overflow-hidden">
            
            <div className="flex items-center justify-center w-full grow mb-6 mt-4">
                <h3 className="font-bold text-lg text-gray-800 line-clamp-2 leading-tight text-center group-hover:text-[#802D43] transition-colors">
                    {name}
                </h3>
            </div>

            
            <div className="flex items-center justify-center gap-4 w-full pt-4 border-t border-gray-100 mt-auto">
                <Link
                    to={`/dashboard/category/edit/${id}`}
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

export default CategoryCard;