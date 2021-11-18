// SPDX-License-Identifier: MIT

pragma solidity 0.6.6;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract NFTGenerator is ERC721 {
    uint256 public tokenCounter;

    // mapping(uint256 => Breed) public tokenIdToBreed; // every TokenId has a breed, saves all tokenIds?
    // mapping(bytes32 => address) public requestIdToSender;
    // event requestedCollectible(bytes32 indexed requestId, address requester); // indexed faster searching, + good practice to emit an event mapped data after changing a mapping... also helps for testing

    // event breedAssigned(uint256 indexed tokenId, Breed breed);

    constructor(string memory _name, string memory _symbol)
        public
        ERC721(_name, _symbol)
    {
        tokenCounter = 0;
    }

    function createNewCollectible(string memory _tokenURI) public {
        uint256 newTokenId = tokenCounter;
        // require(
        //     _isApprovedOrOwner(_msgSender(), newTokenId),
        //     "ERC721: caller is not owner nor approved"
        // ); //only the owner of contract can change tokenURI?
        _safeMint(msg.sender, newTokenId); // openzeppelin safe mint
        _setTokenURI(newTokenId, _tokenURI); // openzeppelin set token uri
        tokenCounter = tokenCounter + 1;
    }
}
