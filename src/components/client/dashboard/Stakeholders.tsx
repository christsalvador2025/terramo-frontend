"use client";

import { Box } from "@mui/material";
import {
  ClientSideRowModelModule,
  ColDef,
  ModuleRegistry,
} from "ag-grid-community";
import { useEffect, useState } from "react";
// import ScatterChart from "@/components/scatter-chart/scatter-chart";
import ScatterChart from "@/components/client/dashboard/utils/scatter-chart/scatter-chart"
import Table from "@/components/client/dashboard/utils/table/table";
import { useClient } from "@/components/client/dashboard/context/client-context";
// import { useCalculateCoordinates } from "@/hooks/use-calculate-coordinates";
import {useCalculateCoordinates } from "@/components/client/dashboard/hooks/use-calculate-coordinates"
// import { useGetClientStakeholderMeasureGradings } from "@/hooks/use-get-client-stakeholder-measure-gradings";
import { useGetClientStakeholderMeasureGradings } from "@/components/client/dashboard/hooks/use-get-client-stakeholder-measure-gradings"

ModuleRegistry.registerModules([ClientSideRowModelModule]);

interface StakeholderAnalysisRow {
  stakeholderId: number;
  stakeholderName: string;
  dataAvailable: boolean;
  chosen: boolean;
}

const Stakeholders = () => {
  const clientData = useClient();
  const fetchedRows = useGetClientStakeholderMeasureGradings(clientData);
  const [rows, setRows] = useState<StakeholderAnalysisRow[]>(fetchedRows);
  const { xCoordinates, yCoordinates, scatterText } = useCalculateCoordinates(
    rows,
    clientData
  );

  useEffect(() => {
    setRows(fetchedRows);
  }, [fetchedRows]);

  const colDefs: ColDef[] = [
    { field: "stakeholderName", headerName: "Stakeholder", flex: 2 },
    { field: "dataAvailable", headerName: "Daten verfügbar", flex: 1 },
    {
      field: "chosen",
      headerName: "Auswahl",
      flex: 1,
      editable: (params) => params.data.dataAvailable,
    },
  ];

  const onCellValueChanged = (e: any) => {
    const updatedData = e.data as StakeholderAnalysisRow;
    setRows((prevRows) =>
      prevRows.map((row) =>
        row.stakeholderId === updatedData.stakeholderId ? updatedData : row
      )
    );
  };

  return (
    <>
      <Table
        rowData={rows}
        colDefs={colDefs}
        onCellValueChanged={onCellValueChanged}
      />
      <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
        <ScatterChart
          xCoordinates={xCoordinates}
          yCoordinates={yCoordinates}
          scatterText={scatterText}
          height={600}
          width={1000}
          title="Wesentlichkeitsmatrix Stakeholder"
          xRange={[0, 3.5]}
          yRange={[0, 3.5]}
          categoriesInfo={[
            {
              categoryName: "Gesellschaft",
              categoryColor: "#005959",
              categoryBorderColor: "#669b9b",
            },
            {
              categoryName: "Umwelt",
              categoryColor: "#7ba042",
              categoryBorderColor: "#afc68d",
            },
            {
              categoryName: "Wirtschaft",
              categoryColor: "#b27300",
              categoryBorderColor: "#d0ab66",
            },
          ]}
        />
      </Box>
    </>
  );
};

export default Stakeholders;