import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { InputText } from "../../../components/ui/InputText";
import Button from "../../../components/ui/Button";

type FormData = {
  name: string;
};


const schema = z.object({
  name: z.string().min(1, "Nama Kategori harus diisi"),
});

export default function CategoryCreate() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    try {
      const response = await fetch("https://uts-web-crud.vercel.app/categories", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: data.name,
        }),
      });

      if (!response.ok) {
        throw new Error("Gagal menambahkan kategori");
      }

      const result = await response.json();
      console.log("Kategori berhasil dibuat:", result);

      alert("Kategori berhasil ditambahkan!");
      reset();
      navigate("/dashboard/category");

    } catch (error) {
      console.error("CREATE CATEGORY ERROR:", error);
      alert("Terjadi kesalahan saat menyimpan kategori.");
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto">
      <div className="bg-white rounded-xl shadow-md p-8 border border-gray-100">
        <h1 className="text-2xl font-bold text-center text-[#802D43] mb-8">
          Tambah Kategori Baru
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
       
          <InputText
            label="Nama Kategori"
            name="name"
            register={register}
            error={errors.name?.message}
          />

          <div className="flex justify-end mt-2">
            <Button type="submit" label="Simpan Kategori" />
          </div>
        </form>
      </div>
    </div>
  );
}