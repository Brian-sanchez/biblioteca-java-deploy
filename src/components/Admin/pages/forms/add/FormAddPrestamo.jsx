import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/src/sweetalert2.scss';

import { addPrestamo, getAllPrestamos } from "../../../../../Redux/actions/index";

import Sidebar from "../../../sidebar/Sidebar";

import "./formAddStyles.scss";

const FormAddPrestamo = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const libros = useSelector((state) => state.allBooks);
  const lectores = useSelector((state) => state.allLectores);
  const copias = useSelector((state) => state.copiasDisponibles);

  const [input, setInput] = useState({
    lector: {
      id: ""
    },
    libro: {
      id: ""
    },
    copia: {
      id: ""
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
    dispatch(addPrestamo(input));
    setInput({
      lector: {
        id: ""
      },
      libro: {
        id: ""
      },
      copia: {
        id: ""
      },
    });

    dispatch(getAllPrestamos());
    navigate("/admin");
    dispatch(getAllPrestamos());
  };

  return (
    <div className="new">
      <Sidebar/>

      <div className="newContainer">
        <div className="top">
          <h1>Agregue una Prestamo</h1>
        </div>

        <div className="bottom">
          <form onSubmit={handleSubmit}>
            <div className="formInput">
              <label>Elegir el lector que pedira el prestamo</label>
              <select onChange={handleInputChangeLector} value={input.lector.id}>
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
              <select onChange={handleInputChangeLibro} value={input.libro.id}>
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
              <select onChange={handleInputChangeCopia} value={input.copia.id}>
                <option value="" >Seleccione la copia</option>
                    {
                      copiaByIdLibro.length !== 0 ? copiaByIdLibro.map(b => (
                        <option key={b.id} value={b.id}>ID: {b.id} - ID Libro: {b.idLibro}</option>
                      )) : <option disabled={true}>Ese libro no tiene copias</option>
                    }
                </select>
              { errors.copia && <p className="errors">{errors.copia}</p> }
            </div>

            {
              Object.keys(errors).length !== 0 ? (
                <button disabled={true} id="error">
                  <p>Completar el formulario correctamente</p>
                </button>
              ) : (<button>Añadir Prestamo</button>)
            }
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

export default FormAddPrestamo;