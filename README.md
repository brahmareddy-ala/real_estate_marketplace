# Real Estate Marketplace

In this project you will be minting your own tokens to represent your title to the properties. Before you mint a token, you need to verify you own the property. You will use zk-SNARKs to create a verification system which can prove you have title to the property without revealing that specific information on the property.

Once the token has been verified you will place it on a blockchain market place (OpenSea) for others to purchase.

OpenSea is a decentralized marketplace that is used for selling for crypto assets such as CryptoKitties and other digital assets that are powered off Ethereum. On OpenSea, you can buy or sell any of these items through a smart contract, meaning that no central authority ever holds custody of your items.

You will be using OpenSea in this project to list your property tokens for sale. In order to list a property, you'll need to go to the item on your account page. On the item detail page, click "Sell". This will walk you through the steps for selling an item. Note that the first time you auction an item, you will need to complete several MetaMask transactions in order to give the exchange contracts access to your items. After you complete these initial steps, creating an auction will only require signing a MetaMask message. This means that you can auction items without paying gas.

Succinct Zero-Knowledge proofs (zkSnarks) are proving to be one of the most promising frameworks for enhancing privacy and scalability in the blockchain space.

Getting Started with Zokrates:

Step 1: Install Docker
Currently, Docker is the recommended way to get started with Zokrates. Docker is a tool designed to make it easier to create, deploy, and run applications by using containers. Containers allow a developer to package up an application with all of the parts it needs, such as libraries and other dependencies, and ship it all out as one package. You can find instructions for installing it here.

Step 2: Run ZoKrates
Run ZoKrates docker container:

docker run -v <path to your project folder>:/home/zokrates/code -ti zokrates/zokrates /bin/bash

This command breaks out into:

docker run - Run a docker container

-v <path to your project folder>:/home/zokrates/code - Create a host mapped volume inside the container

-it - Connect the container to terminal

zokrates/zokrates - Pull the docker image from here: https://hub.docker.com/r/zokrates/zokrates

/bin/bash - Run /bin/bash in the container

Step 3: A Quick Overview of the ZoKrates Process

In the following zkSNARKs example(s) we shall use the ZoKrates framework.

This is a 5 step process:

Compile Program
Trusted Setup
Compute-Witness
Generate-Proof
Export-Verifier

Input file(s)
program_name.code

Output file(s)
out.code
out
proving.key
verification.key
variables.inf
witness
proof.json
verifier.sol

Step 4: Compile the program written in ZoKrates DSL
/path/to/zokrates compile -i <program_name>.code

Step 5: Generate the Trusted Setup
Now take the 'flattened' code, which is a circuit and go through a 'trusted setup' Repeat this process, every-time the program.code changes Two keys are generated - 'proving.key' and 'verification.key'

/path/to/zokrates setup

Step 6: Compute Witness
Having gone through the 'trusted setup' let's compute our 'witness' who knows the answer and it generates a witness file with computation steps

/path/to/zokrates compute-witness -a <a> <b> ... <n>

Step 7: Generate Proof
Next step is to 'generate our proof' based on the above 'witness' A proof.json file is generated in this step

/path/to/zokrates generate-proof

Step 8: Export Verifier
Last but never the least, let's generate our 'verifier' smart contract

path/to/zokrates export-verifier

