const { ethers } = require("ethers");

class Tree {
  abiCoder = new ethers.utils.AbiCoder();
  depth = 5;
  cachedHashes = [
    "0xf5a5fd42d16a20302798ef6ed309979b43003d2320d9f0e8ea9831a92759fb4b",
    "0xdb56114e00fdd4c1f85c892bf35ac9a89289aaecb1ebd0a96cde606a748b5d71",
    "0xc78009fdf07fc56a11f122370658a353aaa542ed63e44c4bc15ff4cd105ab33c",
    "0x536d98837f2dd165a55d5eeae91485954472d56f246df256bf3cae19352a123c",
  ];

  constructor(addresses) {
    this.addresses = addresses;
    this.hashedAddresses = addresses.map((a) => ethers.utils.sha256(a));
    this.layers = this.getLayers();
    this.root = this.layers[this.layers.length - 1][0];
  }

  getLayers(nodes = this.hashedAddresses, currentLevel = 0, layers = []) {
    const copy = [...layers];

    copy.push(nodes);
    if (nodes.length === 1 && currentLevel === this.depth - 1) {
      return copy;
    }

    let left;
    let right;
    let nextLevel = [];
    for (let i = 0; i < nodes.length; i += 2) {
      left = nodes[i];
      if (i === nodes.length - 1 && nodes.length % 2 !== 0) {
        // we're at last node in a layer and left node has
        // no right sibling, so we insert a cached value
        right = ethers.utils.solidityPack(
          ["bytes32"],
          [this.cachedHashes[currentLevel]]
        );
      } else {
        right = nodes[i + 1];
      }
      const concatenated = ethers.utils.solidityPack(
        ["bytes32", "bytes32"],
        [left, right]
      );

      const hashed = ethers.utils.sha256(concatenated);
      nextLevel.push(hashed);
    }

    const next = currentLevel + 1;
    return this.getLayers(nextLevel, next, copy);
  }
}

module.exports = { generateTree, Tree };
