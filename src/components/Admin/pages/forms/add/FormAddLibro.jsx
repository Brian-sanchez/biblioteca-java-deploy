import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/src/sweetalert2.scss';

import { addLibro, getAllBooks } from "../../../../../Redux/actions/index";

import img from "../../../../../assets/images/book-default.jpg";

import Sidebar from "../../../sidebar/Sidebar";

import "./formAddStyles.scss";

const FormAddLibro = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [input, setInput] = useState({
    titulo: "",
    tipoLibro: "",
    editorial: "",
    anyo: 2022,
    image: "",
    autor: "",
    autorNacionalidad: "",
    autorNacimiento: ""
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

  const fecha = (e) => {
    setInput({
      ...input,
      [e.target.name]: new Date(e.target.value).toISOString().slice(0, 10).replace('T', ' ')
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
    if (!input.titulo || !input.image || !input.autor) return swalStyle.fire({
      icon: 'error',
      title: 'Error',
      text: 'Por favor complete todo el formulario',
    });
    
    e.preventDefault();
    dispatch(addLibro(input));
    setInput({
      titulo: "",
      tipoLibro: "",
      editorial: "",
      anyo: 2022,
      image: "",
      autor: "",
      autorNacionalidad: "",
      autorNacimiento: ""
    });

    dispatch(getAllBooks());
    navigate("/admin");
    dispatch(getAllBooks());
  };

  return (
    <div className="new">
      <Sidebar/>

      <div className="newContainer">
        <div className="top">
          <h1>Suba un Libro</h1>
        </div>

        <div className="libro-form">
          <div className="image">
            {
              input.image ? (
                <img
                  src={input.image}
                  className="inputImage"
                  alt={input.titulo}
                />
              ) : (
                <img
                  src={img}
                  className="defaultImage"
                  alt="Nuevo Libro"
                />
              )
            }
          </div>

          <form onSubmit={handleSubmit}>
            <div className="formInput">
              <label>Titulo</label>
              <input type="text" placeholder="Ingrese el titulo del libro" name="titulo" onChange={handleInputChange} value={input.titulo}/>
              { errors.titulo && <p className="errors">{errors.titulo}</p> }
            </div>

            <div className="formInput">
              <label>Tipo</label>
              <select name="tipoLibro" onChange={handleInputChange} value={input.tipoLibro}>
                <option value="">Seleccione el tipo del libro</option>
                <option value="NOVELA">Novela</option>
                <option value="TEATRO">Teatro</option>
                <option value="POESIA">Poesia</option>
                <option value="ENSAYO">Ensayo</option>
              </select>
              { errors.tipoLibro && <p className="errors">{errors.tipoLibro}</p> }
            </div>

            <div className="formInput">
              <label>Editorial</label>
              <input type="text" placeholder="Ingrese el nombre del Lector" name="editorial" onChange={handleInputChange} value={input.editorial}/>
              { errors.editorial && <p className="errors">{errors.editorial}</p> }
            </div>

            <div className="formInput">
              <label>Año de Publicacion</label>
              <input type="number" min="1000" max="2023" placeholder="Ingrese el año de publicacion del Libro" name="anyo" onChange={handleInputChange} value={input.anyo}/>
              { errors.anyo && <p className="errors">{errors.anyo}</p> }
            </div>

            <div className="formInput">
              <label>Imagen</label>
              <input type="text" placeholder="Ingrese el url de la portada del libro" name="image" onChange={handleInputChange} value={input.image}/>
              { errors.image && <p className="errors">{errors.image}</p> }
            </div>

            <div className="formInput">
              <label>Autor</label>
              <input type="text" placeholder="Ingrese el nombre del Autor del libro" name="autor" onChange={handleInputChange} value={input.autor}/>
              { errors.autor && <p className="errors">{errors.autor}</p> }
            </div>

            <div className="formInput">
              <label>Nacionalidad del Autor</label>
              <input type="text" placeholder="Ingrese la nacionalidad del autor" name="autorNacionalidad" onChange={handleInputChange} value={input.autorNacionalidad}/>
              { errors.autorNacionalidad && <p className="errors">{errors.autorNacionalidad}</p> }
            </div>

            <div className="formInput">
              <label>Fecha de nacimiento del Autor</label>
              <input type="date" placeholder="Ingrese la fecha de nacimiento del autor" name="autorNacimiento" onChange={fecha} value={input.autorNacimiento}/>
              { errors.autorNacimiento && <p className="errors">{errors.autorNacimiento}</p> }
            </div>

            {
              Object.keys(errors).length !== 0 ? (
                <button disabled={true} id="error">
                  <p>Completar el formulario correctamente</p>
                </button>
              ) : (<button>Subir Libro</button>)
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

  if (!input.titulo) {
    errors.titulo = "El titulo del libro es requerido";
  };

  if (!input.tipoLibro) {
    errors.tipoLibro = "El tipo del libro es requerido";
  };

  if (!input.editorial) {
    errors.editorial = "La editorial del libro es requerida";
  };
  
  if (!input.anyo) {
    errors.anyo = "El año de publicacion del libro es requerido";
  };

  if (!input.image) {
    errors.image = "La imagen del libro es requerida";
  };

  if (!input.autor) {
    errors.autor = "El nombre del autor del libro es requerido";
  } else if (/^\d+$/.test(input.autor)) {
    errors.autor = "No escribir numeros!!";
  };

  if (!input.autorNacionalidad) {
    errors.autorNacionalidad = "La nacionalidad del autor del libro es requerido";
  } else if (/^\d+$/.test(input.autorNacionalidad)) {
    errors.autorNacionalidad = "No escribir numeros!!";
  };

  if (!input.autorNacimiento) {
    errors.autorNacimiento = "La fecha de nacimiento del autor del libro es requerido";
  };

  return errors;
};

export default FormAddLibro;