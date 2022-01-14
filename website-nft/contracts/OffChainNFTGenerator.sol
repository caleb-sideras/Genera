// SPDX-License-Identifier: MIT

pragma solidity 0.6.6;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract NFTGenerator is ERC721, Ownable {
    uint256 public tokenCounter;

    constructor(string memory _name, string memory _symbol)
        public
        ERC721(_name, _symbol)
    {
        tokenCounter = 0;
    }

    function createNewNFT(string memory _tokenURI) public onlyOwner {
        uint256 newTokenId = tokenCounter;
        _safeMint(msg.sender, newTokenId); // openzeppelin safe mint
        _setTokenURI(newTokenId, _tokenURI); // openzeppelin set token uri
        tokenCounter = tokenCounter + 1;
    }
}
