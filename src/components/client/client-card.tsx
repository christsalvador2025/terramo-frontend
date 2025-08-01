import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import Link from "next/link";
import React from "react"; // Added React import for good practice

// Interface for what the ClientCard component expects as props
interface ClientCardProps {
  clientData: { 
    id: string; 
    name: string; // This `name` will be used for the card title
    company_photo?: string | null | undefined; 
  };
}

const ClientCard = ({ clientData }: ClientCardProps) => {
  return (
    <Card key={clientData.id} sx={{ paddingTop: "1rem" }}>
      <CardMedia
        component="img"
        sx={{ height: 200, objectFit: "contain" }}
        src={clientData.company_photo || 'https://yavuzceliker.github.io/sample-images/image-1.jpg'}
        title={`Logo ${clientData.name}`} // Use clientData.name here
      />
      <CardContent>
        <Typography variant="h6">{clientData.name}</Typography>
        <Typography variant="body2" color="text.secondary">
          {clientData.name}
        </Typography>
      </CardContent>
      <CardActions>
        <Link href={`/clients/${clientData.id}/dashboard/esg-check`} style={{color: '#026770'}}>
          <Button size="small">Wählen</Button> {/* Wrapped "Wählen" in a Button component for better styling */}
        </Link>
      </CardActions>
    </Card>
  );
};

export default ClientCard;