import { Button, Container } from '@mui/material';
import { useEffect, useState } from 'react';
import './App.css';
import { AssetForm } from './AssetForm';
import { ModelTable } from './ModelTable';
import { SettingsForm } from './SettingsForm';

export function App() {
  const [hasBegun, beginSim] = useState(false);
  const [isFinished, setFinished] = useState(false);

  return (
    <div className="App">
      {!hasBegun && (
        <>
          <AssetForm />
          <SettingsForm />
          <Container sx={{ marginTop: '2rem' }}>
            <Button variant="contained" onClick={() => beginSim(true)}>
              Begin
            </Button>
          </Container>
        </>
      )}
      {hasBegun && <ModelTable />}
    </div>
  );
}
