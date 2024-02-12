import { useCallback, useRef } from 'react';
import { AgGridReact } from 'ag-grid-react';
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { applicationData } from '../../pages/visits/VisitReservationListPage';

const ReservationList: React.FC<{ selectRow: React.Dispatch<React.SetStateAction<number | undefined>>, dataList: applicationData[] }> = ({ selectRow, dataList }) => {
  const gridRef = useRef<AgGridReact | null>(null);
  const columns = [
    { field: 'reservationId', headerName: '예약 번호' },
    { field: 'code', headerName: '동물 코드' },
    { field: 'breed', headerName: '품종' },
    { field: 'date', headerName: '예약 날짜' },
    { field: 'time', headerName: '예약 시간' },
    { field: 'visitor', headerName: '예약 인원' },
    { field: 'state', headerName: '승인 여부' }
  ];

  const onGridReady = useCallback((e: any) => {
    e.api.sizeColumnsToFit();
  },[]);

  const onSelectionChanged = () => {
    const selectedRow = gridRef.current?.api.getSelectedRows()[0];
    if (selectedRow) {
      selectRow(selectedRow.reservationId || undefined);
    }
  };

  const gridOptions: any = {
    autoSizeStrategy: {
      type: 'fitCellContents'
    },
    rowSelection: 'single',
  };

  return (
    <>
      <div className="ag-theme-alpine" style={{height: "50vh", width: "100%"}}>
        <AgGridReact 
          ref={gridRef}
          columnDefs={columns as any} 
          rowData={dataList.map((data) => {
            return {
              reservationId: data.reservationId,
              code: data.code,
              breed: data.breed.replace(/_/g, ' '),
              visitor: data.visitor,
              date: data.reservationTime.split('T')[0],
              time: data.reservationTime.split('T')[1],
              state: data.state || '대기'
            }
          })} 
          onGridReady={onGridReady}
          onSelectionChanged={onSelectionChanged}
          gridOptions={gridOptions}
        />
      </div>
    </>
  )
}

export default ReservationList;