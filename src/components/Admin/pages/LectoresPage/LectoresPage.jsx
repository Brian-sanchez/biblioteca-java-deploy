import React from 'react'
import Sidebar from "../../sidebar/Sidebar";
import LectoresTable from "../../datatable/LectorTable/LectorTable";

import "./list.scss";

const LibrosPage = () => {
  return (
    <div className="list">
      <Sidebar/>
      <div className="listContainer">
        <LectoresTable/>
      </div>
    </div>
  );
};

export default LibrosPage;