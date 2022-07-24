import { Route, Routes } from "react-router-dom";

import Home from "./components/Home/Home";
import Admin from "./components/Admin/pages/home/Admin";

import LibrosPage from "./components/Admin/pages/LibrosPage/LibrosPage";
import CopiasPage from "./components/Admin/pages/CopiasPage/CopiasPage";
import LectoresPage from "./components/Admin/pages/LectoresPage/LectoresPage";
import PrestamosPage from "./components/Admin/pages/PrestamosPage/PrestamosPage";
import MultasPage from "./components/Admin/pages/MultasPage/MultasPage";

import FormAddLector from "./components/Admin/pages/forms/add/FormAddLector";
import FormAddLibro from "./components/Admin/pages/forms/add/FormAddLibro";
import FormAddCopia from "./components/Admin/pages/forms/add/FormAddCopia.jsx";
import FormAddPrestamo from "./components/Admin/pages/forms/add/FormAddPrestamo";

import FormEditLector from "./components/Admin/pages/forms/edit/FormEditLector";
import FormEditLibro from "./components/Admin/pages/forms/edit/FormEditLibro";
import FormEditCopia from "./components/Admin/pages/forms/edit/FormEditCopia";
import FormEditPrestamo from "./components/Admin/pages/forms/edit/FormEditPrestamo";

import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

import './App.css';

function App() {
  return (
    <div className="App">
        <Routes>
          <Route path="/" element={<Home/>} />

          <Route path="/admin">
            <Route index element={<Admin/>} />
            <Route path="/admin/lectores">
              <Route index element={<LectoresPage/>} />
              <Route
                path="agregarLectores"
                element={<FormAddLector/>}
              />
              <Route
                path=":idLector"
                element={<FormEditLector/>}
              />
            </Route>

            <Route path="/admin/libros">
              <Route index element={<LibrosPage/>} />
              <Route
                path="agregarLibros"
                element={<FormAddLibro/>}
              />
              <Route
                path=":idLibro"
                element={<FormEditLibro/>}
              />
            </Route>

            <Route path="/admin/copias">
              <Route index element={<CopiasPage/>} />
              <Route
                path="agregarCopias"
                element={<FormAddCopia/>}
              />
              <Route
                path=":idCopia"
                element={<FormEditCopia/>}
              />
            </Route>

            <Route path="/admin/prestamos">
              <Route index element={<PrestamosPage/>} />
              <Route
                path="agregarPrestamos"
                element={<FormAddPrestamo/>}
              />
              <Route
                path=":idPrestamo"
                element={<FormEditPrestamo/>}
              />
            </Route>

            <Route path="/admin/multas">
              <Route index element={<MultasPage/>} />
            </Route>
          </Route>
        </Routes>
    </div>
  );
};

export default App;
