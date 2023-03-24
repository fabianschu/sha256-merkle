const {
  time,
  loadFixture,
} = require("@nomicfoundation/hardhat-network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Lock", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deployOneYearLockFixture() {
    // Contracts are deployed using the first signer/account by default
    const [owner, otherAccount] = await ethers.getSigners();

    const Hasher = await ethers.getContractFactory("Hasher");
    const hasher = await Hasher.deploy();

    return { hasher, owner, otherAccount };
  }

  describe("#hash", function () {
    it("returns hash", async function () {
      const expected =
        "0x66687aadf862bd776c8fc18b8e9f8e20089714856ee233b3902a591d0d5f2925";
      const { hasher } = await loadFixture(deployOneYearLockFixture);

      console.log(await ethers.utils.arrayify(ethers.constants.HashZero));
      console.log(
        await ethers.utils.arrayify(
          "0x290decd9548b62a8d60345a988386fc84ba6bc95484008f6362f93160ef3e563"
        )
      );

      const result = await hasher.hash(ethers.constants.HashZero);

      // expect(result).to.equal(
      //   await ethers.utils.hexlify(
      //     "0x290decd9548b62a8d60345a988386fc84ba6bc95484008f6362f93160ef3e563"
      //   )
      // );
    });
  });
});
