import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import z from "zod";
import { InputText } from "../../../components/ui/InputText";
import Button from "../../../components/ui/Button";
import { TextArea } from "../../../components/ui/TextArea";

type FormData = {
  name: string;
  categoryId: string;
  pembicaraId: string;
  location: string;
  dateEvent: string;
  description: string;
}

interface CategoryItem {
  id: number;
  name: string;
}
interface PembicaraItem {
  id: number;
  name: string;
}


const schema = z.object({
  name: z.string().min(1, "Nama Event harus diisi"),
  categoryId: z.string().min(1, "Kategori wajib dipilih"),
  pembicaraId: z.string().min(1, "Pembicara wajib dipilih"),
  location: z.string().min(1, "Lokasi/Tempat harus diisi"),
  dateEvent: z.string().min(1, "Tanggal dan waktu event harus diisi"),
  description: z.string().min(1, "Deskripsi event harus diisi"),
});

export default function EventEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [categories, setCategories] = useState<CategoryItem[]>([]);
  const [pembicaras, setPembicaras] = useState<PembicaraItem[]>([]);

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

        const resCat = await fetch("http://localhost:3000/categories");
        const data = await resCat.json();
        setCategories(data.categories || []);

        const resPem = await fetch("http://localhost:3000/pembicara");
        const dataPem = await resPem.json();
        setPembicaras(dataPem.pembicara || dataPem.data || dataPem);

        const resEv = await fetch(`http://localhost:3000/events/${id}`);
        if (!resEv.ok) throw new Error("Gagal mengambil data event");

        const dataEv = await resEv.json();
        const eventData = dataEv.event || dataEv.data || dataEv;

        if (eventData.dateEvent) {
          eventData.dateEvent = new Date(eventData.dateEvent)
            .toISOString()
            .slice(0, 16);
        }

        reset(eventData);
      } catch (err) {
        console.error("Error load data:", err);
      }
    };

    loadData();
  }, [id, reset]);

  const onSubmit = async (data: FormData) => {
    try {
      const response = await fetch(`http://localhost:3000/events/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: data.name,
          categoryId: Number(data.categoryId),
          pembicaraId: Number(data.pembicaraId),
          location: data.location,
          dateEvent: new Date(data.dateEvent).toISOString(),
          description: data.description
        }),
      });

      if (!response.ok) throw new Error("Gagal update data");

      alert("Event berhasil diperbarui!");
      navigate("/dashboard/event");
    } catch (error) {
      console.error("UPDATE ERROR:", error);
      alert("Gagal menyimpan perubahan.");
    }
  };


  return (
    <div className="p-6 max-w-2xl mx-auto">
      <div className="bg-white rounded-xl shadow-md p-8 border border-gray-100">
        <h1 className="text-2xl font-bold text-center text-[#802D43] mb-8">
          Edit Event
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            <InputText
              label="Nama Event"
              name="name"
              register={register}
              error={errors.name?.message}
            />


            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-700">Kategori Event</label>
              <select
                {...register("categoryId")}
                className="w-full border rounded px-3 py-2 outline-none focus:ring-2 focus:ring-[#802D43] transition-colors"
              >
                <option value="">-- Pilih Kategori --</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
              {errors.categoryId && (
                <p className=" text-red-500 ">{errors.categoryId.message}</p>
              )}
            </div>


            <InputText
              label="Lokasi / Tempat"
              name="location"
              register={register}
              error={errors.location?.message}
            />
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-700">Pembicara Event</label>
              <select
                {...register("pembicaraId")}
                className="w-full border rounded px-3 py-2 outline-none focus:ring-2 focus:ring-[#802D43] transition-colors"
              >
                <option value="">-- Pilih Pembicara --</option>
                {pembicaras.map((pem) => (
                  <option key={pem.id} value={pem.id}>
                    {pem.name}
                  </option>
                ))}
              </select>
              {errors.pembicaraId && (
                <p className="text-red-500 text-xs mt-1">{errors.pembicaraId.message}</p>
              )}
            </div>


            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-700">Tanggal & Jam Pelaksanaan</label>
              <input
                type="datetime-local"
                {...register("dateEvent")}
                className="w-full border rounded px-3 py-2 outline-none focus:ring-2 focus:ring-[#802D43] transition-colors"
              />
              {errors.dateEvent && (
                <p className="text-red-500">{errors.dateEvent.message}</p>
              )}
            </div>


            <div className="md:col-span-2">
              <TextArea
                label="Deskripsi Event"
                name="description"
                register={register}
                error={errors.description?.message}
              />
            </div>

          </div>

          <div className="flex justify-end mt-2 pt-4 border-t border-gray-100">
            <Button type="submit" label="Simpan Event" />
          </div>

        </form>
      </div>
    </div>
  );
}