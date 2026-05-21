// @ts-ignore
import profilePic from "../../assets/fotoAdmin.JPG";

export default function BiodataIndex() {
    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-2xl font-bold text-gray-800">Bio Data Admin</h1>
            </div>

            <div className="flex flex-col md:flex-row gap-6">
                
               
                <div className="w-full md:w-1/3 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex justify-center">
                
                    <div className="flex flex-col pb-8 px-6 -mt-12 relative z-10 justify-center items-center ">
                        <img 
                            src={profilePic} 
                            alt="Admin Profile" 
                            className="w-30 h-30 rounded-full border-4 border-white shadow-md bg-white mb-4"
                        />
                        <h2 className="text-xl font-bold text-gray-800">Admin Inpopest</h2>
                        <span className="text-sm font-medium bg-red-50 text-[#802D43] px-3 py-1 rounded-full mt-1 mb-3 border border-red-100">
                            Administrator Utama
                        </span>
                        <span className="text-sm font-medium bg-red-50 text-[#802D43] px-3 py-1 rounded-full mt-1 border border-red-100">
                            4C
                        </span>
                    </div>
                </div>

                
                <div className="w-full md:w-2/3 bg-white rounded-xl shadow-sm border border-gray-100 p-8">
                    <h3 className="text-lg font-bold text-gray-800 border-b border-gray-100 pb-4 mb-6">
                        Informasi Detail
                    </h3>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-8">

                        <div className="flex flex-col">
                            <span className="text-sm text-gray-500 mb-1">Nama Lengkap</span>
                            <span className="font-semibold text-gray-800">Adies Ardiansyah</span>
                        </div>
                        
                        <div className="flex flex-col">
                            <span className="text-sm text-gray-500 mb-1">Email</span>
                            <span className="font-semibold text-gray-800">adies@inpopest.com</span>
                        </div>

                        <div className="flex flex-col">
                            <span className="text-sm text-gray-500 mb-1">No. Telepon / WhatsApp</span>
                            <span className="font-semibold text-gray-800">+62 812-3456-7890</span>
                        </div>
                        
                        <div className="flex flex-col">
                            <span className="text-sm text-gray-500 mb-1">Instansi / Organisasi</span>
                            <span className="font-semibold text-gray-800">Inpopest Event Organizer</span>
                        </div>

                        <div className="flex flex-col sm:col-span-2 mt-2">
                            <span className="text-sm text-gray-500 mb-2">Tentang Saya</span>
                            <p className="text-gray-700 text-sm leading-relaxed bg-gray-50 p-4 rounded-lg border border-gray-100">
                                Saya adalah administrator yang bertanggung jawab penuh dalam mengelola data Event, Kategori, dan jadwal para Pembicara pada sistem Inpopest. Memastikan seluruh data terorganisir dengan baik dan sistem berjalan lancar.
                            </p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}