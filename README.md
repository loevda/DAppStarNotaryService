# Decentralized Star Notary Service

![DApp screenshot](app/images/notarydapp800.png?raw=true "Title")

## Setup project for Review.

To setup the project for review do the following:
1. Clone the repository
2. Run command __npm install__ to install the project dependencies.<br />
   If you have a __libpng__ issue with the __image-webpack-loader__ package (some OSX version) please install the newest __libpng__ version:
   ```
   brew install libpng
   ```
3. Create an .env file in the project root folder and add you Infura API KEY:<br />
   __INFURA_KEY=YOUR_INFURA_API_KEY__
4. Create a __.secret__ file in the project root folder and add your wallet seed.
3. Run __npm run dev__ to run the app. The app is running at **http://localhost:8080**.

## Token information

| Token name           | Token code | Contract address on Rinkeby test network                           | 
|----------------------|------------|--------------------------------------------------------------------|
| Star Token           | STTK       | 0x90113a2c4dd8c57c0ecf2b15f189ef67285b8cd4                         |

