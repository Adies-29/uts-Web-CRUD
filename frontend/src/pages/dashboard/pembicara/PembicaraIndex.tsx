import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../../components/ui/Button";
import PembicaraCard from "../../../components/ui/PembicaraCard";

interface PembicaraItem {
    id: number;
    name: string;
    role: string;
    image: string;
    event?: {
        name: string;
    };
}

export default function PembicaraIndex() {
    const navigate = useNavigate();
    const [pembicaraList, setPembicaraList] = useState<PembicaraItem[]>([]);

    useEffect(() => {

        const fetchPembicara = async () => {
            try {
                const res = await fetch("http://localhost:3000/pembicara");

                if (!res.ok) {
                    throw new Error("Gagal mengambil data");
                }

                const data = await res.json();

                const result = data.data || data.pembicara || data;
                if (Array.isArray(result)) {
                    setPembicaraList(result);
                }
            } catch (err) {
                console.error("Error fetching pembicara:", err);
            }
        };
        fetchPembicara();
    }, []);

    const handleDelete = async (id: number) => {
        const confirmDelete = window.confirm("Apakah anda yakin ingin menghapus data ini?");
        if (!confirmDelete) return;

        try {
            const res = await fetch(`http://localhost:3000/pembicara/${id}`, {
                method: "DELETE",
            });
            if (res.ok) {
                alert("Data berhasil dihapus")
                setPembicaraList((prev) => prev.filter((item) => item.id !== id));
            } else {
                alert("Gagal menghapus data")
            }
        } catch (error) {
            console.error(error);
            alert("Terjadi kesalahan pada server")
        }
    };

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-2xl font-bold text-gray-800">Daftar Pembicara</h1>

                <Button
                    label="Tambah Pembicara"
                    onClick={() => navigate("/dashboard/pembicara/create")}
                />
            </div>

            {pembicaraList.length === 0 ? (
                <div className="text-center text-gray-500 py-10">Belum ada data pembicara.</div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {pembicaraList.map((item) => (
                        <PembicaraCard
                            key={item.id}
                            id={item.id} 
                            name={item.name}
                            role={item.role}
                            imageUrl={item.image}
                            onDelete={handleDelete} 
                        />
                    ))}
                </div>
            )
            }
        </div >
    );
};