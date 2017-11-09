import { Component, OnInit } from '@angular/core';
import { Purchase } from '../purchase';
import { ApiService } from '../services/api.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-purchases',
  templateUrl: './purchases.component.html',
  styleUrls: ['./purchases.component.css']
})
export class PurchasesComponent implements OnInit {

  public purchases:Array<Purchase> = [];

  constructor(public api:ApiService) { 
  }

  ngOnInit() {
    // Make the HTTP request
    this.api.get('/purchase/').then(response => {
      this.purchases = response['purchases'];
  });
  }

}
