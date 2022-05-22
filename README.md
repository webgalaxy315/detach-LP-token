# detach LP tokens

- Support 50-50 pools have 2 tokens, follow ERC20 standard
- Support any EVM-compatible blockchains

```bash
    npm i --save detach-lp-token
```

```javascript
    const detachLP = require('detach-lp-token')

    // RPC endpoint: of any blockchain Ethereum / BSC / Avalanche / Polygon ...
    let data = await detachLP(rpcEndpoint, LPAddress)
```

- Sample output
```bash
{
  token0: {
    address: '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c',
    amount: 0.028045831609494674
  },
  token1: {
    address: '0xc7435088819F1AF950357fED65BE856165cC3abB',
    amount: 36.776734679769945
  }
}
```