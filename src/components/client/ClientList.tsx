"use client";
import { Button, Container, Grid2 as Grid, Pagination, Stack } from "@mui/material";
import React, { useState } from "react";
import TitleBar from "./title-bar/title-bar"; 
import ClientCard from "./client-card";
import { useGetAllClientsQuery } from "@/lib/redux/features/clients/_clientApiSlice";
import Spinner from "../shared/Spinner";
import Link from "next/link";

// Interface for a single client object, matching your API response
// Define the specific type for the invitation status object
interface ClientInvitationStatus {
  status: string;
  status_display: string;
  expires_at: string;
  is_expired: boolean;
}

// Update the Client interface to allow for null
interface Client {
  id: string;
  company_name: string;
  contact_person_first_name: string;
  contact_person_last_name: string;
  email: string;
  city: string;
  land: string;
  is_active: boolean;
  products_count: number;
  // Make invitation_status an optional property that can also be null
  invitation_status?: ClientInvitationStatus | null;
  created_at: string;
  company_photo?: string | null | undefined;
}

// Interface for the entire API response, including pagination metadata
interface ApiResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Client[];
}

// Interface for what ClientCard expects
interface ClientCardData {
  id: string;
  name: string;
  company_photo?: string | null | undefined;
}

const ClientsComponent = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);

  // You can specify the type of data returned by the query
  const { data, isLoading, error } = useGetAllClientsQuery();
    
  if (isLoading) {
    return (
      <div className="flex-center pt-32">
        <Spinner size="xl" />
      </div>
    );
  }
  
  // Use a more descriptive error message
  if (error || !data) {
    console.error('Error fetching clients:', error);
    let error_msg = "An error occurred while fetching clients"
    if (error?.status === 403 ){
      error_msg = error?.data?.detail || "Unauthorized Access, Only for Terramo Admin."
    }
    return (
      <div className="flex-center flex-col pt-32">
        <h1 className="text-xl">{error_msg}</h1>
        <Link href="/client-admin/dashboard" className="mt-4">

          <Button
            type="button"
            style={{ background: "#026770", color: "#FFFF" }}
            className="h4-semibold w-full"
           
          >
            Go to Dashboard
          </Button>
        </Link>
        
      </div>
    );
  }
  
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
    setPage(1); // Reset to page 1 on a new search
  };

  const itemsPerPage = 4;

  const handlePageChange = (
    _: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };
  
  // The 'clients' variable should be an array of Client objects, not a ClientsComponentProps object.
  // We can directly use data.results, which is already an array of clients.
  const allClients: Client[] = data.results;

  const filteredClients: Client[] = allClients.filter((client) =>
    client.company_name.toLowerCase().includes(searchQuery.toLowerCase())
   
  );

  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedClients: Client[] = filteredClients.slice(startIndex, endIndex);
  
  const paginationCount = Math.ceil(filteredClients.length / itemsPerPage);

  return (
    <Container sx={{ marginTop: '72px' }}>
      <TitleBar
        title="Kunden"
        search={true}
        onSearchChange={handleSearchChange}
      />
      {/* Conditionally render the grid or a message if no clients are found */}
      {displayedClients.length > 0 ? (
        <Grid container spacing={2} height="400px" style={{ minWidth: '100%' }}>
          {displayedClients.map((client) => {
            const clientData: ClientCardData = {
              id: client.id,
              name: client.company_name,
              company_photo: client.company_photo
            };

            return (
              <Grid size={3} key={client.id}>
                <ClientCard clientData={clientData} />
              </Grid>
            );
          })}
        </Grid>
      ) : (
        <div className="flex-center pt-16">
          <p>No clients found.</p>
        </div>
      )}
      
      {paginationCount > 1 && ( // Only show pagination if there's more than one page
        <Stack spacing={2} alignItems="center" sx={{ mt: 3 }}>
          <Pagination
            count={paginationCount}
            page={page}
            onChange={handlePageChange}
            
            style={{color: '#026770'}}
          />
        </Stack>
      )}
    </Container>
  );
};

export default ClientsComponent;