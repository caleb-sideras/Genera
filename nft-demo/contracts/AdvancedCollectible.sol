// An NFT Contract
// Where the tokenURI can be one of 3 different dogs
// Randomly selected

// SPDX-License-Identifier: MIT
pragma solidity 0.6.6;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@chainlink/contracts/src/v0.6/VRFConsumerBase.sol";

//(Eth 721 NFT standard library, Verifiliably Random Function)
contract AdvancedCollectible is ERC721, VRFConsumerBase { 
    uint256 public tokenCounter;
    bytes32 public keyhash;
    uint256 public fee;
    enum Breed{PUG, SHIBA_INU, ST_BERNARD} // these will be passed in through constructor for website?
    mapping(uint256 => Breed) public tokenIdToBreed; // every TokenId has a breed, saves all tokenIds?
    mapping(bytes32 => address) public requestIdToSender;
    event requestedCollectible(bytes32 indexed requestId, address requester); // indexed faster searching, + good practice to emit an event mapped data after changing a mapping... also helps for testing
    event breedAssigned(uint256 indexed tokenId, Breed breed);

    // VRF parameters & library constructors
    constructor(address _vrfCoordinator, address _linkToken, bytes32 _keyhash, uint256 _fee) public 
    VRFConsumerBase(_vrfCoordinator, _linkToken)
    ERC721("Dogie", "DOG")
    {
        tokenCounter = 0;
        keyhash = _keyhash;
        fee = _fee;
    }
    //string memory tokenURI - parameter?
    function createCollectible() public returns(bytes32){
        bytes32 requestId = requestRandomness(keyhash, fee); // Not needed for website (being sent to VRF)
        requestIdToSender[requestId] = msg.sender; // Not needed for website, VRF not being used
        emit requestedCollectible(requestId, msg.sender);
    }

    // this function is being called by VRF library for random number. Therefore msg.sender is the chainlink node
    function fulfillRandomness(bytes32 requestId, uint256 randomNumber) internal override{
        Breed breed = Breed(randomNumber % 3); // Not needed (will be in json)
        uint256 newTokenId = tokenCounter;  // opensea.io/{address}/{tokenId}
        address owner = requestIdToSender[requestId]; // owner address
        tokenIdToBreed[newTokenId] = breed; // mapping tokenid->breed
        emit breedAssigned(newTokenId, breed);
        _safeMint(owner, newTokenId); // openzeppelin safe mint
        
        tokenCounter = tokenCounter + 1;
        // return newTokenId;
    }

    function setTokenUTI(uint256 tokenId, string memory _tokenURI) public {
        require(_isApprovedOrOwner(_msgSender(), tokenId), "ERC721: caller is not owner nor approved");//only the owner of contract can change tokenURI?
        _setTokenURI(tokenId, _tokenURI); 
    }
}