import React from 'react'
import Sidebar from "../../sidebar/Sidebar";
import CopiasTable from "../../datatable/CopiaTable/CopiaTable";

const CopiasPage = () => {
    return (
        <div className="list">
            <Sidebar/>
            <div className="listContainer">
                <CopiasTable/>
            </div>
        </div>
    );
}

export default CopiasPage