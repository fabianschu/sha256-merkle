const { ethers } = require("ethers");
const { sha256, solidityPack } = require("ethers/lib/utils");

class Tree {
  depth = 5;

  constructor(addresses) {
    this.addresses = addresses;
    this.leafs = [
      ...addresses.map((a) => ethers.utils.sha256(a)),
      ...new Array(2 ** this.depth - addresses.length).fill(
        sha256(ethers.utils.hexlify([]))
      ),
    ];
    this.layers = this.getLayers();
    this.root = this.layers[this.layers.length - 1][0];
  }

  getLayers() {
    const layers = [this.leafs];
    for (let i = 0; i < this.depth; i++) {
      const currentLevel = layers[i];
      const nextLevel = [];
      for (let j = 0; j < currentLevel.length; j += 2) {
        const left = currentLevel[j];
        const right = currentLevel[j + 1];
        const hash = this.getConcatHash(left, right);
        nextLevel.push(hash);
      }
      layers.push(nextLevel);
    }
    return layers;
  }

  getProof(address) {
    const proof = [];

    const leafIndex = this.addresses.findIndex((el) => el === address);
    const leafPosition = (leafIndex + 10) % 2 === 0 ? "left" : "right";
    if (leafPosition === "left") {
      proof.push({ value: this.hashedAddresses[leafIndex + 1], position: 1 });
    } else {
      proof.push({ value: this.hashedAddresses[leafIndex - 1], position: 0 });
    }

    for (let i = 1; i < this.depth; i++) {
      if (leafPosition === "left") {
        proof.push({ value: this.hashedAddresses[leafIndex + 1], position: 1 });
      } else {
        proof.push({ value: this.hashedAddresses[leafIndex - 1], position: 0 });
      }
    }
    // const concatenatedPair = ethers.utils.solidityPack(
    //   ["bytes32", "bytes32"],
    //   leafPosition === "left"
    //     ? [this.hashedAddresses[leafIndex], this.hashedAddresses[leafIndex + 1]]
    //     : [this.hashedAddresses[leafIndex - 1], this.hashedAddresses[leafIndex]]
    // );
  }

  getConcatHash(left, right) {
    return sha256(
      ethers.utils.solidityPack(["bytes32", "bytes32"], [left, right])
    );
  }

  getHash(left, right) {
    return ethers.utils.solidityPack(["bytes32", "bytes32"], [left, right]);
  }
}

module.exports = { Tree };
