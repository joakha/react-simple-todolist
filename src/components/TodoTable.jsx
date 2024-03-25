import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css"; // Material Design theme

const TodoTable = (props) => {

    return (

        <div className="ag-theme-material" style={{ width: 800, height: 500 }}>

            <AgGridReact
                ref={props.gridRef}
                onGridReady={params => props.gridRef.current = params.api}
                rowData={props.data}
                columnDefs={props.columns}
                rowSelection="single"
            />

        </div>

    )

}

export default TodoTable;