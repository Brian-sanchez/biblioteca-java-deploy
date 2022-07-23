import React, { useState, useEffect } from 'react';
import { DataGrid } from "@mui/x-data-grid";
import { lectoresColumns } from "./lectorData";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { getAllLectores, deleteLectorById } from "../../../../Redux/actions/index";

import "../datatable.scss";

const LectorTable = () => {
  const dispatch = useDispatch();
  const lectores = useSelector((state) => state.allLectores);
  const lectorID = lectores.map((l) => {
    return l.id;
  });
  
  const [data, setData] = useState(lectores);

  const actionColumn = [
    {
      field: "action",
      headerName: "Accion",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <div className="deleteButton" onClick={() => handleDelete(params.row.id)}>Eliminar</div>

            <Link to={`/admin/lectores/${params.row.id}`} className="editButton">Editar</Link>
          </div>
        );
      }
    }
  ];

  const handleDelete = (id) => {
    const idLector = lectorID.find(e => e === id)
    dispatch(deleteLectorById(idLector));
    setData(data.filter((item) => item.id !== id));
    dispatch(getAllLectores());
  };


  useEffect(() => {
    dispatch(getAllLectores());
  }, [dispatch]);

  return (
    <div className="datatable">
      <div className="datatableTitle">
        <Link to="/admin/lectores/agregarLectores" className="link">
          Añadir Lector
        </Link>
      </div>
      
      <DataGrid
        className="datagrid"
        rows={data}
        columns={lectoresColumns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
      />
    </div>
  );
};

export default LectorTable;