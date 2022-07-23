import React, { useState, useEffect } from 'react';
import { DataGrid } from "@mui/x-data-grid";
import { copiasColumns } from "./copiaData";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { getAllCopias, deleteCopiaById } from "../../../../Redux/actions/index";

import "../datatable.scss";

const CopiaTable = () => {
  const dispatch = useDispatch();
  const copias = useSelector((state) => state.allCopias);
  const copiaID = copias.map((l) => {
    return l.id;
  });

  const [data, setData] = useState(copias);

  const actionColumn = [
    {
      field: "action",
      headerName: "Accion",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <div className="deleteButton" onClick={() => handleDelete(params.row.id)}>Eliminar</div>

            <Link to={`/admin/copias/${params.row.id}`} className="editButton">Editar</Link>
          </div>
        );
      },
    },
  ];

  const handleDelete = (id) => {
    const idCopia = copiaID.find((e) => e === id);
    dispatch(deleteCopiaById(idCopia));
    setData(data.filter((item) => item.id !== id));
    dispatch(getAllCopias());
  };

  useEffect(() => {
    dispatch(getAllCopias());
  }, [dispatch]);

  return (
    <div className="datatable">
      <div className="datatableTitle">
        <Link to="/admin/copias/agregarCopias" className="link">
          Añadir Copia
        </Link>
      </div>
      
      <DataGrid
        className="datagrid"
        rows={data}
        columns={copiasColumns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
      />
    </div>
  );
};

export default CopiaTable;