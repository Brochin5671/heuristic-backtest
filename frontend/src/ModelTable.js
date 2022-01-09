import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';
import { useEffect, useState } from 'react';
import {
  evalPopulation,
  genPopulation,
  runGeneration,
} from './geneticAlgorithm';

export function ModelTable() {
  const data = [
    { ticker: 'XEQT', cost: 23, sell: 25 },
    { ticker: 'VEQT', cost: 21, sell: 27 },
    { ticker: 'XUU', cost: 40, sell: 45 },
  ];

  const [models, setModels] = useState([]);
  const [generations, setGenerations] = useState(0);

  useEffect(() => {
    setModels(evalPopulation(genPopulation(10, data, 5000)));
    setGenerations(10);
  }, []);

  useEffect(() => {
    if (generations > 0) {
      setTimeout(() => {
        console.log(generations);
        /*models.forEach(({ strategy }) => {
        strategy.map((asset) => console.log(asset));
      });*/
        setModels(runGeneration(models));
      }, 500);
      setGenerations((generations) => generations - 1);
    }
  }, [models]);

  return (
    <Container>
      <TableContainer component={Paper}>
        <Table aria-label="Population Table">
          <TableHead>
            <TableRow>
              {models[0]?.strategy?.map((asset) => (
                <TableCell key={asset.ticker} align="center">
                  {asset.ticker}
                </TableCell>
              ))}
              <TableCell align="center">Gains</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {models.map(({ strategy, gains }) => {
              return (
                <TableRow
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  {strategy.map((asset) => {
                    return (
                      <TableCell key={asset.ticker} align="center">
                        {asset.buyAmt}
                      </TableCell>
                    );
                  })}
                  <TableCell align="center">${gains}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}
