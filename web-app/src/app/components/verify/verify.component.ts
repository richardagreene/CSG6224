import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ContractsService } from '../../services/contracts.service';

@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.scss']
})
export class VerifyComponent implements OnInit {

  address : string="0x...";
  result : string;
  wineDetails : any;
  owner : any;
  account : any;
  accounts : any;
  grapeVariety : string;

  constructor(  
    private readonly ref: ChangeDetectorRef,
    private readonly contacts : ContractsService ) { 
  }

  ngOnInit(){
    // Get the initial account balance so it can be displayed.
    this.contacts.getAccounts().subscribe(accs => {
      this.accounts = accs;
      this.account = this.accounts[0];
      this.ref.detectChanges();
    }, err => alert(err))
  }

  async setGrapeVariety() {
    this.contacts.setCharacteristics(this.account, this.address, this.grapeVariety);
  }

  async details() {
    this.contacts.getDetails(this.address).subscribe(details => {
      this.wineDetails = details;
      this.contacts.getOwner(this.address).subscribe(owner => {
        console.log(owner);
        this.owner = owner;
        this.ref.detectChanges();
      });
    }, err => alert(err));
  };
}

