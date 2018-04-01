import { Component } from '@angular/core';
import { ContractsService } from './services/contracts.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'Web-app';
  address : string="0xa1581bdbe42e802c4100a6a22426d32deaf542e8";
  result : string;
  account : any;
  accounts : any;
  grapeVariety : string;

  constructor(  
    private readonly contacts : ContractsService ) { 
  }

  ngOnInit(){
    // Get the initial account balance so it can be displayed.
    this.contacts.getAccounts().subscribe(accs => {
      this.accounts = accs;
      this.account = this.accounts[0];
      console.log(this.account);
    }, err => alert(err))
  }

  async setGrapeVariety() {
    this.contacts.setCharacteristics(this.account, this.address, this.grapeVariety);
  }

  async details() {
    this.contacts.getCharacteristics();
  }

}
