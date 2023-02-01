// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Uncomment this line to use console.log
// import "hardhat/console.sol";
import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

contract ChainLinkFeed {

      int public deployedPrice;
      AggregatorV3Interface internal priceFeed;
      /**
       * Network: Goerli
       * Aggregator: ETH/USD
       * Address: 0xD4a33860578De61DBAbDc8BFdb98FD742fA7028e
       */
      constructor() public {
          priceFeed = AggregatorV3Interface(0xD4a33860578De61DBAbDc8BFdb98FD742fA7028e);
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
