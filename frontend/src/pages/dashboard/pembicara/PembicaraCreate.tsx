import { useForm } from "react-hook-form";
import { InputText } from "../../../components/ui/InputText";
import Button from "../../../components/ui/Button";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";

type PembicarFrom = {
  name: string;
  role: string;
  image: string;
  
}

const schema = z.object({
    name: z.string().min(1, "Nama Event harus diisi"),
    role: z.string().min(1, "Role harus diisi"),
    image: z.string().min(1, "Image diisi"),
    
});

export default function PembicaraCreate() {
  const navigate = useNavigate();
  

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<PembicarFrom>({
    resolver : zodResolver(schema)
  });


  const onSubmit = async (data: PembicarFrom) => {
    try {
      const response = await fetch("http://localhost:3000/pembicara", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: data.name,
          role: data.role,
          image: data.image,
        }),
      });
      if (!response.ok) {
        throw new Error("Gagal Menambakan pembicara");
      }

      const result = await response.json();
      console.log("Pembicara Berhasil ditambahkan:", result);

      alert("Pembicara Berhasil ditambahkan");
      reset();
      navigate("/dashboard/pembicara");

    } catch (error) {
      console.error("CREATE PEMBICAR ERROR!:", error);
      alert("Pembicara gagal ditambahkan");
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <div className="bg-white rounded-xl shadow-md p-8 border border-gray-100">
        <h1 className=" font-bold text-center">Tambah Pembicara</h1>

        <div>
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
              <Button type="submit" label="Simpan Pembicara" />
            </div>
          </form>

        </div>
      </div>
    </div>
  )
}