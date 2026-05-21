import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import z from "zod";
import Button from "../../../components/ui/Button";
import { InputText } from "../../../components/ui/InputText";

type FormData = {
    name: string;
};


const schema = z.object({
    name: z.string().min(1, "Nama Kategori harus diisi"),
});

export default function CategoryEdit() {
    const { id } = useParams();
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<FormData>({
        resolver: zodResolver(schema),
    });

    useEffect(() => {
        const fetchCategory = async () => {
            try {
                const res = await fetch(`https://uts-web-crud.vercel.app/categories/${id}`);

                if (!res.ok) {
                    throw new Error("Gagal mengambil data kategori");
                }

                const data = await res.json();

                
                const categoryData = data.category || data.data || data;

                reset(categoryData);
            } catch (err) {
                console.error("Error fetching category:", err);
            }
        };

        fetchCategory();
    }, [id, reset]);

    const onSubmit = async (data: FormData) => {
        try {
            const response = await fetch(`https://uts-web-crud.vercel.app/categories/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                throw new Error("Gagal memperbarui kategori");
            }

            alert("Kategori berhasil diperbarui!");
            navigate("/dashboard/category");

        } catch (error) {
            console.error("UPDATE CATEGORY ERROR:", error);
            alert("Terjadi kesalahan saat menyimpan perubahan.");
        }
    };

    return (
        <div className="p-6 max-w-lg mx-auto">
            <div className="bg-white rounded-xl shadow-md p-8 border border-gray-100">
                <h1 className="text-2xl font-bold text-center text-[#802D43] mb-8">
                    Edit Kategori
                </h1>

                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
                    <InputText
                        label="Nama Kategori"
                        name="name"
                        register={register}
                        error={errors.name?.message}
                    />

                    <div className="flex justify-end mt-2">
                        <Button type="submit" label="Simpan Perubahan" />
                    </div>
                </form>
            </div>
        </div>
    );
}