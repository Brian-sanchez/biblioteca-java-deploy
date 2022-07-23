import React, { useState } from "react";
import { useDispatch, useSelector} from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { editLector, getAllLectores } from "../../../../../Redux/actions/index";

import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/src/sweetalert2.scss';

import Sidebar from "../../../sidebar/Sidebar";

import "./formEditStyles.scss";

const FormeditLector = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const lectores = useSelector((state) => state.allLectores);
  const { idLector } = useParams();
  const lectorFilter = lectores.filter(e => e.id === Number(idLector));

  const [input, setInput] = useState({
    nombre: `${lectorFilter[0].nombre}`,
    telefono: `${lectorFilter[0].telefono}`,
    direccion: `${lectorFilter[0].direccion}`
  });

  const [errors, setErrors] = useState({ name: "" });

  const handleInputChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value
    });

    setErrors(validateForm({
      ...input,
      [e.target.name]: e.target.value
    }));
  };

  const swalStyle = Swal.mixin({
    customClass: {
      title: 'swal-title',
      htmlContainer: 'swal-text',
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.nombre || !input.telefono || !input.direccion) return swalStyle.fire({
      icon: 'error',
      title: 'Error',
      text: 'Por favor complete todo el formulario',
    });
    
    e.preventDefault();
    dispatch(editLector(input, idLector));

    dispatch(getAllLectores());
    navigate("/admin");
    dispatch(getAllLectores());
  };

  return (
    <div className="new">
      <Sidebar/>
      <div className="newContainer">
        <div className="top">
          <h1>Editar Lector</h1>
        </div>
        <div className="bottom">
            <form onSubmit={handleSubmit}>
                <div className="formInput">
                  <label>Nombre</label>
                  <input type="text" placeholder="Ingrese el nombre del Lector" name="nombre" onChange={handleInputChange} value={input.nombre}/>
                  { errors.nombre && <p className="errors">{errors.nombre}</p> }
                </div>

                <div className="formInput">
                  <label>Telefono</label>
                  <input type="text" placeholder="Ingrese el nombre del Lector" name="telefono" onChange={handleInputChange} value={input.telefono}/>
                </div>

                <div className="formInput">
                  <label>Direccion</label>
                  <input type="text" placeholder="Ingrese el nombre del Lector" name="direccion" onChange={handleInputChange} value={input.direccion}/>
                </div>

              <button>Editar lector</button>
            </form>
        </div>
      </div>
    </div>
  )
}

// Validations
export function validateForm(input) {
  let errors = {};

  if (!input.nombre) {
    errors.nombre = "El nombre es requerido";
  }

  return errors;
};

export default FormeditLector
