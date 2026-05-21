import { Link, Outlet} from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";

export default function DashboardLayout(){

    const logout = useAuthStore((state) => state.logout )
    

    // fungsi logout
    const handleLogout = () => {
        logout();
        
    };

    return (
        
        <div className="flex h-screen w-full bg-[#f8f9fa] overflow-hidden">
            
            
            <div className="w-64 bg-white border-r border-gray-100 flex flex-col justify-between p-6 shadow-sm ">

                <div>
                  
                    <div className="mb-10 px-2 flex items-center justify-center gap-2">
                        <h1 className="font-extrabold text-2xl text-gray-800 tracking-tight flex items-center text-center">
                            Inpopest</h1>
                    </div>

                    
                    <ul className="flex flex-col gap-2 w-full">
                        <li>
                            <Link to="/dashboard/biodata" className="flex items-center gap-3 p-5 text-gray-600 font-medium rounded-xl hover:bg-red-50 hover:text-[#802D43] transition-colors group">
                                Bio Data
                            </Link>
                        </li>
                        <li>
                            <Link to="/dashboard/category" className="flex items-center gap-3 p-5 text-gray-600 font-medium rounded-xl hover:bg-red-50 hover:text-[#802D43] transition-colors group">
                                Category
                            </Link>
                        </li>
                        <li>
                            <Link to="/dashboard/event" className="flex items-center gap-3 p-5 text-gray-600 font-medium rounded-xl hover:bg-red-50 hover:text-[#802D43] transition-colors group">
                                Event
                            </Link>
                        </li>
                        <li>
                            <Link to="/dashboard/pembicara" className="flex items-center gap-3 p-5 text-gray-600 font-medium rounded-xl hover:bg-red-50 hover:text-[#802D43] transition-colors group">
                                Pembicara
                            </Link>
                        </li>
                    </ul>
                </div>

               
                <div className="pt-6 border-t border-gray-100">
                    <button 
                        type="button" 
                        onClick={handleLogout}
                        className="w-full flex items-center justify-center gap-2 p-3 bg-red-50 text-red-600 font-semibold rounded-xl cursor-pointer hover:bg-red-600 hover:text-white transition-colors duration-300 shadow-sm"
                    >
                        Logout
                    </button>
                </div>
          
            </div>

            <div className="flex-1 overflow-y-auto bg-amber-50 relative">
                
                <div className="p-8 pb-20">
                    <Outlet/>
                </div>
            </div>
         
        </div>
    );
}