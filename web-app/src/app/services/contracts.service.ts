import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { fromPromise } from 'rxjs/observable/fromPromise';
import { environment } from '../../environments/environment';

const Web3 = require('web3');
import * as inputContract from '../../../build/contracts/wineSecure.json';
declare var require: any;
declare var window: any;

@Injectable()
export class ContractsService {

  public web3: any;
  public wineContract : any;
  address: string="0xa1581bdbe42e802c4100a6a22426d32deaf542e8";

  constructor() { 
    this.checkAndInstantiateWeb3();
    this.registerContract(this.address);
  }

  private tokenAbi : any; 
  private bytecode : any; 

  registerContract(address: string) {    
   this.tokenAbi = (<any>inputContract).abi;
   this.bytecode = (<any>inputContract).bytecode;
   this.wineContract = new this.web3.eth.Contract(this.tokenAbi, address)
    console.log(this.wineContract);
  }

  public deployContract(account : string, wineDetails : any) : Promise<string> {
    return new Promise((resolve, reject) => {
        var newContract = new this.web3.eth.Contract(this.tokenAbi, this.address);
        const p = newContract.deploy( {
          arguments : [
          wineDetails.name, 
          wineDetails.vineyard, 
          wineDetails.grapeVariety,
          wineDetails.colour,
          wineDetails.alcoholLevel
          ], data:this.bytecode,
      })
      .send({
          gas: 4000000,
          gasLimit: 4000000,
          from: account,
      })
      .catch(e=> {
        console.error('deployContract error', e);
        reject(e);
      })
      .then(function(newContractInstance){
        if(newContractInstance){
          console.log(`Adress`, newContractInstance.options.address);
        }
        return resolve(newContractInstance.options.address);
      });
    });
  }

  public getDetails(address : string) : Observable<any> {
      return Observable.create(observer => {
        this.tokenAbi = (<any>inputContract).abi;
        let contract = new this.web3.eth.Contract(this.tokenAbi, address)
        contract.methods.wineDetail.call().call((err, result) => {
          if (err != null) {
            observer.error('There was an error fetching your accounts.')
          }
          observer.next(result);
          observer.complete();
        });
      });
  }

  public getSupplyChain(address : string) : Observable<any> {
    return Observable.create(observer => {
      this.tokenAbi = (<any>inputContract).abi;
      let contract = new this.web3.eth.Contract(this.tokenAbi, address);
      contract.methods.supplyChain().call((err, result) => {
        if (err != null) {
          observer.error('There was an error fetching your accounts.')
        }
        observer.next(result);
        observer.complete();
      });
    });
  }

  public getOwner(address : string) : Observable<any> {
    return Observable.create(observer => {
      this.tokenAbi = (<any>inputContract).abi;
      let contract = new this.web3.eth.Contract(this.tokenAbi, address);
      contract.methods.owner().call((err, result) => {
        if (err != null) {
          observer.error('There was an error fetching your accounts.')
        }
        observer.next(result);
        observer.complete();
      });
    });
  }

  public history(address : string) : Observable<any> {
    return Observable.create(observer => {
      this.tokenAbi = (<any>inputContract).abi;
      let contract = new this.web3.eth.Contract(this.tokenAbi, address);
      contract.getPastEvents("TransferOwnership", {
        fromBlock: 0,
        toBlock: 'latest'
      },
        function(error, events) { })
          .then(function(events){
              observer.next(events);
              observer.complete();
          });
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

  transfer (contractAddress: string, account : string, toaccount : string) : Observable<any> {
    return Observable.create(observer => {
      this.tokenAbi = (<any>inputContract).abi;
      let contract = new this.web3.eth.Contract(this.tokenAbi, contractAddress);
      contract.methods.transferOwnership(toaccount).send({from: account})
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
    });
  }

  setCharacteristics(account : string, address : string, value : string)  {
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
