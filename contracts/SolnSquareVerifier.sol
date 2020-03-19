pragma solidity >=0.4.25;

import './ERC721Mintable.sol';
import "./SquareVerifier.sol";

//  define a contract call to the zokrates generated solidity contract <Verifier> or <renamedVerifier>
contract RealSquareVerifier is SquareVerifier {

}

// TODO define another contract named SolnSquareVerifier that inherits from your ERC721Mintable class
contract SolnSquareVerifier is RealEstateERC721Token {

    RealSquareVerifier public verifierContract;

    constructor(address verifierAddress)
        RealEstateERC721Token() public
        {
            verifierContract = RealSquareVerifier(verifierAddress);
        }

    // TODO define a solutions struct that can hold an index & an address
    struct Solution {
        uint tokemd;
        address to;
    }

    // TODO define an array of the above struct
    Solution[] solutions;

    // TODO define a mapping to store unique solutions submitted
    mapping(bytes32 => Solution) uniqueSolutions;

    // TODO Create an event to emit when a solution is added
    event SolutionAdded(uint, address indexed);

    // TODO Create a function to add the solutions to the array and emit the event
    function addSolution(uint _tokenId, address _address, bytes32 key) public {
        Solution memory solution = Solution(_tokenId, _address);
        solutions.push(solution);
        uniqueSolutions[key] = solution;
        emit SolutionAdded(_tokenId,_address);
    }

    // TODO Create a function to mint new NFT only after the solution has been verified
    //  - make sure the solution is unique (has not been used before)
    //  - make sure you handle metadata as well as tokenSuplly
    function canMintToken(address _to, uint _tokenId,
            uint[2] memory a,
            uint[2][2] memory b,
            uint[2] memory c,
            uint[2] memory input) public
    {
         // check if solution is valid
        require(verifierContract.verifyTx(a, b, c, input), "Solution not valid");
        bytes32 key = keccak256(abi.encodePacked(a, b, c, input));
        require(uniqueSolutions[key].to == address(0),"Solution already used.");
        addSolution(_tokenId, _to,key);
    }

    function mintToken(address _to, uint _tokenId,
            uint[2] memory a,
            uint[2][2] memory b,
            uint[2] memory c,
            uint[2] memory input) public
    {
        bytes32 key = keccak256(abi.encodePacked(a, b, c, input));
        require(uniqueSolutions[key].to == address(0),"Solution already used.");
        require(verifierContract.verifyTx(a, b, c, input),"Solution not valid");
        addSolution(_tokenId, _to, key);
        super.mint(_to, _tokenId);
    }
}