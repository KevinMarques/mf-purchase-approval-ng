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

    public user: User = new User();

    constructor(public api: ApiService) {
        let loggedUser = this.api.reload();
        if (loggedUser) {
            this.user = loggedUser;
            this.user.loggedIn = true;
        } else {
            this.user.loggedIn = false;
        }
    }

    login() {
        if (this.api.login(this.user)) {
            this.user.loggedIn = true;
            this.loginModal.hide();
        } else {
            // TODO: Error
        }
    }

    logout() {
        this.api.logout(this.user);
        this.user = new User();
        this.user.loggedIn = false;
    }
}
