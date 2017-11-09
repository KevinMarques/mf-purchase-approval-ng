import { Injectable } from '@angular/core';

import { Http, Headers, URLSearchParams } from "@angular/http";
import { environment } from '../../environments/environment';

@Injectable()
export class ApiService {

    private baseURL:string = environment.server;
    private token:string;
    private user:any;
    
    constructor(private _http: Http) { }
 
    public get(endpoint, data = null, auth = true) {

        let username: string = 'bio';
        let password: string = 'bazinga';
        let headers: Headers = new Headers();
        headers.append("Authorization", "Basic " + btoa(username + ":" + password)); 
        headers.append("Content-Type", "application/json");
        
        return new Promise((resolve, reject) => {
            this._http.get(this.baseURL + endpoint, {headers: headers}).subscribe(response => {
                //console.log('GET: ');
                //console.log(response.json());
                resolve(response.json());
            }, error => reject(error));
        });
    }

    public post(endpoint, data, auth = true) {
     
        let encode: URLSearchParams = new URLSearchParams();
        if (auth) encode.append('token', this.token);
        for (var key in data) encode.append(key, data[key]);

        var headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');

        return new Promise((resolve, reject) => {
            this._http.post(this.baseURL + endpoint, encode.toString(), { headers: headers }).subscribe(response => {
                //console.log('POST: ');
                //console.log(response);
                resolve(response.json());
            }, error => reject(error));
        });
    }
}