import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import z from "zod";
import { InputText } from "../../../components/ui/InputText";
import Button from "../../../components/ui/Button";

type UserData = {
    name: string;
    email: string;
    password?: string;
    foto?: string;
    
}
const schema = z.object({
    name: z.string().min(1, "Nama harus diisi"),
    email: z.string().min(1, "Email harus diisi"),
    password: z.string().optional(),
    foto: z.string().optional(),

});


export default function UserEdit() {
    const { id } = useParams();
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<UserData>({
        resolver: zodResolver(schema)
    });

    useEffect(() => {
        const loadData = async () => {
            try {
                const res = await fetch(`https://uts-web-crud.vercel.app/user/${id}`)
                if (!res.ok) throw new Error("Gagal mengambil data user");

                const data = await res.json();
                const userData = data.data || data.user || data;

                // agar hash password tidak muncul di form
                if (userData.password) {
                    delete userData.password;
                }

                reset(userData)
            } catch (error) {
                console.error("Error load data:", error);
            }
        };
        loadData();
    }, [id, reset]);

    const onSubmit = async (data: UserData) => {
        try {
            const response = await fetch(`https://uts-web-crud.vercel.app/user/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                const errorData = await response.json(); 
                throw new Error(errorData.message || "Gagal memperbarui data user");
            }

            alert("Data User berhasil diperbarui!");
            navigate("/dashboard/user");
        } catch (error) {
            console.error("UPDATE USER ERROR:", error);
            alert("Gagal memperbarui data user.");
        }
    };


    return (
        <div className="p-6 max-w-2xl mx-auto">
            <div className="bg-white rounded-xl shadow-md p-8 border border-gray-100">
                <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
                    Edit User
                </h1>
                <div>
                    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">

                        <InputText
                            label="Nama"
                            name="name"
                            register={register}
                            error={errors.name?.message}
                        />
                        <InputText
                            label="Email"
                            name="email"
                            register={register}
                            error={errors.email?.message}
                        />
                        <InputText
                            label="Password"
                            name="password"
                            register={register}
                            error={errors.password?.message}
                        />
                        <p className="text-sm text-gray-500 -mt-4">
                            * Kosongkan jika tidak ingin mengubah password
                        </p>
                        <InputText
                            label="foto"
                            name="foto"
                            register={register}
                        />

                        <div className="flex justify-end gap-3 mt-4">
                            <Button type="button" label="Batal" variant="secondary" onClick={() => navigate("/dashboard/user")} />
                            <Button type="submit" label="Simpan User" />
                        </div>
                    </form>

                </div>
            </div>
        </div>
    )
}