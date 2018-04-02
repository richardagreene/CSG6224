import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ContractsService } from '../../services/contracts.service';


@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss']
})
export class UpdateComponent implements OnInit {

  events : any[];
  account : string = "";
  toaccount : string = "";
  contract : string = "";

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

  transfer() {
    this.contacts.transfer(this.contract.toLowerCase(), this.account.toLowerCase(), this.toaccount.toLowerCase())
    .subscribe(transfer => { console.log(transfer); });
  }

  history () {
    this.contacts.history(this.contract.toLowerCase())
    .subscribe(history => { 
      console.log(history);
      this.events = history; 
    });
  }
}
