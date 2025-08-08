'use client';

import { Container } from '@mui/material';
import { ColDef } from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

interface DataTableProps {
  rowData: any[];
  colDefs: ColDef[];
  onCellValueChanged?: (e: any) => void;
}

export default function DataTable({ rowData, colDefs, onCellValueChanged }: DataTableProps) {
  const calculateRatio = (rowCount: number): number => {
    const exactValues = [
      93, 67.5, 59, 54.8, 52.2, 50.5, 49.3, 48.4, 47.7, 47.1, 46.6, 46.25, 45.9,
      45.65, 45.4, 45.2, 45, 44.85, 44.7, 44.55, 44.45, 44.3, 44.2, 44.12, 44.05,
    ];

    if (rowCount <= 25) {
      return exactValues[Math.max(0, rowCount - 1)];
    }

    const a = 0.5;
    const b = 0.2;
    const c = 44.05;

    return c - a * Math.exp(-b * (rowCount - 25));
  };

  const rowCount = rowData.length;
  const rowHeight = calculateRatio(rowCount);
  const gridHeight = Math.max(300, rowCount * rowHeight + 100);

  return (
    <div 
      className="ag-theme-alpine w-full"
      style={{ height: gridHeight }}
    >
      <AgGridReact
        rowData={rowData}
        columnDefs={colDefs}
        onCellValueChanged={onCellValueChanged}
        domLayout="autoHeight"
        suppressHorizontalScroll={false}
        defaultColDef={{
          resizable: true,
          sortable: true,
          filter: true,
        }}
      />
    </div>
  );
}