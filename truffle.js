// Allows us to use ES6 in our migrations and tests.
require('dotenv').config();
require('babel-register');
require('babel-polyfill');

const infuraKey = process.env.INFURA_KEY;
const mnemonic = fs.readFileSync(".secret").toString().trim();

// Edit truffle.config file should have settings to deploy the contract to the Rinkeby Public Network.
// Infura should be used in the truffle.config file for deployment to Rinkeby.

module.exports = {
    networks: {
        ganache: {
            host: '127.0.0.1',
            port: 7545,
            network_id: '*' // Match any network id
        }
    }
}
