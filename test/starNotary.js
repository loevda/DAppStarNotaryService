//import 'babel-polyfill';
const StarNotary = artifacts.require('./StarNotary.sol')

let instance;
let accounts;

contract('StarNotary', async (accs) => {
    accounts = accs;
    instance = await StarNotary.deployed();
});

it('can Create a Star', async() => {
    let tokenId = 1;
    await instance.createStar('Awesome Star!', tokenId, {from: accounts[0]})
    assert.equal(await instance.tokenIdToStarInfo.call(tokenId), 'Awesome Star!')
});

it('lets user1 put up their star for sale', async() => {
    let user1 = accounts[1]
    let starId = 2;
    let starPrice = web3.toWei(.01, "ether")
    await instance.createStar('awesome star', starId, {from: user1})
    await instance.putStarUpForSale(starId, starPrice, {from: user1})
    assert.equal(await instance.starsForSale.call(starId), starPrice)
});

it('lets user1 get the funds after the sale', async() => {
    let user1 = accounts[1]
    let user2 = accounts[2]
    let starId = 3
    let starPrice = web3.toWei(.01, "ether")
    await instance.createStar('awesome star', starId, {from: user1})
    await instance.putStarUpForSale(starId, starPrice, {from: user1})
    let balanceOfUser1BeforeTransaction = web3.eth.getBalance(user1)
    await instance.buyStar(starId, {from: user2, value: starPrice})
    let balanceOfUser1AfterTransaction = web3.eth.getBalance(user1)
    assert.equal(balanceOfUser1BeforeTransaction.add(starPrice).toNumber(), balanceOfUser1AfterTransaction.toNumber());
});

it('lets user2 buy a star, if it is put up for sale', async() => {
    let user1 = accounts[1]
    let user2 = accounts[2]
    let starId = 4
    let starPrice = web3.toWei(.01, "ether")
    await instance.createStar('awesome star', starId, {from: user1})
    await instance.putStarUpForSale(starId, starPrice, {from: user1})
    let balanceOfUser1BeforeTransaction = web3.eth.getBalance(user2)
    await instance.buyStar(starId, {from: user2, value: starPrice});
    assert.equal(await instance.ownerOf.call(starId), user2);
});

it('lets user2 buy a star and decreases its balance in ether', async() => {
    let user1 = accounts[1]
    let user2 = accounts[2]
    let starId = 5
    let starPrice = web3.toWei(.01, "ether")
    await instance.createStar('awesome star', starId, {from: user1})
    await instance.putStarUpForSale(starId, starPrice, {from: user1})
    let balanceOfUser1BeforeTransaction = web3.eth.getBalance(user2)
    const balanceOfUser2BeforeTransaction = web3.eth.getBalance(user2)
    await instance.buyStar(starId, {from: user2, value: starPrice, gasPrice:0})
    const balanceAfterUser2BuysStar = web3.eth.getBalance(user2)
    assert.equal(balanceOfUser2BeforeTransaction.sub(balanceAfterUser2BuysStar), starPrice);
});

// Write Tests for:

// 1) The token name and token symbol are added properly.
describe('token', function(){
    it('has correct name', async() => {
        assert.equal(await instance.name.call(), 'Star Token');
    });
    it('has correct symbol', async() => {
        assert.equal(await instance.symbol.call(), 'STTK');
    });
});

// 2) 2 users can exchange their stars.
it('lets 2 users exchange theirs stars', async () => {
    let user1 = accounts[1];
    let user2 = accounts[2];
    let user3 = accounts[3];
    let starId1 = 566;
    let starId2 = 866;
    await instance.createStar('awesome star', starId1, {from: user1});
    await instance.createStar('fabulous star', starId2, {from: user2});
    //approval
    await instance.approve(user3, starId1, {from: user1});
    await instance.approve(user3, starId2, {from: user2});
    //exchange
    await instance.exchangeStars(user1, user2, starId1, starId2, {from: user3});
    //assert
    let ownerStarId2 = await instance.ownerOf(starId2);
    let ownerStarId1 = await instance.ownerOf(starId1);
    expect([ownerStarId2, ownerStarId1]).to.deep.equal([user1, user2]);
});



// 3) Stars Tokens can be transferred from one address to another.
it('lets transfer a star token from one address to another', async() => {
    let user1 = accounts[1];
    let user2 = accounts[2];
    let starId = 88;
    await instance.createStar('Unique star 1', starId, {from: user1});
    await instance.transferStar(user2, starId, {from: user1});
    assert.equal(await instance.ownerOf(starId), user2);
});
