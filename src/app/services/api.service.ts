import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from '../../environments/environment';

import { User } from '../user';
import { OAuth2Request } from '../oauth2request';

@Injectable()
export class ApiService {

    private userKey: string = "mmc_user";
    private baseURL: string = environment.server;
    private user: User = new User();

    constructor(private http: HttpClient) { this.user = this.getUser(); }

    public getUser() {
        return JSON.parse(localStorage.getItem(this.userKey));
    }

    public login(user) {
        console.log(user);
        this.user = user;
        let oauth2request = new OAuth2Request();
        oauth2request.client_id = "1";
        oauth2request.grant_type = "password";
        oauth2request.scope = "1";
        oauth2request.username = this.user.username;
        oauth2request.password = this.user.password;

        return new Promise((resolve, reject) => {
            this.post('/accesstoken/', oauth2request, false).then(response => {
                this.user.token = response['access_token'];
                this.user.password = null;
                this.user.loggedIn = true;
                localStorage.setItem(this.userKey, JSON.stringify(this.user));
                resolve(response);
            }).catch(error => {
                reject(error);
            });
        });
    }

    public logout(user) {
        localStorage.removeItem(this.userKey);
        this.user = null;
    }

    public get(endpoint, data = null, auth = true) {
        let headers = null;
        if (auth) {
            headers = new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + this.user.token
            });
        } else {
            headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        }

        return new Promise((resolve, reject) => {
            this.http.get(this.baseURL + endpoint, { headers: headers }).subscribe(response => {
                if (!environment.production) {
                    console.log(response);
                }
                resolve(response);
            }, error => reject(error));
        });
    }

    public post(endpoint, data, auth = true) {
        let headers = null;

        if (auth) {
            headers = new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + this.user.token
            });
        } else {
            headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        }

        return new Promise((resolve, reject) => {
            this.http.post(this.baseURL + endpoint, data, { headers: headers }).subscribe(response => {
                if (!environment.production) {
                    console.log(response);
                }
                resolve(response);
            }, error => reject(error));
        });
    }

    public delete(endpoint, auth = true) {
        let headers = null;

        if (auth) {
            headers = new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + this.user.token
            });
        } else {
            headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        }

        return new Promise((resolve, reject) => {
            this.http.delete(this.baseURL + endpoint, { headers: headers }).subscribe(response => {
                if (!environment.production) {
                    console.log(response);
                }
                resolve(response);
            }, error => reject(error));
        });
    }

    public patch(endpoint, data, auth = true) {
        let headers = null;

        if (auth) {
            headers = new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + this.user.token
            });
        } else {
            headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        }

        return new Promise((resolve, reject) => {
            this.http.patch(this.baseURL + endpoint, data, { headers: headers }).subscribe(response => {
                resolve(response);
            }, error => reject(error));
        });
    }
}