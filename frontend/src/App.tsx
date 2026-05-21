import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css'
import AuthLayout from './layouts/AuthLayout';
import Login from './pages/Login';
import ProtectedRoute from './routes/ProtectedRoute';
import DashboardLayout from './layouts/DashBoardLayout';

import CategoryCreate from './pages/dashboard/category/CategoryCreate';
import CategoryIndex from './pages/dashboard/category/CategoryIndex'; // Perhatikan huruf kapital pada nama file jika ada error import

import EventIndex from './pages/dashboard/event/EventIndex';
import PembicaraCreate from './pages/dashboard/pembicara/PembicaraCreate';
import PembicaraIndex from './pages/dashboard/pembicara/PembicaraIndex';
import Biodata from './pages/Home';
import EventCreate from './pages/dashboard/event/EventCreate';
import PembicaraEdit from './pages/dashboard/pembicara/PembicaraEdit';
import EventEdit from './pages/dashboard/event/EventEdit';
import CategoryEdit from './pages/dashboard/category/CategoryEdit';
import BiodataIndex from './pages/dashboard/BiodataIndex';

function App() {
  return (
    <BrowserRouter>
      <Routes>
  
        <Route path="/" element={<Biodata />} />


        <Route element={<AuthLayout />}>
          <Route path='/login' element={<Login />} />
        </Route>

   
        <Route element={<ProtectedRoute/>}>
          
         
          <Route path="/dashboard" element={<DashboardLayout />}>
            
          
            <Route path="biodata" element={<BiodataIndex />} />

            <Route path="category" element={<CategoryIndex />} />
            <Route path="category/create" element={<CategoryCreate />} />
            <Route path="/dashboard/category/edit/:id" element={<CategoryEdit />} />

           
            <Route path="pembicara" element={<PembicaraIndex />} />
            <Route path="pembicara/create" element={<PembicaraCreate />} />
            <Route path="/dashboard/pembicara/edit/:id" element={<PembicaraEdit />} />

            <Route path="event" element={<EventIndex />} />
            <Route path="event/create" element={<EventCreate />} />
            <Route path="/dashboard/event/edit/:id" element={<EventEdit />} />
            
          </Route> 
          
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;