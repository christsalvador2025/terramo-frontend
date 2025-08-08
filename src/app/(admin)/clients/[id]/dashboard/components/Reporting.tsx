'use client';

import { 
  Box, 
  Typography, 
  Button, 
  Paper 
} from '@mui/material';

interface ReportingProps {
  onPrev: () => void;
}

export default function Reporting({ onPrev }: ReportingProps) {
  return (
    <Paper elevation={2} sx={{ p: 3, mt: 2 }}>
      <Typography variant="h6" gutterBottom>
        Reporting
      </Typography>
      
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Ergebnisse und Berichte der Wesentlichkeitsanalyse.
      </Typography>

      {/* Add your reporting content here */}
      <Box sx={{ height: 300, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Typography color="text.secondary">
          Reporting Dashboard hier implementieren
        </Typography>
      </Box>

      <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-start' }}>
        <Button variant="outlined" onClick={onPrev}>
          Zurück
        </Button>
      </Box>
    </Paper>
  );
}