import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../../components/ui/Button";
import UserCard from "../../../components/ui/UserCard";

interface UserItem {
    id: number;
    name: string;
    email: string;
    foto: string;
}

export default function UserIndex(){
    const navigate = useNavigate();
    const [userList, setUserList] = useState<UserItem[]>([]);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await fetch("https://uts-web-crud.vercel.app/user");

                if (!res.ok) {
                    throw new Error("Gagal mengambil data");
                }

                const data = await res.json();

                const result = data.data || data.user || data;
                if (Array.isArray(result)) {
                    setUserList(result);
                }
            } catch (err) {
                console.error("Error fetching user:", err);
            }
        };
        fetchUser();
    }, [])
    const handleDelete = async (id: number) => {
        const confirmDelete = window.confirm("Apakah anda yakin ingin menghapus data ini?");
        if (!confirmDelete) return;

        try {
            const res = await fetch(`https://uts-web-crud.vercel.app/user/${id}`, {
                method: "DELETE",
            });
            if (res.ok) {
                alert("Data berhasil dihapus")
                setUserList((prev) => prev.filter((item) => item.id !== id));
            } else {
                alert("Gagal menghapus data")
            }
        } catch (error) {
            console.error(error);
            alert("Terjadi kesalahan pada server")
        }
    };


    return(
        <div className="p-6">
                    <div className="flex justify-between items-center mb-8">
                        <h1 className="text-2xl font-bold text-gray-800">Daftar User</h1>
        
                        <Button
                            label="Tambah User"
                            onClick={() => navigate("/dashboard/user/create")}
                        />
                    </div>
        
                    {userList.length === 0 ? (
                        <div className="text-center text-gray-500 py-10 bg-white rounded-xl border border-gray-100">Belum ada data user.</div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {userList.map((item) => (
                                <UserCard
                                    key={item.id}
                                    id={item.id} 
                                    name={item.name}
                                    email={item.email}
                                    imageUrl={item.foto}
                                    onDelete={handleDelete} 
                                />
                            ))}
                        </div>
                    )
                    }
                </div >
    )
}