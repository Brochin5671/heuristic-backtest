import { IconButton, ListItem, Typography } from '@mui/material';
import RemoveIcon from '@mui/icons-material/Remove';

export function Asset({ ticker, removeAsset }) {
  return (
    <ListItem sx={{ justifyContent: 'center' }}>
      <Typography>{ticker}</Typography>
      <IconButton onClick={() => removeAsset(ticker)}>
        <RemoveIcon />
      </IconButton>
    </ListItem>
  );
}
