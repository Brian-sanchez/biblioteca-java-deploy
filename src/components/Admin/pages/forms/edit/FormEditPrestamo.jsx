import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { editPrestamo, getAllPrestamos } from "../../../../../Redux/actions/index";

import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/src/sweetalert2.scss';

import Sidebar from "../../../sidebar/Sidebar";

import "./formEditStyles.scss";

const FormEditPrestamo = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { idPrestamo } = useParams();
  const prestamos = useSelector((state) => state.allPrestamos);
  const libros = useSelector((state) => state.allBooks);
  const lectores = useSelector((state) => state.allLectores);
  const copias = useSelector((state) => state.copiasDisponibles);
  const prestamoFilter = prestamos.filter(e => e.id === Number(idPrestamo));

  const [input, setInput] = useState({
    inicio: `${prestamoFilter[0].inicio}`,
    fin: `${prestamoFilter[0].fin}`,
    lector: {
      id: `${prestamoFilter[0].lector.id}`
    },
    libro: {
      id: `${prestamoFilter[0].libro.id}`
    },
    copia: {
      id: `${prestamoFilter[0].copia.id}`
    },
  });
  
  const copiaByIdLibro = copias.filter(c => c.idLibro === Number(input.libro.id));
  
  const [errors, setErrors] = useState({ name: "" });

  const handleInputChangeLibro = (e) => {
    setInput({
      ...input,
      libro: {
        id: e.target.value
      },
    });

    setErrors(validateForm({
      ...input,
      libro: {
        id: e.target.value
      }
    }));
  };

  const handleInputChangeLector = (e) => {
    setInput({
      ...input,
      lector: {
        id: e.target.value
      }
    });

    setErrors(validateForm({
      ...input,
      lector: {
        id: e.target.value
      }
    }))
  };

  const handleInputChangeCopia = (e) => {
    setInput({
      ...input,
      copia: {
        id: e.target.value
      }
    });

    setErrors(validateForm({
      ...input,
      copia: {
        id: e.target.value
      }
    }))
  };

  const fecha = (e) => {
    setInput({
      ...input,
      [e.target.name]: new Date(e.target.value).toISOString().slice(0, 10).replace('T', ' ')
    })
  };

  const swalStyle = Swal.mixin({
    customClass: {
      title: 'swal-title',
      htmlContainer: 'swal-text',
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.libro.id || !input.copia.id|| !input.lector.id) return swalStyle.fire({
      icon: 'error',
      title: 'Error',
      text: 'Por favor complete todo el formulario',
    });

    e.preventDefault();
    dispatch(editPrestamo(input, idPrestamo));

    dispatch(getAllPrestamos());
    navigate("/admin");
    dispatch(getAllPrestamos());
  };

  return (
    <div className="new">
    <Sidebar/>
    <div className="newContainer">
      <div className="top">
        <h1>Edite un prestamo</h1>
      </div>
      <div className="bottom">
          <form onSubmit={handleSubmit}>
              <div className="formInput">
                <label>Fecha de Inicio</label>
                <input type="date" placeholder="Ingrese la fecha de nacimiento del autor" name="inicio" onChange={fecha} value={input.inicio}/>
              </div>

              <div className="formInput">
                <label>Fecha de Fin</label>
                <input type="date" placeholder="Ingrese la fecha de nacimiento del autor" name="fin" onChange={fecha} value={input.fin}/>
              </div>

              <div className="formInput">
                <label>Elegir el lector que pedira el prestamo</label>
                <select onChange={handleInputChangeLector} value={input.lector.id} disabled={true}>
                  <option>Seleccione el lector</option>
                      {
                        lectores && lectores.map(b => (
                          <option key={b.id} value={b.id}>ID {b.id} - {b.nombre}</option>
                        ))
                      }
                  </select>
                { errors.lector && <p className="errors">{errors.lector}</p> }
              </div>

              <div className="formInput">
                <label>Elegir el libro</label>
                <select onChange={handleInputChangeLibro} value={input.libro.id} disabled={true}>
                  <option>Seleccione el libro</option>
                      {
                        libros && libros.map(b => (
                          <option key={b.id} value={b.id}>ID {b.id} - {b.titulo}</option>
                        ))
                      }
                  </select>
                { errors.libro && <p className="errors">{errors.libro}</p> }
              </div>

              <div className="formInput">
                <label>Elegir copía del libro</label>
                <select onChange={handleInputChangeCopia} value={input.copia.id} disabled={true}>
                  <option>Seleccione la copia</option>
                    {
                      copiaByIdLibro.length !== 0 ? copiaByIdLibro.map(b => (
                        <option key={b.id} value={b.id}>ID: {b.id} - ID Libro: {b.idLibro}</option>
                      )) : <option disabled={true}>Ese libro no tiene copias</option>
                    }
                  </select>
                { errors.copia && <p className="errors">{errors.copia}</p> }
              </div>
            <button>Editar Prestamo</button>
          </form>
      </div>
    </div>
  </div>
  );
};

// Validations
export function validateForm(input) {
  let errors = {};

  if (!input.lector.id) {
    errors.lector = "El lector es requerido";
  }

  if (!input.libro.id) {
    errors.libro = "El libro es requerido";
  }

  if (!input.copia.id) {
    errors.copia = "La copia es requerido";
  }

  return errors;
};


export default FormEditPrestamo;