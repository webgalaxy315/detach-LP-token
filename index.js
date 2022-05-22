const Web3 = require('web3')
const LP = require('./LP.json')
const TOKEN_ABI = require('./ERC20.json')
const BigNumber = require('bignumber.js')

const detachLP = async (rpcEndpoint, LPAddress) => {
    let web3 = new Web3(new Web3.providers.HttpProvider(rpcEndpoint))
    let LPContract = new web3.eth.Contract(LP, LPAddress)
    let totalLP = await LPContract.methods.totalSupply().call()
    let LPDecimal = await LPContract.methods.decimals().call() || 18

    let token0 = await LPContract.methods.token0().call()
    let token0Contract =  new web3.eth.Contract(TOKEN_ABI, token0)
    let token0PoolBalance = await token0Contract.methods.balanceOf(LPAddress).call()
    let token0Decimals = await token0Contract.methods.decimals().call()

    let token1 = await LPContract.methods.token1().call()
    let token1Contract =  new web3.eth.Contract(TOKEN_ABI, token1)
    let token1PoolBalance = await token1Contract.methods.balanceOf(LPAddress).call()
    let token1Decimals = await token1Contract.methods.decimals().call()

    let result = {
        token0: {
            address: token0,
            amount: new BigNumber(token0PoolBalance).dividedBy(new BigNumber(totalLP)).dividedBy(10 ** (LPDecimal - token0Decimals)).toNumber()
        },
        token1: {
            address: token1,
            amount: new BigNumber(token1PoolBalance).dividedBy(new BigNumber(totalLP)).dividedBy(10 ** (LPDecimal - token1Decimals)).toNumber()
        }
    }
    // console.log(result)
    return result
}
module.exports = detachLP
