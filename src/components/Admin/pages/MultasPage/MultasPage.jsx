import React from 'react'
import Sidebar from "../../sidebar/Sidebar";
import MultasTable from "../../datatable/MultasTable/MultasTable";

import "./list.scss";

const MultasPage = () => {
  return (
    <div className="list">
      <Sidebar/>
      <div className="listContainer">
        <MultasTable/>
      </div>
    </div>
  );
}

export default MultasPage