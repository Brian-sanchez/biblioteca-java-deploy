import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { editLibro, getAllBooks } from "../../../../../Redux/actions/index";

import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/src/sweetalert2.scss';

import img from "../../../../../assets/images/book-default.jpg";

import Sidebar from "../../../sidebar/Sidebar";

import "./formEditStyles.scss";

const FormeditLibro = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { idLibro } = useParams();
  const books = useSelector((state) => state.allBooks);
  const libroFilter = books.filter(e => e.id === Number(idLibro));

  const [input, setInput] = useState({
    titulo: `${libroFilter[0].titulo}`,
    tipoLibro: `${libroFilter[0].tipoLibro}`,
    editorial: `${libroFilter[0].editorial}`,
    anyo: `${libroFilter[0].anyo}`,
    image: `${libroFilter[0].image}`,
    autor: `${libroFilter[0].autor}`,
    autorNacionalidad: `${libroFilter[0].autorNacionalidad}`,
    autorNacimiento: `${libroFilter[0].autorNacimiento}`,
    estado: `${libroFilter[0].estado}`
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
    if (!input.titulo || !input.image || !input.autor) return swalStyle.fire({
      icon: 'error',
      title: 'Error',
      text: 'Por favor complete todo el formulario',
    });
    
    e.preventDefault();
    dispatch(editLibro(input, idLibro));

    dispatch(getAllBooks());
    navigate("/admin");
    dispatch(getAllBooks());
};

  return (
    <div className="new">
      <Sidebar/>
      <div className="newContainer">
        <div className="top">
          <h1>Editar Libro</h1>
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
                  <option>Seleccione el tipo del libro</option>
                  <option value="NOVELA">Novela</option>
                  <option value="TEATRO">Teatro</option>
                  <option value="POESIA">Poesia</option>
                  <option value="ENSAYO">Ensayo</option>
                </select>
              </div>

              <div className="formInput">
                <label>Editorial</label>
                <input type="text" placeholder="Ingrese el nombre del Lector" name="editorial" onChange={handleInputChange} value={input.editorial}/>
              </div>

              <div className="formInput">
                <label>Año de Publicacion</label>
                <input type="number" min="1000" max="2023" placeholder="Ingrese el año de publicacion del Libro" name="anyo" onChange={handleInputChange} value={input.anyo}/>
              </div>

              <div className="formInput">
                <label>Imagen</label>
                <input type="text" placeholder="Ingrese el url de la portada del libro" name="image" onChange={handleInputChange} value={input.image}/>
              </div>

              <div className="formInput">
                <label>Autor</label>
                <input type="text" placeholder="Ingrese el nombre del Autor del libro" name="autor" onChange={handleInputChange} value={input.autor}/>
              </div>

              <div className="formInput">
                <label>Nacionalidad del Autor</label>
                <input type="text" placeholder="Ingrese la nacionalidad del autor" name="autorNacionalidad" onChange={handleInputChange} value={input.autorNacionalidad}/>
              </div>

              <div className="formInput">
                <label>Fecha de nacimiento del Autor</label>
                <input type="date" placeholder="Ingrese la fecha de nacimiento del autor" name="autorNacimiento" onChange={fecha} value={input.autorNacimiento}/>
              </div>
            <button>Editar Libro</button>
          </form>
        </div>
      </div>
    </div>
  );
}

// Validations
export function validateForm(input) {
  let errors = {};

  if (!input.nombre) {
    errors.nombre = "El nombre es requerido";
  }

  return errors;
};

export default FormeditLibro