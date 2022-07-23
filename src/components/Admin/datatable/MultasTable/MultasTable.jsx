import React, { useState, useEffect } from 'react';
import { DataGrid } from "@mui/x-data-grid";
import { multasColumns } from "./multaData";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllMultas } from "../../../../Redux/actions/index";

import "../datatable.scss";

const MultasTable = () => {
  const dispatch = useDispatch();
  const multas = useSelector((state) => state.allMultas);

  const [data, setData] = useState(multas);

  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
  };

  const actionColumn = [
    {
      field: "action",
      headerName: "Accion",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <div className="deleteButton" onClick={() => handleDelete(params.row.id)}>Eliminar</div>

            <div className="editButton">Editar</div>
          </div>
        );
      },
    },
  ];

  useEffect(() => {
    dispatch(getAllMultas());
  }, [dispatch]);

  return (
    <div className="datatable">
      <div className="datatableTitle">
        <Link to="/admin/multas" className="link">
          Añadir Multa
        </Link>
      </div>
      
      <DataGrid
        className="datagrid"
        rows={data}
        columns={multasColumns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
      />
    </div>
  );
};

export default MultasTable;