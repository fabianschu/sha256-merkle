// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "hardhat/console.sol";

contract Sha256Tree {
    uint256 constant depth = 5;

    bytes32 constant level0 = 0xf5a5fd42d16a20302798ef6ed309979b43003d2320d9f0e8ea9831a92759fb4b; // two empty leaf siblings produce this hash
    bytes32 constant level1 = 0xdb56114e00fdd4c1f85c892bf35ac9a89289aaecb1ebd0a96cde606a748b5d71;
    bytes32 constant level2 = 0xc78009fdf07fc56a11f122370658a353aaa542ed63e44c4bc15ff4cd105ab33c;
    bytes32 constant level3 = 0x536d98837f2dd165a55d5eeae91485954472d56f246df256bf3cae19352a123c;

    
    constructor() {}

    function computeRoot(bytes32[] memory hashes) public view returns (bytes32) {
        return _computeRoot(hashes, 0);
    }

    function validateProof() public view returns (bool) {

    }

    function _computeRoot(bytes32[] memory hashes, uint256 level) internal view returns (bytes32) {
        uint256 length = hashes.length;
        if (length == 1 && level == depth - 1) return hashes[0];

        uint256 newLength = length % 2 == 0 ? length / 2 : (length + 1) / 2;
        bytes32[] memory nextLevel = new bytes32[](newLength);
        
        bytes32 left = 0;
        bytes32 right = 0;
        uint256 currentIdx = 0;
        for (uint16 i = 0; i < length; i += 2){
            left = hashes[i];
            if (i == length - 1 && length % 2 != 0) { 
                // we're at last node in a layer and left node has
                // no right sibling, so we insert a cached value
                right = _getConstant(level);
            } else {
                right = hashes[i + 1];
            }
            nextLevel[currentIdx] = sha256(abi.encodePacked(left, right));
            currentIdx++;
        }

        return _computeRoot(nextLevel, level + 1);
    }

    function _getConstant(uint256 level) internal pure returns (bytes32) {
        if(level == 0) return level0; // empty leaf pair
        else if(level == 1) return level1;
        else if(level == 2) return level2;
        else return level3;
    }
}
