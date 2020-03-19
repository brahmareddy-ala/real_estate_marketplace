// define a variable to import the <Verifier> or <renamedVerifier> solidity contract generated by Zokrates
var SquareVerifier = artifacts.require('SquareVerifier.sol');
let SquareProof = require('../zokrates/code/square/proof');

// Test verification with correct proof
// - use the contents from proof.json generated from zokrates steps
contract('TestSquareVerifier', accounts => {
    const account_one = accounts[0];
    describe('test verification with correct proof', function () {
        beforeEach(async function () { 
            this.contract = await SquareVerifier.new({from: account_one});
        })

        it('verification with correct proof',async function(){
            let verified = await this.contract.verifyTx.call(SquareProof.proof.a,SquareProof.proof.b,
                SquareProof.proof.c, SquareProof.inputs, {from:account_one});
            assert.equal(verified, true, "verification is valid");
        })
                    
        // Test verification with incorrect proof
        it('verification with incorrect proof',async function(){
            inputs=[10,1];
            let verified = await this.contract.verifyTx.call(SquareProof.proof.a, SquareProof.proof.b,
                SquareProof.proof.c, inputs, {from:account_one});
            assert.equal(verified, false, "verification is valid");
        })  
    });
})
    
// Test verification with incorrect proof
