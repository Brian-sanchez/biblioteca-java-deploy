import React, { useState, useEffect } from 'react';
import { Navigation, A11y, Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { FaRegMoneyBillAlt } from 'react-icons/fa';
import { FaShippingFast } from 'react-icons/fa';
import { FaRedo } from 'react-icons/fa';
import { FaHeadset } from 'react-icons/fa';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { FaArrowRight } from 'react-icons/fa';
import { FaPhoneAlt } from 'react-icons/fa';
import { FaEnvelope } from 'react-icons/fa';
import { FaGithub } from 'react-icons/fa';
import { FaLinkedin } from 'react-icons/fa';
import { FaBriefcase } from 'react-icons/fa';
import { FaTimes } from 'react-icons/fa';

import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

import { getAllBooks, getAllCopias, getAllLectores, getAllMultas, getAllPrestamos } from "../../Redux/actions/index";

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';

import "./Home.css";

const Home = () => {
    const dispatch = useDispatch();
    const books = useSelector((state) => state.allBooks);
    const [isClick, setIsClick] = useState(false);
    const [isClickLend, setIsClickLend] = useState(false);

    const loadingSliders = [
        {
            id: 1
        },
        {
            id: 2
        },
        {
            id: 3
        },
        {
            id: 4
        },
        {
            id: 5
        },
        {
            id: 6
        }
    ]

    const handleOnClick = () => {
        setIsClick(!isClick);
    };

    const handleOnClickLend = () => {
        setIsClickLend(!isClickLend);
    };

    const handleCloseLend = () => {
        setIsClickLend(false);
    };

    const handleClose = () => {
        setIsClick(false);
    };

    useEffect(() => {
        dispatch(getAllBooks());
        dispatch(getAllCopias());
        dispatch(getAllLectores());
        dispatch(getAllPrestamos());
        dispatch(getAllMultas());
    }, [dispatch]);

  return (
    <div>
        <header className="header">
            <div className="header-1">
                <a href="#home" className="logo">Biblioteca</a>
                
                <nav className="header-navbar">
                    <a href="#home" className="menu">Inicio</a>
                    <a href="#books" className="menu">Nuestros libros</a>
                    <Link to="/admin" className="menu">Modo Administrador</Link>
                </nav>
            </div>
        </header>
    
        <div className={`lend-form-container ${isClickLend ? 'active' : ''}`}>
            <FaTimes id="close-lend-btn" className="fas fa-times" onClick={handleCloseLend}></FaTimes>

            <form action="/" id="formulario">
                <h3>Prestamo</h3>
                <span>Nombre</span>
                <input type="text" name="name" className="box" placeholder="Ingrese su nombre..." id="nombre" required />

                <span>Telefono</span>
                <input type="text" name="phone" className="box" placeholder="Ingrese su telefono" id="telefono" required />

                <span>Direccion</span>
                <input type="text" name="address" className="box" placeholder="Ingrese su direccion" id="direccion" required />

                <span>Seleccionar un libro</span>
                <select className="box" required>
                    <option>Eligir un libro</option>
                    {
                        books && books.map(b => (
                            <option key={b.id}>{b.titulo}</option>
                        ))
                    }
                </select>

                <p className="error"></p>

                <input type="submit" value="Pedir prestamo" className="btn" />
            </form>
        </div>

        <div className={`return-form-container ${isClick ? 'active' : ''}`}>
            <FaTimes id="close-return-btn" className="fas fa-times" onClick={handleClose}></FaTimes>

            <form action="/" id="return-form">
                <h3>Devolucion</h3>
                <span>Nombre</span>
                <input type="text" name="name" className="box" placeholder="Ingrese su nombre..." id="nombre" required />

                <span>Telefono</span>
                <input type="text" name="phone" className="box" placeholder="Ingrese su telefono" id="telefono" required />

                <span>Seleccionar un libro</span>
                <select className="box" required>
                    <option>Eligir un libro</option>
                    {
                        books && books.map(b => (
                            <option key={b.id}>{b.titulo}</option>
                        ))
                    }
                </select>

                <span>Indicar el estado de la copia</span>
                <select className="box" required>
                    <option>Eligir estado</option>
                    <option>Sin daños</option>
                    <option>Con daños</option>
                    <option>Totalmente roto</option>
                    <option>Lo perdi</option>
                </select>

                <p className="error-devolucion"></p>

                <input type="submit" value="Devolver copia" className="btn" />
            </form>
        </div>
    
        <section className="home" id="home">
            <div className="row">
                <div className="content">
                    <h3>Prestamo de libros</h3>
                    <p>Pida un prestamo de los mejores libros de sudamerica totalmente gratis!!</p>
                    <div id="prestamo-btn" className="btn" onClick={handleOnClickLend}>Prestamo</div>
                    <div id="return-btn" className="btn" onClick={handleOnClick}>Devolucion</div>
                </div>
            </div>
        </section>

        <section className="icons-container">
            <div className="icons">
                <FaShippingFast className='icon'/>
                <div className="content">
                    <h3>Envio Gratis</h3>
                    <p>A todo el mundo</p>
                </div>
            </div>

            <div className="icons">
                <FaRegMoneyBillAlt className='icon'/>
                <div className="content">
                    <h3>Multas</h3>
                    <p>Se le dara una multa si no devuelve el libro</p>
                </div>
            </div>

            <div className="icons">
                <FaRedo className='icon'/>
                <div className="content">
                    <h3>Devoluciones</h3>
                    <p>30 dias para devolver un libro</p>
                </div>
            </div>

            <div className="icons">
                <FaHeadset className='icon'/>
                <div className="content">
                    <h3>Soporte 24/7</h3>
                    <p>Contactese en cualquier momento del dia</p>
                </div>
            </div>
        </section>

        <section className="our-books" id="books">
            <h1 className="heading"> <span>Nuestros Libros</span> </h1>
            <div className="swiper our-books-slider">
                <div className="swiper-wrapper">
                    <Swiper
                    modules={[Navigation, A11y, Autoplay]}
                    spaceBetween={50}
                    slidesPerView={3}
                    navigation
                    loop={true}
                    autoplay={{
                        delay: 2500,
                        disableOnInteraction: false,
                      }}

                    breakpoints={{
                        0: {
                            slidesPerView: 1,
                        },
                        450: {
                        slidesPerView: 2,
                        },
                        768: {
                        slidesPerView: 3,
                        },
                        1024: {
                        slidesPerView: 4,
                        },
                    }}
                    >
                        {
                            !books.length ?
                            loadingSliders.map(l => (
                                <SwiperSlide key={l.id}>
                                    <div className='swiper-slide box'>
                                        <Skeleton className='skeleton-book'/>
                                    </div>
                                </SwiperSlide>
                            ))
                            :
                            books.map(e => (
                                <SwiperSlide key={e.id}>
                                    <div className='swiper-slide box'>
                                        <div className="icons">
                                            <h2>Autor: &nbsp;{e.autor}</h2>
                                        </div>

                                        <div className="image">
                                            <img src={e.image} alt={e.titulo} /> 
                                        </div>
                                    </div>
                                </SwiperSlide>
                            ))
                        }
                    </Swiper>
                </div>
            </div>
        </section>

        <section className="footer">
            <div className="box-container">
                <div className="box">
                    <h3>En donde estamos</h3>
                    <a href="https://www.google.com.ar/maps/place/Argentina/@-37.0448191,-81.7039944,4z/data=!3m1!4b1!4m5!3m4!1s0x95bccaf5f5fdc667:0x3d2f77992af00fa8!8m2!3d-38.416097!4d-63.616672" target="_blank" rel='noreferrer'> <FaMapMarkerAlt className='icon'/> <p>Argentina</p> </a>
                    <a href="https://www.google.com.ar/maps/place/Uruguay/@-32.6004538,-58.0342502,7z/data=!3m1!4b1!4m5!3m4!1s0x9575073afb5fde09:0x4a5596616016524a!8m2!3d-32.522779!4d-55.765835" target="_blank" rel='noreferrer'> <FaMapMarkerAlt className='icon'/> <p>Uruguay</p> </a>
                    <a href="https://www.google.com.ar/maps/place/Chile/@-35.4320525,-106.3144845,4z/data=!3m1!4b1!4m5!3m4!1s0x9662c5410425af2f:0x505e1131102b91d!8m2!3d-35.675147!4d-71.542969" target="_blank" rel='noreferrer'> <FaMapMarkerAlt className='icon'/> <p>Chile</p> </a>
                    <a href="https://www.google.com.ar/maps/place/Perú/@-9.1297791,-84.0951571,5z/data=!3m1!4b1!4m5!3m4!1s0x9105c850c05914f5:0xf29e011279210648!8m2!3d-9.189967!4d-75.015152" target="_blank" rel='noreferrer'> <FaMapMarkerAlt className='icon'/> <p>Peru</p> </a>
                    <a href="https://www.google.com.ar/maps/place/Bolivia/@-16.0907823,-72.6175019,5z/data=!3m1!4b1!4m5!3m4!1s0x915edf8977bba295:0x1c9ec2bb0115edbf!8m2!3d-16.290154!4d-63.588653" target="_blank" rel='noreferrer'> <FaMapMarkerAlt className='icon'/> <p>Bolivia</p> </a>
                </div>

                <div className="box">
                    <h3>Menu</h3>
                    <a href="#home"> <FaArrowRight className='icon'/> <p>Inicio</p> </a>
                    <a href="#books"> <FaArrowRight className='icon'/> <p>Nuestros Libros</p> </a>
                </div>

                <div className="box">
                    <h3>Contacto</h3>
                    <a href="https://api.whatsapp.com/send/?phone=541167104993&text&app_absent=0" target="_blank" rel='noreferrer'> <FaPhoneAlt className='icon'/> <p>+54 11 6710-4993</p></a>
                    <a href="mailto:contacto@briansanchez.me" target="_blank" rel='noreferrer'> <FaEnvelope className='icon'/> <p>contacto@briansanchez.com</p> </a>
                </div>
            </div>

            <div className="share">
                <a href="https://github.com/Brian-sanchez" target="_blank" rel='noreferrer'> <FaGithub className='icon'/> </a>
                <a href="https://www.linkedin.com/in/brian-sanchez-2003" target="_blank" rel='noreferrer'> <FaLinkedin className='icon'/> </a>
                <a href="https://briansanchez.me" target="_blank" rel='noreferrer'> <FaBriefcase className='icon'/> </a>
            </div>

            <div className="credit">© 2022 <strong>Brian Sanchez</strong>, Todos los derechos reservados</div>
        </section>
    </div>
  )
}

export default Home