// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Marketplace {
    struct Model {
        uint id;
        string name;
        string description;
        uint price;
        address payable seller;
        bool isSold;
    }

    Model[] public models;
    uint public modelCount;

    event ModelCreated(uint id, string name, uint price, address seller);
    event ModelPurchased(uint id, address buyer);

    function createModel(string memory _name, string memory _description, uint _price) public {
        modelCount++;
        models.push(Model(modelCount, _name, _description, _price, payable(msg.sender), false));
        emit ModelCreated(modelCount, _name, _price, msg.sender);
    }

    function purchaseModel(uint _id) public payable {
        Model storage model = models[_id - 1];
        require(!model.isSold, "Model is already sold");
        require(msg.value >= model.price, "Insufficient funds");

        model.isSold = true;
        model.seller.transfer(msg.value);
        emit ModelPurchased(_id, msg.sender);
    }

    function getModels() public view returns (Model[] memory) {
        return models;
    }
}