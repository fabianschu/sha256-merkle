const {
  time,
  loadFixture,
} = require("@nomicfoundation/hardhat-network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { expect } = require("chai");
const { ethers } = require("hardhat");

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
          const input = addresses.map((a) => ethers.utils.sha256(a));
          const { sha256Tree } = await loadFixture(deployOneYearLockFixture);
          expect(await sha256Tree.computeRoot(input)).to.equal(
            "0xe3cc7ac25cd11219bb431502204340dd0734da5d5e7019af84079f60a55879d2"
          );
        });
      });

      context("with two leafs", () => {
        const addresses = [
          "0x9cA70B93CaE5576645F5F069524A9B9c3aef5006",
          "0x9cA70B93CaE5576645F5F069524A9B9c3aef5006",
        ];

        it("computes the root", async function () {
          const input = addresses.map((a) => ethers.utils.sha256(a));
          const { sha256Tree } = await loadFixture(deployOneYearLockFixture);
          expect(await sha256Tree.computeRoot(input)).to.equal(
            "0xd8b941c56b2f621dc0e60fdd35dac4f52ccadaa1192f81c34f7845f55e1f832e"
          );
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
          const input = addresses.map((a) => ethers.utils.hexZeroPad(a, 32));
          const { sha256Tree } = await loadFixture(deployOneYearLockFixture);
          expect(await sha256Tree.computeRoot(input)).to.equal(
            "0xbdbc2d407d5ef40d737647573bf564683cc99f82e3cabac6082baa2a5f2d43e9"
          );
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
          const input = addresses.map((a) => ethers.utils.hexZeroPad(a, 32));
          const { sha256Tree } = await loadFixture(deployOneYearLockFixture);
          expect(await sha256Tree.computeRoot(input)).to.equal(
            "0x1fb1159ac16ad057cf38bcc9a82f907e9c8de6d8db2fc72381c8bad02155a065"
          );
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
          const input = addresses.map((a) => ethers.utils.hexZeroPad(a, 32));
          const { sha256Tree } = await loadFixture(deployOneYearLockFixture);
          expect(await sha256Tree.computeRoot(input)).to.equal(
            "0x2fad0b370d2db540310b20d0449e8acdde3d6ee0801cbb506796ec37ceef1ded"
          );
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
          const input = addresses.map((a) => ethers.utils.hexZeroPad(a, 32));
          const { sha256Tree } = await loadFixture(deployOneYearLockFixture);
          expect(await sha256Tree.computeRoot(input)).to.equal(
            "0x743eeea527b92fb6cee4816e6bda3aa8ae34ec471c8d37a63d3120537a864515"
          );
        });
      });
    });
  });

  describe("#validateProof", () => {
    // const addresses =
  });
});
