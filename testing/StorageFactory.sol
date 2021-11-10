// SPDX-License_Identifier: MIT 

pragma solidity ^0.6.0;

import "./SimpleStorage.sol"; 

contract StorageFactory is SimpleStorage{
    
    SimpleStorage[] public simpleStorageArray;
    
    function createSimpleStorageContract() public {
        SimpleStorage simpleStorage = new SimpleStorage();
        simpleStorageArray.push(simpleStorage);
        
    }
    
    function sfStore(uint256 _simpleStorageInex, uint256 _simpleStorageNumber) public {
        // address
        // ABI
        SimpleStorage simpleStorage = SimpleStorage(address(simpleStorageArray[_simpleStorageInex]));
        simpleStorage.store(_simpleStorageNumber);
    }
    
    function sfGet(uint256 _simpleStorageIndex) public view returns(uint256){
        return SimpleStorage(address(simpleStorageArray[_simpleStorageIndex])).retrieve();
    }
}