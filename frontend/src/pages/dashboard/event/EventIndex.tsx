import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import EventCard from "../../../components/ui/EventCard"; // Import komponen baru kita

interface EventItem {
    id: number;
    name: string;
    location: string;
    dateEvent: string;
    description: string;
    category?: {
        name: string;
    };
    pembicara?: {
        name: string;
    };
}

export default function EventIndex() {
    
    const [eventList, setEventList] = useState<EventItem[]>([]);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const res = await fetch("https://uts-web-crud.vercel.app/events");

                if (!res.ok) {
                    throw new Error("Gagal mengambil data event");
                }

                const data = await res.json();
                console.log("Struktur Data Event dari Backend:", data);
                const result = data.event || data.events || data.data || data;
                
                if (Array.isArray(result)) {
                    setEventList(result);
                }
            } catch (err) {
                console.error("Error fetching event:", err);
            }
        };
        fetchEvents();
    }, []);

    const handleDelete = async (id: number) => {
        const confirmDelete = window.confirm("Apakah anda yakin ingin menghapus data ini?");
        if (!confirmDelete) return;

        try {
            const res = await fetch(`https://uts-web-crud.vercel.app/events/${id}`, {
                method: "DELETE",
            });
            if (res.ok) {
                alert("Data berhasil dihapus");
                setEventList((prev) => prev.filter((item) => item.id !== id));
            } else {
                const errorData = await res.json();
                console.error("Gagal hapus:", errorData);
                alert(`Gagal menghapus!\nAlasan: "Event ini mungkin sedang dipakai oleh suatu Pembicara."`);
                
            }
        } catch (error) {
            console.error(error);
            alert("Terjadi kesalahan pada server");
        }
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('id-ID', {
            day: 'numeric', month: 'long', year: 'numeric',
            hour: '2-digit', minute: '2-digit'
        });
    };

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-2xl font-bold text-gray-800">Daftar Event</h1>
                <Link
                    to="/dashboard/event/create"
                    className="bg-[#802D43] text-white px-5 py-2.5 rounded-lg hover:bg-red-900 transition shadow-md font-medium"
                >
                    + Tambah Event
                </Link>
            </div>

            {eventList.length === 0 ? (
                <div className="text-center text-gray-500 py-10 bg-white rounded-xl border border-gray-100">
                    Belum ada data event.
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {eventList.map((item) => (
                        
                        <EventCard
                            key={item.id}
                            id={item.id}
                            name={item.name}
                            location={item.location}
                            dateFormatted={formatDate(item.dateEvent)}
                            description={item.description}
                            categoryName={item.category?.name}
                            pembicaraName={item.pembicara?.name}
                            onDelete={handleDelete}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}