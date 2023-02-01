// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import "@chainlink/contracts/src/v0.8/VRFConsumerBase.sol";

contract Lottery is VRFConsumerBase{

  bytes32 internal keyHash;
  uint256 internal fee;
  uint256 public randomResult;
  address[] public players;
  //constructor with the VRF address and LINK goerli address
  constructor() VRFConsumerBase(0x2bce784e69d2Ff36c71edcB9F88358dB0DfB55b4,0x326C977E6efc84E512bB9C30f76E30c160eD06FB) {
    players = [0x79ff31aDf95ACfE8ec27a5eFDE0cf7239dF86cA6,0x847Fc5F44f1cFEeB4e8B9f1368dD4d6295db4972];
    keyHash = 0x0476f9a745b61ea5c0ab224d3a6e4c99f0b02fce4da01143a4f70aa80ae76e8a;
    fee = 0.5 * 10 ** 18; // 0.1 LINK (Varies by network)
  }

  function getRandomNumber() public returns(bytes32 requestID) {
    require(LINK.balanceOf(address(this)) >= fee, "Not enough LINK - fill contract with faucet");
    return requestRandomness(keyHash, fee);
  }

  function fulfillRandomness(bytes32 requestId, uint256 randomness) internal override {
      randomResult = randomness;
  }

  function pickWinner() public view returns (address winner){
    uint256 index = randomResult % players.length;
    return players[index];
  }

}
