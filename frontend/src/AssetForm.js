import {
  Box,
  Container,
  Grid,
  IconButton,
  List,
  TextField,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useState } from 'react';
import { Asset } from './Asset';

export function AssetForm() {
  const [asset, setAsset] = useState('');
  const [assets, setAssets] = useState([]);

  function addAsset(asset) {
    if (asset !== '' && !assets.includes(asset.trim())) {
      setAssets([asset.trim(), ...assets]);
      setAsset('');
    }
  }

  function removeAsset(id) {
    setAssets(assets.filter((asset) => asset !== id));
  }

  return (
    <Container>
      <h1>Assets</h1>
      <List>
        {assets.map((asset) => (
          <Asset key={asset} ticker={asset} removeAsset={removeAsset} />
        ))}
      </List>
      <TextField
        id="standard-basic"
        label="Asset Ticker"
        variant="standard"
        value={asset}
        onChange={(e) => setAsset(e.target.value)}
      />
      <IconButton
        onClick={() => {
          addAsset(asset);
        }}
        sx={{ marginLeft: '0.5rem', marginTop: '0.75rem' }}
      >
        <AddIcon />
      </IconButton>
    </Container>
  );
}
