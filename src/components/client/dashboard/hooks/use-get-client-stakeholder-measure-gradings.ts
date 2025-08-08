"use client";

import { useEffect, useState } from "react";
// import { useGetStakeholdersQuery } from "@/lib/redux/features/api/clientApiSlice";
import { useGetStakeholdersQuery } from "@/lib/redux/features/clients/clientApiSlicev2"
import { Client } from "@/components/client/dashboard/types/client"

interface Row {
  stakeholderId: number;
  stakeholderName: string;
  dataAvailable: boolean;
  chosen: boolean;
}

export const useGetClientStakeholderMeasureGradings = (clientData: Client) => {
  const [rows, setRows] = useState<Row[]>([]);
  const { data: stakeholders = [] } = useGetStakeholdersQuery();

  useEffect(() => {
    if (clientData && stakeholders.length > 0) {
      const stakeholderMeasureGradings = clientData.stakeholderMeasureGradings || [];

      const rows = stakeholders.map((stakeholder: { id: number; label: string }) => {
        const isDataAvailable = stakeholderMeasureGradings.some(
          (stakeholderGrading: { stakeholder: number; gradings: any }) => {
            return Number(stakeholderGrading.stakeholder) === Number(stakeholder.id);
          }
        );

        return {
          stakeholderId: stakeholder.id,
          stakeholderName: stakeholder.label,
          dataAvailable: !!isDataAvailable,
          chosen: false,
        };
      });
      setRows(rows);
    }
  }, [clientData, stakeholders]);

  return rows;
};