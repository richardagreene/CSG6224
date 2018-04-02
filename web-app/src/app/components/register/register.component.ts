import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ContractsService } from '../../services/contracts.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  account : string = "";
  contract : string = "";
  wineDetails : any = {
    name : 'unknown', 
    vineyard : '', 
    grapeVariety : '',
    colour : 'Red',
    alcoholLevel : 0
  };
  contractAvailable = false;
  contractQrCode = "";

 constructor(  
    private readonly ref: ChangeDetectorRef,
    private readonly contacts : ContractsService ) { 
  }

  ngOnInit() {
      // Get the initial account balance so it can be displayed.
      this.contacts.getAccounts().subscribe(accs => {
        this.account = accs[0];
        this.ref.detectChanges();
      }, err => alert(err))
  }

  async deploy() {
    console.log(this.wineDetails);
    this.contacts.deployContract(this.account, this.wineDetails)
      .then((data) => {
        this.contract = data;
        this.contractQrCode = this.contract;
        this.contractAvailable = true;
      })
      .catch((err) => {
        this.contract = null
        this.contractQrCode = this.contract;
        this.contractAvailable = true;
      }
    )
  }
}
