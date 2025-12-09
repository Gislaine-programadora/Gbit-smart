import { expect } from "chai";
import { ethers } from "hardhat";

describe("ERC20Gbit", function() {
  it("initial supply and transfer", async function() {
    const [owner, addr1] = await ethers.getSigners();
    const ERC20 = await ethers.getContractFactory("ERC20Gbit");
    const token = await ERC20.deploy("Gbit Token", "GBT", ethers.parseUnits("1000", 18));
    await token.deployed();

    expect(await token.totalSupply()).to.equal(ethers.parseUnits("1000", 18));
    await token.transfer(addr1.address, ethers.parseUnits("100", 18));
    expect(await token.balanceOf(addr1.address)).to.equal(ethers.parseUnits("100", 18));
  });
});
