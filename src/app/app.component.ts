import { Component, ViewChild } from '@angular/core';

import { ApiService } from './services/api.service';

// ngx-bootstrap imports
import { ModalDirective } from 'ngx-bootstrap/modal/index';

import { User } from './user';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    @ViewChild('loginModal') public loginModal: ModalDirective;
    
    title = 'MotherFoca Market Commission';
    public alert;

    public user: User = new User();

    constructor(public api: ApiService) {
        this.reload();
    }

    reload() {
        let auxUser = this.api.getUser();
        if (auxUser) {
            this.user = auxUser;
        } else {
            this.user.loggedIn = false;
        }
    }

    login() {
        this.alert = null;
        this.api.login(this.user).then(response => {
            this.user.loggedIn = true;
            this.loginModal.hide();   
        }).catch(error => {
            if (error['status'] === 401) {
                this.alert = 401;
            }
        });
        this.user.password = null;
    }

    logout() {
        this.api.logout(this.user);
        this.user.loggedIn = false;
    }
}
