const { expect } = require("chai");
const { assert } = require("chai");



describe("chainLinkFeed", function () {
  beforeEach(async () => {
    //Deploy MockV3Aggregator contract
    const MockV3Aggregator = await ethers.getContractFactory("MockV3Aggregator");
    mockV3Aggregator = await MockV3Aggregator.deploy(8,13);
    await mockV3Aggregator.deployed();

    //Deploy MockV3Aggregator contract
    const ChainLinkFeedMock = await ethers.getContractFactory("ChainLinkFeedMock");
    chainLinkFeedMock = await ChainLinkFeedMock.deploy(mockV3Aggregator.address);
    await chainLinkFeedMock.deployed();


  });

  it("should give me a price the mock", async function() {
    const priceFeedResult = await mockV3Aggregator.latestRoundData();
    //const test1 = await mockV3Aggregator.updateAnswer(15);

    assert.equal(13,priceFeedResult.answer);
  });

  it("should tell me initial price of my contract", async function() {
    const priceFeedResult = await mockV3Aggregator.latestRoundData();
    const deployedPrice = await chainLinkFeedMock.deployedPrice();
    assert.equal(deployedPrice.toString(), priceFeedResult.answer.toString());
  });

  it("should tell me if the price has changed", async function(){
    const priceFeedResultUpdated = await mockV3Aggregator.updateAnswer(15);
    const hasPricedIncreased = await chainLinkFeedMock.hasPricedIncreased();
    assert.equal(true, hasPricedIncreased)


  });

});
