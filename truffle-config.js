require('babel-register');
require('babel-polyfill');
require('dotenv').config();
Web3js = require("https://cdn.jsdelivr.net/gh/ethereum/web3.js@1.2.0/dist/web3.min.js")

const HDWalletProvider = require('truffle-hdwallet-provider');
module.exports = {
    networks: {
        development: {
            host: '127.0.0.1',
            port: 8545,
            network_id: '*', // eslint-disable-line camelcase
        },
        ganache: {
            host: '127.0.0.1',
            port: 8545,
            network_id: '*', // eslint-disable-line camelcase
        },
        ropsten: {
            provider: function() {
                return new HDWalletProvider(
                    process.env.MNEMONIC,
                    `https://ropsten.infura.io/${process.env.INFURA_API_KEY}`
                )
            },
            gas: 5000000,
            gasPrice: 25000000000,
            network_id: 3
        }
    },
    solc: {
        optimizer: {
            enabled: true,
            runs: 200
        }
    }
}