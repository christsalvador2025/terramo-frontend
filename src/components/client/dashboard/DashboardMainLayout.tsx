"use client";

import AssessmentIcon from "@mui/icons-material/Assessment";
import EditIcon from "@mui/icons-material/Edit";
import GroupsIcon from "@mui/icons-material/Groups";
import {
  DashboardLayout,
  Navigation,
  PageContainer,
} from "@toolpad/core";
import { AppProvider } from "@toolpad/core/nextjs";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
// import { ClientProvider } from "@/context/client-context";
import { ClientProvider } from "@/components/client/dashboard/context/client-context"
// import { useGetClientByIdQuery } from "@/lib/redux/features/api/clientApiSlice";
import { useGetClientByIdQuery } from "@/lib/redux/features/clients/clientApiSlicev2"
// import { theme } from "@/theme";

export default function ClientDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const params = useParams();
  const id = params?.id as string;
  const { data: client, isLoading } = useGetClientByIdQuery(id);
  const [logoNode, setLogoNode] = useState<React.ReactNode>(null);

  const NAVIGATION: Navigation = [
    {
      kind: "header",
      title: "Dashboard",
    },
    {
      segment: `/clients/clients/${id}/dashboard/esg-check`,
      title: "ESG-Check",
      icon: <AssessmentIcon />,
    },
    {
      segment: `/clients/clients/${id}/dashboard/stakeholder`,
      title: "Stakeholder-Analyse",
      icon: <GroupsIcon />,
    },
    {
      segment: `/clients/clients/${id}/dashboard/dual-essentiality`,
      title: "Doppelte Wesentlichkeit",
      icon: <EditIcon />,
    },
  ];

  useEffect(() => {
    if (client?.company_photo) {
      setLogoNode(<img src={client.company_photo} alt="Logo" />);
    }
  }, [client]);

  if (isLoading || !client) {
    return <div>Loading...</div>;
  }

  return (
    <ClientProvider key={client.id} client={client}>
      <AppProvider
        navigation={NAVIGATION}
        branding={{ logo: logoNode, title: client.company_name }}
        // theme={theme}
      >
        <DashboardLayout
          sx={{ width: "100%", height: "calc(100vh - 64px)", display: "flex" }}
        >
          <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
            <PageContainer
              sx={{ flex: 1, overflowY: "auto" }}
              breadcrumbs={[{ path: "", title: "" }]}
            >
              {children}
            </PageContainer>
          </div>
        </DashboardLayout>
      </AppProvider>
    </ClientProvider>
  );
}
