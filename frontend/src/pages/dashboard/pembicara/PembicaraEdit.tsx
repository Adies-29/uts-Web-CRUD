import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { InputText } from "../../../components/ui/InputText";
import Button from "../../../components/ui/Button";


type FormData = {
  name: string;
  role: string;
  image: string;
  
};


const schema = z.object({
  name: z.string().min(1, "Nama harus diisi"),
  role: z.string().min(1, "Role harus diisi"),
  image: z.string().min(1, "Image URL harus diisi"),
 
});


export default function PembicaraEdit() {
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
    const loadData = async () => {
      try {
        const res = await fetch(`http://localhost:3000/pembicara/${id}`);
        if (!res.ok) throw new Error("Gagal mengambil data pembicara");

        const data = await res.json();
        const pembicaraData = data.data || data.pembicara || data; 
        
        reset(pembicaraData); 
      } catch (err) {
        console.error("Error load data:", err);
      }
    };

    loadData();
  }, [id, reset]);

  const onSubmit = async (data: FormData) => {
    try {
      const response = await fetch(`http://localhost:3000/pembicara/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Gagal memperbarui data pembicara");
      }

      alert("Data pembicara berhasil diperbarui!");
      navigate("/dashboard/pembicara");
    } catch (error) {
      console.error("UPDATE PEMBICARA ERROR:", error);
      alert("Gagal memperbarui data pembicara.");
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <div className="bg-white rounded-xl shadow-md p-8 border border-gray-100">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Edit Pembicara
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
          
      
          <InputText
            label="Nama"
            name="name"
            register={register}
            error={errors.name?.message}
          />

         
          <InputText
            label="Role"
            name="role"
            register={register}
            error={errors.role?.message}
          />

         
          <InputText
            label="Image URL"
            name="image"
            register={register}
            error={errors.image?.message}
          />

          <div className="flex justify-end mt-4">
            <Button type="submit" label="Simpan Perubahan" />
          </div>
        </form>
      </div>
    </div>
  );
}