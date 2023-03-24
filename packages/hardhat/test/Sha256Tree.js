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
        const addresses = ["0x44A088e784F2A7936C67D772f9e06dF5093663bF"];

        it("computes the root", async function () {
          const input = addresses.map((a) => ethers.utils.sha256(a));
          const { sha256Tree } = await loadFixture(deployOneYearLockFixture);
          expect(await sha256Tree.computeRoot(input)).to.equal(
            "0x1c1b1847bed8b24a5ce52e45c9a8afdae20dfa7ec8c5bd2c6676ba55c3039c48"
          );
        });
      });

      context("with two leafs", () => {
        const addresses = [
          "0x44A088e784F2A7936C67D772f9e06dF5093663bF",
          "0x44A088e784F2A7936C67D772f9e06dF5093663bF",
        ];

        it("computes the root", async function () {
          const input = addresses.map((a) => ethers.utils.sha256(a));
          const { sha256Tree } = await loadFixture(deployOneYearLockFixture);
          expect(await sha256Tree.computeRoot(input)).to.equal(
            "0x8c61c713c399eb3228b3fc48261c9b183fb30684a5679442673468804f7500de"
          );
        });
      });
    });

    context("with depth == 2", () => {
      context("with three leafs", () => {
        const addresses = [
          "0x44A088e784F2A7936C67D772f9e06dF5093663bF",
          "0x44A088e784F2A7936C67D772f9e06dF5093663bF",
          "0x44A088e784F2A7936C67D772f9e06dF5093663bF",
        ];

        it("computes the root", async function () {
          const input = addresses.map((a) => ethers.utils.hexZeroPad(a, 32));
          const { sha256Tree } = await loadFixture(deployOneYearLockFixture);
          expect(await sha256Tree.computeRoot(input)).to.equal(
            "0x794a29f5e1f06a1ace92c4ea6bb75ca2a621d335b60e715d418164d83027e832"
          );
        });
      });

      context("with four leafs", () => {
        const addresses = [
          "0x44A088e784F2A7936C67D772f9e06dF5093663bF",
          "0x44A088e784F2A7936C67D772f9e06dF5093663bF",
          "0x44A088e784F2A7936C67D772f9e06dF5093663bF",
          "0x44A088e784F2A7936C67D772f9e06dF5093663bF",
        ];

        it("computes the root", async function () {
          const input = addresses.map((a) => ethers.utils.hexZeroPad(a, 32));
          const { sha256Tree } = await loadFixture(deployOneYearLockFixture);
          expect(await sha256Tree.computeRoot(input)).to.equal(
            "0x7ea88910affd0d2c31ac6ae25ba66b3af2f2477d95be0b17c205764377c28be4"
          );
        });
      });
    });

    context("with depth == 3", () => {
      context("with five leafs", () => {
        const addresses = [
          "0x44A088e784F2A7936C67D772f9e06dF5093663bF",
          "0x44A088e784F2A7936C67D772f9e06dF5093663bF",
          "0x44A088e784F2A7936C67D772f9e06dF5093663bF",
          "0x44A088e784F2A7936C67D772f9e06dF5093663bF",
          "0x44A088e784F2A7936C67D772f9e06dF5093663bF",
        ];

        it("computes the root", async function () {
          const input = addresses.map((a) => ethers.utils.hexZeroPad(a, 32));
          const { sha256Tree } = await loadFixture(deployOneYearLockFixture);
          expect(await sha256Tree.computeRoot(input)).to.equal(
            "0x2b430b9881644ff1ef82a98cc4b115d10f3c1e7158b6adbfa5366353a247a653"
          );
        });
      });

      context("with six leafs", () => {
        const addresses = [
          "0x44A088e784F2A7936C67D772f9e06dF5093663bF",
          "0x44A088e784F2A7936C67D772f9e06dF5093663bF",
          "0x44A088e784F2A7936C67D772f9e06dF5093663bF",
          "0x44A088e784F2A7936C67D772f9e06dF5093663bF",
          "0x44A088e784F2A7936C67D772f9e06dF5093663bF",
          "0x44A088e784F2A7936C67D772f9e06dF5093663bF",
        ];

        it("computes the root", async function () {
          const input = addresses.map((a) => ethers.utils.hexZeroPad(a, 32));
          const { sha256Tree } = await loadFixture(deployOneYearLockFixture);
          expect(await sha256Tree.computeRoot(input)).to.equal(
            "0xa564552f8369b29b160a4871c5db6c600b69f0b60b25e018cc720ef49bb9db7d"
          );
        });
      });
    });
  });

  describe("#validateProof", () => {});
});
