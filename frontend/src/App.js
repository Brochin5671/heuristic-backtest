import { Button, Container } from '@mui/material';
import { useState } from 'react';
import './App.css';
import { AssetForm } from './AssetForm';
import { ModelTable } from './ModelTable';
import { SettingsForm } from './SettingsForm';

export function App() {
  const [hasBegun, beginSim] = useState(false);
  const [queries, setQueries] = useState();
  const [data, setData] = useState();

  function addAssetData(assets) {
    setQueries({ ...queries, assets });
  }

  function addSettingsData(settings, cashAmt) {
    setData({ ...data, cashAmt });
    setQueries({ ...queries, ...settings });
  }

  return (
    <div className="App">
      {!hasBegun && (
        <>
          <AssetForm addData={addAssetData} />
          <SettingsForm addData={addSettingsData} />
          <Container sx={{ marginTop: '2rem' }}>
            <Button
              variant="contained"
              onClick={async () => {
                const url = new URL('/api', window.location);
                url.search = new URLSearchParams(queries).toString();
                const res = await fetch(url);
                const resJSON = await res.json();
                if (!resJSON.error) {
                  setData(resJSON);
                  beginSim(true);
                }
              }}
            >
              Begin
            </Button>
          </Container>
        </>
      )}
      {hasBegun && <ModelTable data={data} />}
    </div>
  );
}
