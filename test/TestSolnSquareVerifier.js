// Test if a new solution can be added for contract - SolnSquareVerifier
// Test if an ERC721 token can be minted for contract - SolnSquareVerifier

let SquareVerifier = artifacts.require('SquareVerifier');
let SolnSquareVerifier = artifacts.require('SolnSquareVerifier');
let SquareProof = require('../zokrates/code/square/proof');

contract('TestSolnSquareVerifier', accounts => {

    const account_one = accounts[0];
    const account_two = accounts[1];

    beforeEach(async function () { 
        const squareVerifier = await SquareVerifier.new({from:account_one});
        this.contract = await SolnSquareVerifier.new(squareVerifier.address,{from: account_one});
    })

     it('if a new solution can be added for contract',async function(){
        let canAdd = true;
        try{
        await this.contract.canMintToken(account_two, 2, SquareProof.proof.a,
            SquareProof.proof.b, SquareProof.proof.c, SquareProof.inputs, {from:account_one});
        }
        catch(e)
        {
            canAdd = false;
        }
        assert.equal(canAdd, true, "Solution cannot be added");
    }) 
    
    it('if a repeated solution can be added for contract',async function(){
        let canAdd=true;
       await this.contract.canMintToken(account_two, 2, SquareProof.proof.a,
            SquareProof.proof.b, SquareProof.proof.c, SquareProof.inputs, {from:account_one});

        try{
            await this.contract.canMintToken(account_two, 3, SquareProof.proof.a,
            SquareProof.proof.b, SquareProof.proof.c, SquareProof.inputs, {from:account_one});
        }
        catch(e)
        {
            canAdd = false;
        }        
            assert.equal(canAdd, false, "Repeated solution can be added"); 
    })
    
    // Test verification with correct proof
    it('if an ERC721 token can be minted for contract',async function(){
        let canMint = true;
        try {
            await this.contract.mintToken(account_two, 2, SquareProof.proof.a, SquareProof.proof.b,
            SquareProof.proof.c, SquareProof.inputs, {from:account_one});
        }
        catch(e) {
            canMint = false;
        }
        assert.equal(canMint, true, "cannot mint a token");
    })

    // Test verification with incorrect proof
    it('if an ERC721 token can be minted for contract with incorrect proof',async function(){
        let canMint = true;
        inputs = [10,1];
        try {
            await this.contract.mintToken(account_two, 2, SquareProof.proof.a, SquareProof.proof.b,
            SquareProof.proof.c, inputs, {from:account_one});
        }
        catch(e) {
            canMint = false;
        }
        assert.equal(canMint, false, "can mint a token with incorrect proof");
    })
});