import React, { useEffect } from 'react';
import { useDispatch } from "react-redux";

import { getAllLectores, getAllBooks, getAllMultas, getAllPrestamos, getAllCopias, getCopiasDisponibles } from "../../../../Redux/actions/index";

import Sidebar from "../../sidebar/Sidebar";
import Widget from "../../widget/Widget";
import Chart from "../../chart/Chart";

import "./admin.scss";

const Admin = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllLectores());
    dispatch(getAllBooks());
    dispatch(getAllMultas());
    dispatch(getAllPrestamos());
    dispatch(getAllCopias());
    dispatch(getCopiasDisponibles());
  }, [dispatch]);

  return (
    <div className="home">
      <Sidebar/>
      <div className="homeContainer">
        <div className="widgets">
          <Widget type="libros" />
          <Widget type="copias" />
          <Widget type="lectores" />
          <Widget type="prestamos" />
          <Widget type="multas" />
        </div>
        <div className="charts">
          <Chart title="Ultimos 6 meses (Prestamos)" aspect={2.5 / 1} />
        </div>
      </div>
    </div>
  );
};

export default Admin;
