import { Box, Button, Step, StepLabel, Stepper } from '@mui/material';
import React from 'react';

const StepsBar = ({ activeStep, handleBack }) => {
  const steps = ['Booking Form', 'Confirmation', 'Payment', 'Result'];

  return (
    <Box sx={{ width: '100%', marginBottom: 2 }}>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      {activeStep > 0 && activeStep < steps.length - 1 && (
        <Button onClick={handleBack} sx={{ mt: 2 }}>
          Back
        </Button>
      )}
    </Box>
  );
};

export default StepsBar;