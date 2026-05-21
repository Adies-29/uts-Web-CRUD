import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CategoryCard from "../../../components/ui/CategoryCard"; 

interface CategoryItem {
    id: number;
    name: string;
}

export default function CategoryIndex() {
    const [categories, setCategories] = useState<CategoryItem[]>([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await fetch("http://localhost:3000/categories");
                
                if (!res.ok) {
                    throw new Error("Gagal mengambil data kategori");
                }
                
                const data = await res.json();
                const result = data.categories || data.data || data; 
                
                if (Array.isArray(result)) {
                    setCategories(result);
                }
            } catch (err) {
                console.error("Error fetching categories:", err);
            }
        };
        fetchCategories();
    }, []);

    const handleDelete = async (id: number) => {
        const confirmDelete = window.confirm("Apakah kamu yakin ingin menghapus kategori ini?");
        if (!confirmDelete) return;

        try {
            const res = await fetch(`http://localhost:3000/categories/${id}`, {
                method: "DELETE",
            });
            
            if (res.ok) {
                alert("Kategori berhasil dihapus!");
                setCategories((prev) => prev.filter((item) => item.id !== id));
            } else {
                const errorData = await res.json();
                console.error("Gagal hapus:", errorData);
                alert(`Gagal menghapus!\nAlasan: "Kategori ini mungkin sedang dipakai oleh suatu Event."`);
            } 
        } catch (error) {
            console.error(error);
            alert("Terjadi kesalahan pada server server backend.");
        }
    };

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-2xl font-bold text-gray-800">Daftar Kategori</h1>
                <Link 
                    to="/dashboard/category/create" 
                    className="bg-[#802D43] text-white px-5 py-2.5 rounded-lg hover:bg-red-900 transition shadow-md font-medium"
                >
                    + Tambah Kategori
                </Link>
            </div>

            {categories.length === 0 ? (
                <div className="text-center text-gray-500 py-10 bg-white rounded-xl border border-gray-100">
                    Belum ada data kategori.
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {categories.map((cat) => (
                        <CategoryCard
                            key={cat.id}
                            id={cat.id}
                            name={cat.name}
                            onDelete={handleDelete}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}