// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract ERC721Gbit is ERC721URIStorage, Ownable {
    uint256 private _tokenIdCounter;

    constructor(string memory name_, string memory symbol_) ERC721(name_, symbol_) {}

    function safeMint(address to, string memory uri) external onlyOwner returns (uint256) {
        _tokenIdCounter++;
        uint256 newId = _tokenIdCounter;
        _safeMint(to, newId);
        _setTokenURI(newId, uri);
        return newId;
    }
}
