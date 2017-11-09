import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  public users:Array<User> = [];

  constructor(public api:ApiService) { 
  }

  ngOnInit() {
    // Make the HTTP request
    this.api.get('/users').then(response => {
      this.users = response['data'];
  });
  }

}
