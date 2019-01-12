// Allows us to use ES6 in our migrations and tests.
require('dotenv').config();
require('babel-register');
require('babel-polyfill');
const HDWalletProvider = require('truffle-hdwallet-provider');
const fs = require('fs');

//add your infura key in .env file
const infuraKey = process.env.INFURA_KEY;
//add your seed in .secret file
const mnemonic = fs.readFileSync(".secret").toString().trim();

// Edit truffle.config file should have settings to deploy the contract to the Rinkeby Public Network.
// Infura should be used in the truffle.config file for deployment to Rinkeby.

module.exports = {
    networks: {
        ganache: {
            host: '127.0.0.1',
            port: 7545,
            network_id: '*' // Match any network id
        },
        // ropsten: {
        //     provider: () => new HDWalletProvider(mnemonic, `https://ropsten.infura.io/${infuraKey}`),
        //     network_id: 3,       // Ropsten's id
        //     gas: 5500000,        // Ropsten has a lower block limit than mainnet
        //     confirmations: 2,    // # of confs to wait between deployments. (default: 0)
        //     timeoutBlocks: 200,  // # of blocks before a deployment times out  (minimum/default: 50)
        //     skipDryRun: true     // Skip dry run before migrations? (default: false for public nets )
        // },
        rinkeby: {
            provider: () => new HDWalletProvider(mnemonic, `https://rinkeby.infura.io/v3/${infuraKey}`),
            network_id: '4',
            gas: 4500000,
            gasPrice: 10000000000,
        },
    }
}
