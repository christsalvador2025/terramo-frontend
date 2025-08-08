import Stakeholders from "@/components/client/dashboard/Stakeholders";

 
export default function StakeholderPage() {
  return <Stakeholders/>
}

// 'use client';

// import { useState, useEffect, useMemo } from 'react';
// import { Box, Typography, Container } from '@mui/material';
// import { ColDef } from 'ag-grid-community';
// import dynamic from 'next/dynamic';
// import { useClient } from '../components/ClientDashboardProvider';
// import { 
//   useFetchStakeholdersQuery,
//   useGetClientStakeholderMeasureGradingsQuery 
// } from '@/lib/redux/features/api/clientApiSlice';
// import DataTable from '../components/DataTable';

// // Dynamic import for ScatterChart to avoid SSR issues
// const ScatterChart = dynamic(() => import('../components/ScatterChart'), { ssr: false });

// interface StakeholderAnalysisRow {
//   stakeholderId: number;
//   stakeholderName: string;
//   dataAvailable: boolean;
//   chosen: boolean;
// }

// export default function StakeholderPage() {
//   const { client } = useClient();
//   const { data: stakeholders = [] } = useFetchStakeholdersQuery();
//   const { data: stakeholderGradings = [] } = useGetClientStakeholderMeasureGradingsQuery(client?.id);
  
//   const [rows, setRows] = useState<StakeholderAnalysisRow[]>([]);

//   // Initialize stakeholder data
//   useEffect(() => {
//     if (stakeholders.length > 0 && client) {
//       const initialRows = stakeholders.map((stakeholder: any) => {
//         const isDataAvailable = stakeholderGradings.some(
//           (grading: any) => Number(grading.stakeholder) === Number(stakeholder.id)
//         );

//         return {
//           stakeholderId: stakeholder.id,
//           stakeholderName: stakeholder.label,
//           dataAvailable: !!isDataAvailable,
//           chosen: false,
//         };
//       });
//       setRows(initialRows);
//     }
//   }, [stakeholders, stakeholderGradings, client]);

//   // Calculate coordinates for scatter chart
//   const { xCoordinates, yCoordinates, scatterText } = useMemo(() => {
//     const chosenStakeholders = rows.filter(row => row.chosen);
//     const yCoords: number[] = [];
//     const xCoords: number[] = [];
//     const scatterTexts: string[] = [];

//     if (!client?.measureGradings) {
//       return { xCoordinates: [], yCoordinates: [], scatterText: [] };
//     }

//     const gradingKeys = client.measureGradings.map((grading: any) => grading.key);

//     gradingKeys.forEach((key: string) => {
//       const yValues: number[] = [];
      
//       chosenStakeholders.forEach(stakeholder => {
//         if (stakeholder.stakeholderId !== 1) { // Exclude stakeholder with id=1
//           const stakeholderGrading = stakeholderGradings.find(
//             (grading: any) => Number(grading.stakeholder) === Number(stakeholder.stakeholderId)
//           );
          
//           if (stakeholderGrading) {
//             const grading = stakeholderGrading.gradings.find((g: any) => g.key === key);
//             if (grading) {
//               yValues.push(grading.prio);
//             }
//           }
//         }
//       });

//       if (yValues.length > 0) {
//         const meanY = yValues.reduce((a, b) => a + b, 0) / yValues.length;
//         yCoords.push(meanY);
        
//         const xGrading = client.measureGradings.find((grading: any) => grading.key === key);
//         if (xGrading) {
//           xCoords.push(xGrading.prio);
//         }
//         scatterTexts.push(key);
//       }
//     });

//     return {
//       xCoordinates: xCoords,
//       yCoordinates: yCoords,
//       scatterText: scatterTexts,
//     };
//   }, [rows, client, stakeholderGradings]);

//   const colDefs: ColDef[] = [
//     { field: 'stakeholderName', headerName: 'Stakeholder', flex: 2 },
//     { 
//       field: 'dataAvailable', 
//       headerName: 'Daten verfügbar', 
//       flex: 1,
//       cellRenderer: (params: any) => params.value ? 'Ja' : 'Nein'
//     },
//     {
//       field: 'chosen',
//       headerName: 'Auswahl',
//       flex: 1,
//       editable: (params: any) => params.data.dataAvailable,
//       cellRenderer: (params: any) => {
//         return params.data.dataAvailable ? (params.value ? 'Ausgewählt' : 'Nicht ausgewählt') : '-';
//       },
//     },
//   ];

//   const onCellValueChanged = (e: any) => {
//     const updatedData = e.data as StakeholderAnalysisRow;
//     setRows(prevRows =>
//       prevRows.map(row =>
//         row.stakeholderId === updatedData.stakeholderId ? updatedData : row
//       )
//     );
//   };

//   return (
//     <Container maxWidth="xl" className="py-6">
//       <Typography variant="h4" gutterBottom>
//         Stakeholder-Analyse
//       </Typography>

//       <div className="mb-8">
//         <DataTable
//           rowData={rows}
//           colDefs={colDefs}
//           onCellValueChanged={onCellValueChanged}
//         />
//       </div>

//       <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
//         <ScatterChart
//           xCoordinates={xCoordinates}
//           yCoordinates={yCoordinates}
//           scatterText={scatterText}
//           height={600}
//           width={1000}
//           title="Wesentlichkeitsmatrix Stakeholder"
//           xRange={[0, 3.5]}
//           yRange={[0, 3.5]}
//           categoriesInfo={[
//             {
//               categoryName: "Gesellschaft",
//               categoryColor: "#005959",
//               categoryBorderColor: "#669b9b",
//             },
//             {
//               categoryName: "Umwelt",
//               categoryColor: "#7ba042",
//               categoryBorderColor: "#afc68d",
//             },
//             {
//               categoryName: "Wirtschaft",
//               categoryColor: "#b27300",
//               categoryBorderColor: "#d0ab66",
//             },
//           ]}
//         />
//       </Box>
//     </Container>
//   );
// }
