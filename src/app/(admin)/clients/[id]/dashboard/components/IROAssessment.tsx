'use client';

import { 
  Box, 
  Typography, 
  Button, 
  Paper 
} from '@mui/material';

interface IROAssessmentProps {
  onNext: () => void;
  onPrev: () => void;
}

export default function IROAssessment({ onNext, onPrev }: IROAssessmentProps) {
  return (
    <Paper elevation={2} sx={{ p: 3, mt: 2 }}>
      <Typography variant="h6" gutterBottom>
        IRO Assessment
      </Typography>
      
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Führen Sie das IRO Assessment durch.
      </Typography>

      {/* Add your IRO Assessment form here */}
      <Box sx={{ height: 300, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Typography color="text.secondary">
          IRO Assessment Formular hier implementieren
        </Typography>
      </Box>

      <Box sx={{ mt: 3, display: 'flex', justifyContent: 'space-between' }}>
        <Button variant="outlined" onClick={onPrev}>
          Zurück
        </Button>
        <Button variant="contained" onClick={onNext}>
          Weiter
        </Button>
      </Box>
    </Paper>
  );
}