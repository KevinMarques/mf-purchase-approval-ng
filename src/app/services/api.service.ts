import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from '../../environments/environment';

import { User } from '../user';

@Injectable()
export class ApiService {

    private baseURL:string = environment.server;
    private user: User = new User();
    
    constructor(private http: HttpClient) { }
 
    public reload() {
        this.user = JSON.parse(localStorage.getItem('currentUser'));
        return this.user;
    }

    public login(user) {
        this.user = new User();
        return new Promise((resolve, reject) => {
           /*this.post('/login', user, false).then(response => {
                if (response['status'] == 1) {
                    window.localStorage.setItem('token', this.token = response['data']['token']);
                    this.user = new JwtHelper().decodeToken(this.token);
                    resolve(true);
                } else reject(response['code']);
            }).catch(code => reject('no-server'));*/
            // TODO: Autenticar contra servidor cuando la API disponga del método

            localStorage.setItem('currentUser', JSON.stringify({ username: user.username, password: user.password }));
            this.user.username = user.username;
            this.user.password = user.password;
            resolve(true);
        });
    }

    public logout(user) {
        return new Promise((resolve, reject) => {
            /*this.post('/login', user, false).then(response => {
                 if (response['status'] == 1) {
                     window.localStorage.setItem('token', this.token = response['data']['token']);
                     this.user = new JwtHelper().decodeToken(this.token);
                     resolve(true);
                 } else reject(response['code']);
             }).catch(code => reject('no-server'));*/
             // TODO: Autenticar contra servidor cuando la API disponga del método
 
             localStorage.removeItem('currentUser');
             this.user = null;
             resolve(true);
         });
    }

    public get(endpoint, data = null, auth = true) {
        let headers = null;
        if (auth) {
            let username: string = this.user.username;
            let password: string = this.user.password;
            headers = new HttpHeaders({'Content-Type':'application/json',
            'Authorization':"Basic " + btoa(username + ":" + password)});
        } else {
            headers = new HttpHeaders({'Content-Type':'application/json'});
        }
        
        return new Promise((resolve, reject) => {
            this.http.get(this.baseURL + endpoint, { headers: headers }).subscribe(response => {
                if (!environment.production) {
                    console.log('GET: ');
                    console.log(response);
                } 
                resolve(response);
            }, error => reject(error));
        });
    }

    public post(endpoint, data, auth = true) {
        let headers = null;

        if (auth) {
            let username: string = this.user.username;
            let password: string = this.user.password;
            headers = new HttpHeaders({'Content-Type':'application/json',
            'Authorization':"Basic " + btoa(username + ":" + password)});
        } else {
            headers = new HttpHeaders({'Content-Type':'application/json'});
        }

        return new Promise((resolve, reject) => {
            this.http.post(this.baseURL + endpoint, data, { headers: headers }).subscribe(response => {
                if (!environment.production) {
                    console.log('GET: ');
                    console.log(response);
                } 
                resolve(response);
            }, error => reject(error));
        });
    }

    public delete(endpoint, auth = true) {
        let headers = null;

        if (auth) {
            let username: string = this.user.username;
            let password: string = this.user.password;
            headers = new HttpHeaders({'Content-Type':'application/json',
            'Authorization':"Basic " + btoa(username + ":" + password)});
        } else {
            headers = new HttpHeaders({'Content-Type':'application/json'});
        }

        return new Promise((resolve, reject) => {
            this.http.delete(this.baseURL + endpoint, { headers: headers }).subscribe(response => {
                resolve(response);
            }, error => reject(error));
        });
    }

    public patch(endpoint, data, auth = true) {
        let headers = null;

        if (auth) {
            let username: string = this.user.username;
            let password: string = this.user.password;
            headers = new HttpHeaders({'Content-Type':'application/json',
            'Authorization':"Basic " + btoa(username + ":" + password)});
        } else {
            headers = new HttpHeaders({'Content-Type':'application/json'});
        }

        return new Promise((resolve, reject) => {
            this.http.patch(this.baseURL + endpoint, data, { headers: headers }).subscribe(response => {
                resolve(response);
            }, error => reject(error));
        });
    }
}