// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.8.2 <0.9.0;

import "./crowdfundContract.sol";

/**
* @notice Error code
* 1 - Check failed
*/

contract MarketplaceContract is CrowdFundContract {

    constructor(uint256 _campaignFee, uint256 _nftListingPrice) CrowdFundContract(_campaignFee, _nftListingPrice){}

    function listNFTForSale(uint256 _tokenId, uint256 _price) external payable {
        require(msg.value == _nftListingPrice && _exists(_tokenId) && ownerOf(_tokenId) == msg.sender, "1");

        tokenIdToSaleListing[_tokenId] = SaleListing({ tokenId: _tokenId, price: _price, isActive: true });

        emit NFTListedForSale(_tokenId, _price);
    }

    function buyListedNFT(uint256 _tokenId) external payable {
        SaleListing memory saleListing = tokenIdToSaleListing[_tokenId];
        require(saleListing.isActive && msg.value == saleListing.price, "1");

        address previousOwner = ownerOf(_tokenId);
        _transfer(previousOwner, msg.sender, _tokenId);

        Backer storage backer = tokenIdToBacker[_tokenId];
        backer.backerAddress = payable(msg.sender);

        tokenIdToSaleListing[_tokenId].isActive = false;

        payable(previousOwner).transfer(msg.value);

        emit NFTPurchased(_tokenId, msg.sender, msg.value);
    }
}

