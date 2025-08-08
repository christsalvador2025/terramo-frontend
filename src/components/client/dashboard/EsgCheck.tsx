"use client";

import {
  Container,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import { ColDef } from "ag-grid-community";
// import { PlotData } from "plotly.js";
import { PlotData } from "plotly.js"
import React, { useEffect, useState } from "react";
// import Plot from "react-plotly.js";
import Plot from "react-plotly.js"
import Table from "@/components/client/dashboard/utils/table/table";
import { useClient } from "@/components/client/dashboard/context/client-context";
// import { useGetMeasuresQuery } from "@/lib/redux/features/api/clientApiSlice";
import { useGetMeasuresQuery } from "@/lib/redux/features/clients/clientApiSlicev2";

// import { Client } from "@/types/client";
import { Client } from  "@/components/client/dashboard/types/client"
import { Measure } from  "@/components/client/dashboard/types/measure"
// import { Measure } from "@/types/measure";
// import { categorizeMeasureGrading } from "@/utils/measure-utils";
import { categorizeMeasureGrading } from "@/components/client/dashboard/utils/measure-utils"
const EsgCheck = () => {
  const [chartData, setChartData] = useState<Record<string, any[]>>({});
  const [activeCategory, setActiveCategory] = useState("Umwelt");
  const { data: measures = [] } = useGetMeasuresQuery();
  const clientData = useClient();
  const [meanRow, setMeanRow] = useState({
    key: "Durchschnitt",
    name: "",
    grading: 0,
    statusQuo: 0,
  });

  const assembleMeasureGrading = (measureGrading: any, measures: Measure[]) => {
    const categoryName = categorizeMeasureGrading(measureGrading);
    const measure = measures.find((m: Measure) => m.key === measureGrading.key);
    return {
      category: categoryName,
      key: measureGrading.key,
      name: measure ? measure.name : "Unknown",
      grading: measureGrading.prio,
      statusQuo: measureGrading.statusQuo,
    };
  };

  const groupMeasureGradings = (measureGradings: any[]) => {
    return measureGradings.reduce(
      (acc, grading) => {
        const category = grading.category;
        if (!acc[category]) {
          acc[category] = [];
        }
        acc[category].push(grading);
        return acc;
      },
      {} as Record<string, any[]>
    );
  };

  const processMeasureGradings = (
    clientData: Client,
    measures: Measure[]
  ) => {
    const measureGradings = clientData.measureGradings?.map((measureGrading) =>
      assembleMeasureGrading(measureGrading, measures)
    ) || [];
    return groupMeasureGradings(measureGradings);
  };

  const calculateMean = (data: any[], field: string) => {
    if (data.length === 0) return 0;
    const total = data.reduce((sum, row) => sum + (Number(row[field]) || 0), 0);
    return Math.round((total / data.length) * 100) / 100;
  };

  const updateMeanRow = (
    chartData: Record<string, any[]>,
    activeCategory: string
  ) => {
    const activeData = chartData[activeCategory] || [];
    setMeanRow({
      key: "Durchschnitt",
      name: "",
      grading: calculateMean(activeData, "grading"),
      statusQuo: calculateMean(activeData, "statusQuo"),
    });
  };

  useEffect(() => {
    if (clientData?.measureGradings && measures.length > 0) {
      const groupedGradings = processMeasureGradings(clientData, measures);
      setChartData(groupedGradings);
    }
  }, [clientData, measures]);

  useEffect(() => {
    updateMeanRow(chartData, activeCategory);
  }, [chartData, activeCategory]);

  const handleCategoryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setActiveCategory((event.target as HTMLInputElement).value);
  };

  const createPlotData = () => {
    const activeData = chartData[activeCategory] || [];
    return [
      {
        type: "bar",
        x: activeData.map((d: any) => -d.grading).reverse(),
        base: 0,
        y: activeData.map((d: any) => d.key).reverse(),
        orientation: "h",
        name: "Priorität",
        marker: {
          color: "026770",
        },
      },
      {
        type: "bar",
        x: activeData.map((d: any) => d.statusQuo).reverse(),
        base: 0,
        y: activeData.map((d: any) => d.key).reverse(),
        orientation: "h",
        name: "Status Quo",
        marker: {
          color: "7DB6B7",
        },
      },
    ] as unknown as Partial<PlotData>[];
  };

  const colDefs: ColDef[] = [
    { field: "key", headerName: "Index", flex: 1 },
    { field: "name", headerName: "Massnahme", flex: 4 },
    { field: "grading", headerName: "Priorität", flex: 1 },
    { field: "statusQuo", headerName: "Status Quo Data", flex: 1 },
    // { field: "kommentar", headerName: "Kommentar (optional)", flex: 1 },
  ];

  const activeData = chartData[activeCategory] || [];

  return (
    <Container>
      <FormControl component="fieldset">
        <FormLabel component="legend">Kategorie</FormLabel>
        <RadioGroup
          aria-label="category"
          name="category"
          value={activeCategory}
          onChange={handleCategoryChange}
          row
        >
          <FormControlLabel value="Umwelt" control={<Radio />} label="Umwelt" />
          <FormControlLabel
            value="Gesellschaft"
            control={<Radio />}
            label="Gesellschaft"
          />
          <FormControlLabel
            value="Wirtschaft"
            control={<Radio />}
            label="Wirtschaft"
          />
        </RadioGroup>
      </FormControl>
      <Typography variant="h6" gutterBottom>
        {`Relevanz für das Unternehmen & Status Quo, Bereich ${activeCategory}`}
      </Typography>
      <Table rowData={[...activeData, meanRow]} colDefs={colDefs} />
      <Plot
        data={createPlotData()}
        layout={{
          barmode: "relative",
        }}
      />
    </Container>
  );
};

export default EsgCheck;