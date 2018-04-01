
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { fromPromise } from 'rxjs/observable/fromPromise';
import { environment } from '../../environments/environment';

const Web3 = require('web3');
declare var require: any;
declare var window: any;


@Injectable()
export class ContractsService {

  public web3: any;
  public wineContract : any;
  address: string="0xa1581bdbe42e802c4100a6a22426d32deaf542e8";
  public filter: any;

  constructor() { 
    this.checkAndInstantiateWeb3();
    this.registerContract();
  }


  registerContract() {

    let tokenAbi = [
      {
        "constant": true,
        "inputs": [],
        "name": "wineCharacteristics",
        "outputs": [
          {
            "name": "grapeVariety",
            "type": "string"
          },
          {
            "name": "colour",
            "type": "string"
          },
          {
            "name": "alcoholLevel",
            "type": "uint256"
          },
          {
            "name": "acidLevel",
            "type": "string"
          },
          {
            "name": "phenolicContent",
            "type": "string"
          },
          {
            "name": "sugarLevel",
            "type": "uint256"
          },
          {
            "name": "minerals",
            "type": "string"
          },
          {
            "name": "co2",
            "type": "uint256"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [],
        "name": "owner",
        "outputs": [
          {
            "name": "",
            "type": "address"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [
          {
            "name": "",
            "type": "uint256"
          }
        ],
        "name": "supplyChain",
        "outputs": [
          {
            "name": "source",
            "type": "address"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "constructor"
      },
      {
        "payable": true,
        "stateMutability": "payable",
        "type": "fallback"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": false,
            "name": "owner",
            "type": "address"
          },
          {
            "indexed": false,
            "name": "message",
            "type": "string"
          }
        ],
        "name": "TransferOwnership",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": false,
            "name": "message",
            "type": "string"
          },
          {
            "indexed": false,
            "name": "setting",
            "type": "string"
          }
        ],
        "name": "CharacteristicsSet",
        "type": "event"
      },
      {
        "constant": false,
        "inputs": [],
        "name": "kill",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [
          {
            "name": "variety",
            "type": "string"
          }
        ],
        "name": "grapeVariety",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [
          {
            "name": "newOwner",
            "type": "address"
          }
        ],
        "name": "transferOwnership",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
      }
    ];
   this.wineContract = new this.web3.eth.Contract(tokenAbi, this.address)
    console.log(this.wineContract);
  }

  public getCharacteristics() : void {
    this.wineContract.methods.wineCharacteristics.call().call((error, result) => {
      console.log(result);
    });
  }

  checkAndInstantiateWeb3 = () => {
    // Checking if Web3 has been injected by the browser (Mist/MetaMask)
    if (typeof window.web3 !== 'undefined') {
      console.warn(
        'Using web3 detected from external source. If you find that your accounts don\'t appear or you have 0 MetaCoin, ensure you\'ve configured that source properly. If using MetaMask, see the following link. Feel free to delete this warning. :) http://truffleframework.com/tutorials/truffle-and-metamask'
      );
      this.web3 = new Web3(window.web3.currentProvider);
    } else {
      console.warn(
        'No web3 detected. Falling back to ${environment.HttpProvider}. You should remove this fallback when you deploy live, as it\'s inherently insecure. Consider switching to Metamask for development. More info here: http://truffleframework.com/tutorials/truffle-and-metamask'
      );
      // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
      this.web3 = new Web3(
        new Web3.providers.HttpProvider(environment.HttpProvider)
      );
    }
  };

  getAccounts(): Observable<any>{
  	return Observable.create(observer => {
  	  this.web3.eth.getAccounts((err, accs) => {
  	    if (err != null) {
  	      observer.error('There was an error fetching your accounts.')
  	    }

  	    if (accs.length === 0) {
  	      observer.error('Couldn\'t get any accounts! Make sure your Ethereum client is configured correctly.')
  	    }
  	    observer.next(accs)
  	    observer.complete()
  	  });
  	})
  }

  setCharacteristics(account : string, address : string, value : string)  {
    console.log(account);
    console.log(address);
    console.log(value);

    this.wineContract.methods.owner.call().call((error, result) => {
      console.log(result);
    });

    this.wineContract.methods.grapeVariety(value).send({from: account})
    .on('transactionHash', function(hash){
      console.log("hash" + hash);
    })
    .on('receipt', function(receipt){
      console.log("here");
    })
    .on('confirmation', function(confirmationNumber, receipt){
      console.log("conf");
    })
    .on('error', console.error);
  }
}
