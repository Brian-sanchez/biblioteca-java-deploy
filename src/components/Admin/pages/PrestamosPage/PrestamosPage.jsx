import React from 'react'
import Sidebar from "../../sidebar/Sidebar";
import PrestamosTable from "../../datatable/PrestamosTable/PrestamosTable";

import "./list.scss";

const PrestamosPage = () => {
  return (
    <div className="list">
      <Sidebar/>
      <div className="listContainer">
        <PrestamosTable/>
      </div>
    </div>
  );
}

export default PrestamosPage