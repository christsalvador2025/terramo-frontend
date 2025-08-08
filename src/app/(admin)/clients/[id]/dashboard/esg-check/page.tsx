import EsgCheck from "@/components/client/dashboard/EsgCheck";

 

export default function EsgCheckPage() {
  return <EsgCheck />
}

// 'use client';

// import React, { useState, useEffect, useMemo } from 'react';
// import {
//   Container,
//   FormControl,
//   FormControlLabel,
//   FormLabel,
//   Radio,
//   RadioGroup,
//   Typography,
//   TextField,
//   Box,
//   Paper,
//   Divider,
// } from '@mui/material';
// import { ColDef } from 'ag-grid-community';
// import dynamic from 'next/dynamic';
// import { useClient } from '../components/ClientDashboardProvider';
// import { 
//   useFetchMeasuresQuery,
//   useGetClientEsgCommentsQuery,
//   useUpdateEsgCommentsMutation 
// } from '@/lib/redux/features/api/clientApiSlice';
// import DataTable from '../components/DataTable';
// import { categorizeMeasureGrading } from '@/components/client/utils/measure-utils';
// import { useAppDispatch, useAppSelector } from '@/lib/redux/hooks/typedHooks';
// // import { useAppDispatch } from "@/lib/redux/hooks/typedHooks";
// // import { setEsgCategory, setEsgComment } from '@/lib/redux/features/client/clientSlice';
// import { setEsgCategory, setEsgComment } from '@/lib/redux/features/api/clientSlice';
// // Dynamic import for Plot to avoid SSR issues
// const Plot = dynamic(() => import('react-plotly.js'), { ssr: false });

// interface MeasureGrading {
//   key: string;
//   name: string;
//   grading: number;
//   statusQuo: number;
//   category: string;
//   kommentar: string;
// }

// export default function EsgCheckPage() {
//   const dispatch = useAppDispatch();
//   const { client } = useClient();
//   const { data: measures = [] } = useFetchMeasuresQuery();
//   const { data: esgComments = {} } = useGetClientEsgCommentsQuery(client?.id || '', {
//     skip: !client?.id
//   });
//   const [updateEsgComments] = useUpdateEsgCommentsMutation();
  
//   // Get category from Redux store
//   const activeCategory = useAppSelector(state => state.client.esgCategory);
//   const reduxComments = useAppSelector(state => state.client.esgComments);

//   // Local state for immediate UI updates
//   const [localComments, setLocalComments] = useState<Record<string, string>>({});

//   // Initialize comments from API and Redux
//   useEffect(() => {
//     setLocalComments({ ...esgComments, ...reduxComments });
//   }, [esgComments, reduxComments]);

//   // Process measure gradings with comments
//   const processedData = useMemo(() => {
//     if (!client?.measureGradings || !measures.length) return {};

//     const measureGradings = client.measureGradings.map((grading: any) => {
//       const measure = measures.find((m: any) => m.key === grading.key);
//       const category = categorizeMeasureGrading(grading);
      
//       return {
//         key: grading.key,
//         name: measure?.name || 'Unknown',
//         grading: grading.prio,
//         statusQuo: grading.statusQuo,
//         category,
//         kommentar: localComments[grading.key] || '',
//       };
//     });

//     // Group by category
//     return measureGradings.reduce((acc: Record<string, MeasureGrading[]>, grading) => {
//       if (!acc[grading.category]) acc[grading.category] = [];
//       acc[grading.category].push(grading);
//       return acc;
//     }, {});
//   }, [client, measures, localComments]);

//   const activeData = processedData[activeCategory] || [];

//   // Calculate mean row
//   const meanRow = useMemo(() => {
//     const calculateMean = (field: keyof MeasureGrading) => {
//       if (activeData.length === 0) return 0;
//       const total = activeData.reduce((sum, row) => {
//         const value = Number(row[field]);
//         return sum + (isNaN(value) ? 0 : value);
//       }, 0);
//       return Math.round((total / activeData.length) * 100) / 100;
//     };

//     return {
//       key: 'Durchschnitt',
//       name: '',
//       grading: calculateMean('grading'),
//       statusQuo: calculateMean('statusQuo'),
//       category: activeCategory,
//       kommentar: '',
//     };
//   }, [activeData, activeCategory]);

//   const handleCategoryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const newCategory = event.target.value;
//     dispatch(setEsgCategory(newCategory));
//   };

//   const handleCommentChange = (key: string, value: string) => {
//     // Update local state immediately for UI responsiveness
//     setLocalComments(prev => ({ ...prev, [key]: value }));
    
//     // Update Redux store
//     dispatch(setEsgComment({ key, comment: value }));

//     // Debounced API call would go here (implement debouncing as needed)
//     // For now, we'll save on blur or after a delay
//   };

//   const saveComments = async () => {
//     if (!client?.id) return;
    
//     try {
//       await updateEsgComments({
//         clientId: client.id,
//         comments: localComments
//       }).unwrap();
//     } catch (error) {
//       console.error('Error saving comments:', error);
//     }
//   };

//   const createPlotData = () => {
//     return [
//       {
//         type: 'bar',
//         x: activeData.map(d => -d.grading).reverse(),
//         base: 0,
//         y: activeData.map(d => d.key).reverse(),
//         orientation: 'h',
//         name: 'Priorität',
//         marker: { color: '#026770' },
//       },
//       {
//         type: 'bar',
//         x: activeData.map(d => d.statusQuo).reverse(),
//         base: 0,
//         y: activeData.map(d => d.key).reverse(),
//         orientation: 'h',
//         name: 'Status Quo',
//         marker: { color: '#7DB6B7' },
//       },
//     ];
//   };

//   // Custom cell renderer for comments
//   const CommentCellRenderer = (props: any) => {
//     const [value, setValue] = useState(props.value || '');
    
//     useEffect(() => {
//       setValue(props.value || '');
//     }, [props.value]);

//     const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//       setValue(e.target.value);
//     };

//     const handleBlur = () => {
//       if (value !== props.value) {
//         handleCommentChange(props.data.key, value);
//       }
//     };

//     const handleKeyPress = (e: React.KeyboardEvent) => {
//       if (e.key === 'Enter') {
//         handleBlur();
//       }
//     };

//     return (
//       <TextField
//         value={value}
//         onChange={handleChange}
//         onBlur={handleBlur}
//         onKeyPress={handleKeyPress}
//         size="small"
//         placeholder="Kommentar hinzufügen..."
//         variant="outlined"
//         fullWidth
//         sx={{
//           '& .MuiOutlinedInput-root': {
//             minHeight: '36px',
//             '& fieldset': {
//               borderColor: 'transparent',
//             },
//             '&:hover fieldset': {
//               borderColor: 'rgba(0, 0, 0, 0.23)',
//             },
//             '&.Mui-focused fieldset': {
//               borderColor: '#1976d2',
//             },
//           },
//         }}
//       />
//     );
//   };

//   const colDefs: ColDef[] = [
//     { 
//       field: 'key', 
//       headerName: 'Index', 
//       flex: 1,
//       minWidth: 80,
//     },
//     { 
//       field: 'name', 
//       headerName: 'Massnahme', 
//       flex: 4,
//       minWidth: 300,
//     },
//     { 
//       field: 'grading', 
//       headerName: 'Priorität', 
//       flex: 1,
//       minWidth: 100,
//       type: 'numericColumn',
//     },
//     { 
//       field: 'statusQuo', 
//       headerName: 'Status Quo', 
//       flex: 1,
//       minWidth: 100,
//       type: 'numericColumn',
//     },
//     { 
//       field: 'kommentar', 
//       headerName: 'Kommentar', 
//       flex: 3,
//       minWidth: 250,
//       cellRenderer: CommentCellRenderer,
//       cellStyle: { padding: '4px' },
//     },
//   ];

//   return (
//     <Container maxWidth="xl" className="py-6 space-y-6">
//       <Paper elevation={1} sx={{ p: 3 }}>
//         <Typography variant="h4" gutterBottom>
//           ESG-Check - 2025
//         </Typography>
        
//         <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
//           Um Nachhaltigkeit zu erzielen, werden verschiedene Massnahmen eingesetzt. 
//           Abhängig vom Unternehmen sind manche wichtiger, manche weniger. Wie schätzen 
//           Sie die Priorität der jeweiligen Massnahmen aus Sicht Ihres Unternehmens ein? 
//           Schätzen Sie auch ein, wie weit diese Massnahmen fortgeschritten sind.
//         </Typography>

//         <FormControl component="fieldset" sx={{ mb: 4 }}>
//           <FormLabel component="legend" sx={{ mb: 2 }}>
//             Kategorie auswählen:
//           </FormLabel>
//           <RadioGroup
//             row
//             value={activeCategory}
//             onChange={handleCategoryChange}
//             sx={{ gap: 3 }}
//           >
//             <FormControlLabel 
//               value="Umwelt" 
//               control={<Radio />} 
//               label="Umwelt"
//               sx={{ 
//                 '& .MuiFormControlLabel-label': { 
//                   fontWeight: activeCategory === 'Umwelt' ? 600 : 400 
//                 }
//               }}
//             />
//             <FormControlLabel 
//               value="Gesellschaft" 
//               control={<Radio />} 
//               label="Gesellschaft"
//               sx={{ 
//                 '& .MuiFormControlLabel-label': { 
//                   fontWeight: activeCategory === 'Gesellschaft' ? 600 : 400 
//                 }
//               }}
//             />
//             <FormControlLabel 
//               value="Wirtschaft" 
//               control={<Radio />} 
//               label="Wirtschaft"
//               sx={{ 
//                 '& .MuiFormControlLabel-label': { 
//                   fontWeight: activeCategory === 'Wirtschaft' ? 600 : 400 
//                 }
//               }}
//             />
//           </RadioGroup>
//         </FormControl>

//         <Divider sx={{ mb: 3 }} />

//         <Typography variant="h6" gutterBottom>
//           {`Relevanz für das Unternehmen & Status Quo, Bereich ${activeCategory}`}
//         </Typography>
//       </Paper>

//       <Paper elevation={1} sx={{ p: 3 }}>
//         <DataTable 
//           rowData={[...activeData, meanRow]} 
//           colDefs={colDefs}
//         />
//       </Paper>

//       <Paper elevation={1} sx={{ p: 3 }}>
//         <Typography variant="h6" gutterBottom>
//           ESG Chart - {activeCategory}
//         </Typography>
//         <Box sx={{ 
//           display: 'flex', 
//           justifyContent: 'center', 
//           minHeight: 600,
//           '& .plotly': { width: '100% !important' }
//         }}>
//           <Plot
//             data={createPlotData()}
//             layout={{
//               barmode: 'relative',
//               title: {
//                 text: `ESG Priorität vs Status Quo - ${activeCategory}`,
//                 font: { size: 16 }
//               },
//               height: 600,
//               margin: { l: 150, r: 50, t: 80, b: 50 },
//               xaxis: {
//                 title: 'Bewertung',
//                 zeroline: true,
//                 zerolinewidth: 2,
//                 zerolinecolor: '#000000',
//               },
//               yaxis: {
//                 title: 'Massnahmen',
//                 automargin: true,
//               },
//               legend: {
//                 orientation: 'h',
//                 y: -0.1,
//                 x: 0.5,
//                 xanchor: 'center'
//               },
//               paper_bgcolor: 'rgba(0,0,0,0)',
//               plot_bgcolor: 'rgba(0,0,0,0)',
//             }}
//             config={{
//               displayModeBar: true,
//               displaylogo: false,
//               modeBarButtonsToRemove: ['pan2d', 'lasso2d', 'select2d'],
//               toImageButtonOptions: { 
//                 format: 'svg', 
//                 height: 600, 
//                 width: 1000,
//                 filename: `esg-chart-${activeCategory.toLowerCase()}-${new Date().toISOString().split('T')[0]}`
//               },
//             }}
//             style={{ width: '100%', height: '600px' }}
//             useResizeHandler={true}
//           />
//         </Box>
//       </Paper>
//     </Container>
//   );
// }