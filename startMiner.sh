#!/bin/bash
clear
cd ~/Documents/Development/CSG6224
rm ~/Library/Ethereum/geth.ipc
rm -rf devChain/geth/chainData
rm -rf devChain/geth/dapp
rm -rf devChain/geth/nodes
rm -rf devchain/geth/nodekey
rm  devchain/geth/LOCK

# remove Ethereum wallet details
rm -rf ~/Library/Application\ Support/Ethereum\ Wallet/IndexedDB/

# start mining
geth  --datadir=devChain init genesis_dev.json
geth  --rpc --mine --minerthreads 1 --gasprice 1 --ipcpath ~/Library/Ethereum/geth.ipc  --networkid=39318 --maxpeers=0 --datadir=devChain --rpcport "8545" --rpcaddr "0.0.0.0" --rpccorsdomain "*" --rpcapi "eth,web3,personal,net,miner,admin" --ipcapi "eth,web3,personal,net,miner,admin" --verbosity 3 --unlock 0x12890d2cce102216644c59dae5baed380d84830c --password ethpassword.pwd

