#!/bin/bash
clear
cd ~/Library/Ethereum
deploymentScript="Documents/Development/CSG6224/deployment"
geth --preload "$HOME/$deploymentScript/registerContract.js" --rpccorsdomain "*" --rpcapi "eth,web3,personal,net,miner,admin" --ipcapi "eth,web3,personal,net,miner,admin" --datadir "$HOME/$deploymentScript/devChain" --dev attach ipc:geth.ipc console
exit
