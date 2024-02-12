import { useState, useEffect, useCallback, useRef } from 'react';
import { AgGridReact } from 'ag-grid-react';
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { getAnimalData } from '../../../util/SaveAPI';

interface animalInfo {
  animalId: number;
  code: string;
  breed: string;
  age: number;
  gender: string;
  isNeuter: string;
  state: string;
}

const SavedAnimalList = () => {
  const gridRef = useRef<AgGridReact | null>(null);
  const columns = [
    { field: 'code', headerName: '동물 코드' },
    { field: 'breed', headerName: '품종' },
    { field: 'age', headerName: '나이' },
    { field: 'gender', headerName: '성별' },
    { field: 'isNeuter', headerName: '중성화 여부' },
    { field: 'state', headerName: '보호 상태' },
    { field: 'animalId', headerName: ''}
  ];
  const [animalData, setAnimalData] = useState<animalInfo[]>();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState();
  const [totalElements, setTotalElements] = useState();
  const [hasNextPage, setHasNextPage] = useState();
  const [hasPreviousPage, setPreviousPage] = useState();

  const onGridReady = useCallback((e: any) => {
    e.api.sizeColumnsToFit();
  },[]);

  const onSelectionChanged = () => {
    const selectedRow = gridRef.current?.api.getSelectedRows()[0];
  };

  const gridOptions: any = {
    autoSizeStrategy: {
      type: 'fitCellContents'
    },
    rowSelection: 'single',
  };

  const getanimalInfo = async () => {
    const response = await getAnimalData(currentPage);
    
  }

  useEffect(() => {

  })

  return (
    <>
      <div className="ag-theme-alpine" style={{height: "50vh", width: "100%"}}>
        <AgGridReact 
          ref={gridRef}
          columnDefs={columns as any} 
          rowData={[]} 
          onGridReady={onGridReady}
          onSelectionChanged={onSelectionChanged}
          gridOptions={gridOptions}
        />
      </div>
    </>
  )
}

export default SavedAnimalList;