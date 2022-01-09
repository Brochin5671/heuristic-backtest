// Gets the sum of all potential gains from assets
function getGains(strategy) {
  let gains = 0;
  for (const asset of strategy) {
    const { buyAmt, cost, sell } = asset;
    gains += buyAmt * (sell - cost);
  }
  return gains.toFixed(2);
}

// Generates a random strategy with a cash amount limit
function genStrategy(assets, cashAmt) {
  const genes = [];
  let cashLeft = cashAmt;
  for (const asset of assets) {
    const buyRange = Math.floor(cashLeft / asset.cost);
    const buyAmt = Math.floor(Math.random() * buyRange);
    genes.push({ ...asset, buyAmt });
    cashLeft -= buyAmt * asset.cost;
  }
  return genes;
}

// Generates the initial population of strategies
export function genPopulation(n = 3, assets, cashAmt) {
  const strats = [];
  for (let i = 0; i < n; i++) {
    strats.push({ strategy: genStrategy(assets, cashAmt) });
  }
  return strats;
}

// Evaluates and sorts the strategies by gains
export function evalPopulation(strats) {
  const evalStrats = [];
  for (const { strategy } of strats) {
    evalStrats.push({ gains: getGains(strategy), strategy });
  }
  evalStrats.sort((a, b) => b.gains - a.gains);
  return evalStrats;
}

// Mutate random asset allocations
function mutate(strategy) {
  let randomAsset = Math.floor(Math.random() * strategy.length);
  strategy[randomAsset].buyAmt += Math.floor(Math.random() * 5) + 1;
  randomAsset = Math.floor(Math.random() * strategy.length);
  if (strategy[randomAsset].buyAmt >= 5) {
    strategy[randomAsset].buyAmt -= Math.floor(Math.random() * 5);
  }
  return strategy;
}

// Using natural selection, only half are kept and the new half are created through 1-point crossover
function selection(evalStrats, cashAmt) {
  const parents = evalStrats.slice(0, evalStrats.length / 2);
  const newStrats = [...parents];
  while (newStrats.length < evalStrats.length) {
    const parent1 = parents[Math.floor(Math.random() * parents.length)];
    const parent2 = parents[Math.floor(Math.random() * parents.length)];
    const genes1 = parent1.strategy.slice(0, parent1.strategy.length / 2);
    const genes2 = parent2.strategy.slice(parent1.strategy.length / 2);
    let genes = [...genes1, ...genes2];
    // Random chance for mutation
    if (Math.random() <= 0.2) {
      //genes = mutate(genes.slice());
    }
    // Prevent overbuying by randomly selecting an asset and zeroing it
    /*while (isOverBuying(genes, cashAmt)) {
      const randomAsset = Math.floor(Math.random() * genes.length);
      genes[randomAsset].buyAmt = 0;
    }*/
    newStrats.push({ strategy: genes });
  }
  return newStrats;
}

// Return true if overbuying assets
function isOverBuying(strategy, cashAmt) {
  let costAmt = 0;
  for (const asset of strategy) {
    const { buyAmt, cost } = asset;
    costAmt += buyAmt * cost;
  }
  return costAmt > cashAmt;
}

// Generate initial population, evaluate population, do selection and crossover, and repeat
export function runGeneration(data) {
  const strats = selection(data, 5000);
  return evalPopulation(strats);
}
