import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import z from "zod";
import { InputText } from "../../../components/ui/InputText";
import Button from "../../../components/ui/Button";


type UserFrom = {
  name: string;
  email: string;
  password: string;
  foto?: string;

}

const schema = z.object({
  name: z.string().min(1, "Nama harus diisi"),
  email: z.string().min(1, "Email harus diisi"),
  password: z.string().min(1, "Password diisi"),
  foto: z.string().optional(),


});

export default function UserCreate() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UserFrom>({
    resolver: zodResolver(schema)
  });

  const onSubmit = async (data: UserFrom) => {
    try {
      const response = await fetch("https://uts-web-crud.vercel.app/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          password: data.password,
          foto: data.foto
        })
      })
      if (!response.ok) {
        throw new Error("Gagal membuat User");
      }

      const result = await response.json()
      console.log("User Berhasil ditambahkan:", result);

      alert("User Berhasil ditambahkan");
      reset();
      navigate("/dashboard/user");
    } catch (error) {
      console.error("CREATE USER ERROR!:", error);
      alert("User gagal ditambahkan");
    }
  };


  return (
    <div className="p-6 max-w-2xl mx-auto">
      <div className="bg-white rounded-xl shadow-md p-8 border border-gray-100">
        <h1 className=" font-bold text-center">Tambah User</h1>

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
            <InputText
              label="Foto"
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