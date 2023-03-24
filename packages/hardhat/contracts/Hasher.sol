// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

contract Hasher {
    constructor() {}

    function hash(bytes memory x) public pure returns (bytes32) {
        return sha256(x);
    }
}
