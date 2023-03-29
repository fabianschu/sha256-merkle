const {
  time,
  loadFixture,
} = require("@nomicfoundation/hardhat-network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { expect } = require("chai");
const { ethers } = require("hardhat");
const { generateTree, Tree } = require("./utils/tree.js");
const { sha256 } = require("ethers/lib/utils.js");

describe("Sha256Tree", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deployOneYearLockFixture() {
    // Contracts are deployed using the first signer/account by default
    const [owner, otherAccount] = await ethers.getSigners();
    const Sha256Tree = await ethers.getContractFactory("Sha256Tree");
    const sha256Tree = await Sha256Tree.deploy();
    return { sha256Tree, owner, otherAccount };
  }

  describe("#computeRoot", function () {
    context("with depth == 1", () => {
      context("with one leaf", () => {
        const addresses = ["0x9cA70B93CaE5576645F5F069524A9B9c3aef5006"];

        it("computes the root", async function () {
          const tree = new Tree(addresses);
          const { sha256Tree } = await loadFixture(deployOneYearLockFixture);
          const input = addresses.map((a) => ethers.utils.sha256(a));

          expect(await sha256Tree.computeRoot(input)).to.equal(tree.root);
        });
      });

      context("with two leafs", () => {
        const addresses = [
          "0x9cA70B93CaE5576645F5F069524A9B9c3aef5006",
          "0xb5aE5169F4D750e802884d81b4f9eC66c525396F",
        ];

        it("computes the root", async function () {
          const tree = new Tree(addresses);
          const { sha256Tree } = await loadFixture(deployOneYearLockFixture);
          const input = addresses.map((a) => ethers.utils.sha256(a));

          expect(await sha256Tree.computeRoot(input)).to.equal(tree.root);
        });
      });
    });

    context("with depth == 2", () => {
      context("with three leafs", () => {
        const addresses = [
          "0x9cA70B93CaE5576645F5F069524A9B9c3aef5006",
          "0x9cA70B93CaE5576645F5F069524A9B9c3aef5006",
          "0x9cA70B93CaE5576645F5F069524A9B9c3aef5006",
        ];

        it("computes the root", async function () {
          const tree = new Tree(addresses);
          const input = addresses.map((a) => ethers.utils.sha256(a));
          const { sha256Tree } = await loadFixture(deployOneYearLockFixture);
          expect(await sha256Tree.computeRoot(input)).to.equal(tree.root);
        });
      });

      context("with four leafs", () => {
        const addresses = [
          "0x9cA70B93CaE5576645F5F069524A9B9c3aef5006",
          "0x9cA70B93CaE5576645F5F069524A9B9c3aef5006",
          "0x9cA70B93CaE5576645F5F069524A9B9c3aef5006",
          "0x9cA70B93CaE5576645F5F069524A9B9c3aef5006",
        ];

        it("computes the root", async function () {
          const tree = new Tree(addresses);
          const input = addresses.map((a) => ethers.utils.sha256(a));
          const { sha256Tree } = await loadFixture(deployOneYearLockFixture);
          expect(await sha256Tree.computeRoot(input)).to.equal(tree.root);
        });
      });
    });

    context("with depth == 3", () => {
      context("with five leafs", () => {
        const addresses = [
          "0x9cA70B93CaE5576645F5F069524A9B9c3aef5006",
          "0x9cA70B93CaE5576645F5F069524A9B9c3aef5006",
          "0x9cA70B93CaE5576645F5F069524A9B9c3aef5006",
          "0x9cA70B93CaE5576645F5F069524A9B9c3aef5006",
          "0x9cA70B93CaE5576645F5F069524A9B9c3aef5006",
        ];

        it("computes the root", async function () {
          const tree = new Tree(addresses);
          const input = addresses.map((a) => ethers.utils.sha256(a));
          const { sha256Tree } = await loadFixture(deployOneYearLockFixture);
          expect(await sha256Tree.computeRoot(input)).to.equal(tree.root);
        });
      });

      context("with six leafs", () => {
        const addresses = [
          "0x9cA70B93CaE5576645F5F069524A9B9c3aef5006",
          "0x9cA70B93CaE5576645F5F069524A9B9c3aef5006",
          "0x9cA70B93CaE5576645F5F069524A9B9c3aef5006",
          "0x9cA70B93CaE5576645F5F069524A9B9c3aef5006",
          "0x9cA70B93CaE5576645F5F069524A9B9c3aef5006",
          "0x9cA70B93CaE5576645F5F069524A9B9c3aef5006",
        ];

        it("computes the root", async function () {
          const tree = new Tree(addresses);
          const input = addresses.map((a) => ethers.utils.sha256(a));
          const { sha256Tree } = await loadFixture(deployOneYearLockFixture);
          expect(await sha256Tree.computeRoot(input)).to.equal(tree.root);
        });
      });
    });
  });

  // describe("#validateProof", () => {
  //   context("with two leafs", () => {
  //     const addresses = [
  //       "0x9cA70B93CaE5576645F5F069524A9B9c3aef5006",
  //       "0xb5aE5169F4D750e802884d81b4f9eC66c525396F",
  //     ];

  //     it("validates the proof", async () => {
  //       const tree = new Tree(addresses);
  //       // tree.getProof(addresses[1]);
  //     });
  //   });
  // });
});
