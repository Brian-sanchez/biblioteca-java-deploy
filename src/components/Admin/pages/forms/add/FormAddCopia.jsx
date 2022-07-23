import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/src/sweetalert2.scss';

import { addCopia, getAllCopias } from "../../../../../Redux/actions/index";

import Sidebar from "../../../sidebar/Sidebar";

import "./formAddStyles.scss";

const FormAddCopia = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const libros = useSelector((state) => state.allBooks);

  const [input, setInput] = useState({
    idLibro: ""
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
    if (!input.idLibro) return swalStyle.fire({
      icon: 'error',
      title: 'Error',
      text: 'Por favor complete todo el formulario',
    });
    
    e.preventDefault();
    dispatch(addCopia(input));
    setInput({
      idLibro: "",
    });

    dispatch(getAllCopias());
    navigate("/admin");
    dispatch(getAllCopias());
  };

  return (
    <div className="new">
      <Sidebar/>
      <div className="newContainer">
        <div className="top">
          <h1>Agregue una Copia</h1>
        </div>

        <div className="bottom">
          <form onSubmit={handleSubmit}>
              <div className="formInput">
                <label>Elegir el libro al que pertenecera la copia</label>

                <select name="idLibro" onChange={handleInputChange} value={input.idLibro}>
                  <option>Seleccione el libro</option>
                  {
                    libros && libros.map(b => (
                      <option key={b.id} value={b.id}>{b.titulo}</option>
                    ))
                  }
                </select>
                { errors.idLibro && <p className="errors">{errors.idLibro}</p> }
              </div>

              {
                Object.keys(errors).length !== 0 ? (
                  <button disabled={true} id="error">
                    <p>Completar el formulario correctamente</p>
                  </button>
                ) : (<button>Añadir Copía</button>)
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

  if (!input.idLibro) {
    errors.idLibro = "El libro es requerido";
  }

  return errors;
};  

export default FormAddCopia;