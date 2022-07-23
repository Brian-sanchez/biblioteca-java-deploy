import React from 'react'
import Sidebar from "../../sidebar/Sidebar";
import LibrosTable from "../../datatable/LibrosTable/LibrosTable";

import "./list.scss";

const LibrosPage = () => {
  return (
    <div className="list">
      <Sidebar/>
      <div className="listContainer">
        <LibrosTable/>
      </div>
    </div>
  );
};

export default LibrosPage;