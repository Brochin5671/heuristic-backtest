import {
  Container,
  FormControl,
  Input,
  InputAdornment,
  InputLabel,
  TextField,
} from '@mui/material';
import DateAdapter from '@mui/lab/AdapterMoment';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { DatePicker } from '@mui/lab';
import { useEffect, useState } from 'react';
import moment from 'moment';

export function SettingsForm({ addData }) {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [cashAmt, setCashAmt] = useState(0);
  const minDate = moment('1999-01-01');

  useEffect(() => {
    addData(
      {
        start: startDate?.format('YYYY-MM-DD'),
        end: endDate?.format('YYYY-MM-DD'),
      },
      cashAmt
    );
  }, [startDate, endDate, cashAmt]);

  function disableWeekends(date) {
    return date.day() === 0 || date.day() === 6;
  }

  return (
    <>
      <Container sx={{ marginTop: '3rem' }}>
        <FormControl variant="standard">
          <InputLabel htmlFor="cash-amount">Amount</InputLabel>
          <Input
            id="cash-amount"
            value={cashAmt}
            onChange={(e) => setCashAmt(e.target.value)}
            startAdornment={<InputAdornment position="start">$</InputAdornment>}
          />
        </FormControl>
      </Container>
      <Container sx={{ marginTop: '2rem' }}>
        <LocalizationProvider dateAdapter={DateAdapter}>
          <DatePicker
            disableFuture
            shouldDisableDate={disableWeekends}
            label="Start Date"
            value={startDate}
            minDate={minDate}
            maxDate={endDate}
            onChange={(date) => {
              setStartDate(date);
            }}
            renderInput={(params) => <TextField {...params} />}
          />
          <DatePicker
            disableFuture
            shouldDisableDate={disableWeekends}
            label="End Date"
            value={endDate}
            minDate={startDate}
            onChange={(date) => {
              setEndDate(date);
            }}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
      </Container>
    </>
  );
}
