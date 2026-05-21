import { useNavigate } from 'react-router-dom';
import Button from '../components/ui/Button';


export default function Biodata() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
            
            <div className="bg-white p-8 rounded-2xl shadow-lg text-center border border-gray-100">
                
                <Button
                    label="Masuk ke Dashboard"
                    onClick={() => {
                        console.log("Tombol diklik!"); 
                        navigate('/login');
                    }}
                />
            </div>
        </div>
    );
}