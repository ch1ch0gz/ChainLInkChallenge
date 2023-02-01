// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.6.6;

// Uncomment this line to use console.log
// import "hardhat/console.sol";
import "./MockV3Aggregator.sol";

contract ChainLinkFeedMock {

      int public deployedPrice;
      MockV3Aggregator internal priceFeed;
      /**
       * Network: Goerli
       * Aggregator: ETH/USD
       * Address: 0xD4a33860578De61DBAbDc8BFdb98FD742fA7028e
       */
      constructor(address _address) public {
          priceFeed = MockV3Aggregator(_address);
          (,int price,,,) = priceFeed.latestRoundData();
          deployedPrice = price;
      }

      function hasPricedIncreased() external view returns(bool) {
        (,int NewPrice,,,) = priceFeed.latestRoundData();
        if(NewPrice > deployedPrice) {
          return true;
        }
        else {return false;}
      }

}
