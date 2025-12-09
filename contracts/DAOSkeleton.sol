// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";

contract DAOSkeleton is Ownable {
    struct Proposal {
        uint256 id;
        address proposer;
        string description;
        uint256 votesFor;
        uint256 votesAgainst;
        bool executed;
    }

    uint256 public proposalCount;
    mapping(uint256 => Proposal) public proposals;

    function createProposal(string memory description) external {
        proposalCount++;
        proposals[proposalCount] = Proposal(proposalCount, msg.sender, description, 0, 0, false);
    }
}
